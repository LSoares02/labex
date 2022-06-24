const { insertOnCloudant, getFromCloudant } = require("../../helpers/cloudant");

const documentName = "accounts";

async function registerAccount(req, res) {
  const { id, email, password, registerTime } = req.body;

  const existingAccounts = await getFromCloudant(documentName);
  if (existingAccounts) {
    const filtered = existingAccounts.values.filter(
      (account) => account.id === id
    );
    if (filtered.length > 0) {
      res.send({ status: { Inserted: false } });
    } else {
      existingAccounts.values.push({ id, email, password, registerTime });
      await insertOnCloudant(documentName, existingAccounts);
      res.send({ status: { Inserted: true } });
    }
  } else {
    await insertOnCloudant(documentName, {
      values: [{ id, email, password, registerTime }],
    });
    res.send({ status: { Inserted: true } });
  }
}

async function getAccount(req, res) {
  const { id } = req.body;
  const existingAccounts = await getFromCloudant(documentName);

  const filtered = existingAccounts.values.filter(
    (account) => account.id === id
  );
  if (filtered.length > 0) {
    res.send(filtered[0]);
  } else {
    res.send({ status: { Found: false } });
  }
}

async function getAccounts(req, res) {
  const existingAccounts = await getFromCloudant(documentName);

  delete existingAccounts._id;
  delete existingAccounts._rev;

  res.send(existingAccounts);
}

module.exports = { registerAccount, getAccount, getAccounts };
