const { insertOnCloudant, getFromCloudant } = require("../../helpers/cloudant");

const documentName = "extensionActivities";

async function registerActivity(req, res) {
  const { value } = req.body;

  const existingActivities = await getFromCloudant(documentName);
  if (existingActivities) {
    const filtered = existingActivities.values.filter(
      (post) => post.id === value.id
    );
    if (filtered.length > 0) {
      res.send({ error: "Activity already exists!" });
    } else {
      existingActivities.values.push(value);
      res.send(
        await insertOnCloudant(documentName, {
          values: existingActivities.values,
        })
      );
    }
  } else {
    res.send(await insertOnCloudant(documentName, { values: [value] }));
  }
}

async function getAllActivities(req, res) {
  const existingActivities = await getFromCloudant(documentName);

  delete existingActivities._id;
  delete existingActivities._rev;

  res.send(existingActivities);
}

async function getActivityDetails(req, res) {
  const { id } = req.body;
  const activityDetails = await getFromCloudant("extensionDetails");

  const desiredDetails = activityDetails.values.find(
    (activity) => activity.id === id
  );

  res.send(desiredDetails);
}

module.exports = { registerActivity, getAllActivities, getActivityDetails };
