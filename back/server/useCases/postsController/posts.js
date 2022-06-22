const { insertOnCloudant, getFromCloudant } = require("../../helpers/cloudant");

const documentName = "extensionActivities";

async function registerActivity(req, res) {
  const { value } = req.body;

  const existingActivities = await getFromCloudant(documentName);
  if (existingActivities) {
    const filtered = existingActivities.values.filter(
      (post) => post.id !== value.id
    );
    filtered.push(value);

    res.send(await insertOnCloudant(documentName, { values: filtered }));
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

module.exports = { registerActivity, getAllActivities };
