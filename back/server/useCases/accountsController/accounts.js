const { insertOnCloudant, getFromCloudant } = require("../../helpers/cloudant");

const documentName = "accounts";

async function registerAccount(req, res) {
  const { name, email, password, registerTime, adm } = req.body;

  const existingAccounts = await getFromCloudant(documentName);
  if (existingAccounts) {
    const filtered = existingAccounts.values.filter(
      (account) => account.email === email
    );
    if (filtered.length > 0) {
      res.send({ status: { inserted: false } });
    } else {
      existingAccounts.values.push({
        name,
        email,
        password,
        registerTime,
        adm,
      });
      await insertOnCloudant(documentName, existingAccounts);
      res.send({ status: { inserted: true } });
    }
  } else {
    await insertOnCloudant(documentName, {
      values: [{ name, email, password, registerTime, adm }],
    });
    res.send({ status: { inserted: true } });
  }
}

async function getAccount(req, res) {
  const { email, password } = req.body;
  const existingAccounts = await getFromCloudant(documentName);

  const filtered = existingAccounts?.values.filter(
    (account) => account.email === email && account.password === password
  );
  if (filtered?.length > 0) {
    delete filtered[0].registerTime;
    res.send(filtered[0]);
  } else {
    res.send({ status: { found: false } });
  }
}

async function getAccounts(req, res) {
  const existingAccounts = await getFromCloudant(documentName);

  delete existingAccounts._id;
  delete existingAccounts._rev;

  res.send(existingAccounts);
}

module.exports = { registerAccount, getAccount, getAccounts };
