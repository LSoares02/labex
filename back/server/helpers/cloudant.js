const {
  createCloudantClient,
  createDbAndDoc,
  getDoc,
} = require("../common/database/cloudant");

async function insertOnCloudant(docId, document) {
  try {
    const client = createCloudantClient();
    return await createDbAndDoc(client, docId, document);
  } catch (err) {
    console.log(err);
    // return { Error: "Unnable to connect with suplied credentials" };
  }
}

async function getFromCloudant(docId) {
  try {
    const client = createCloudantClient();
    return await getDoc(client, docId);
  } catch (err) {
    if (err.code === 404) {
      return null;
    } else {
      return { Error: "Unnable to connect with suplied credentials" };
    }
  }
}

module.exports = {
  insertOnCloudant,
  getFromCloudant,
};
