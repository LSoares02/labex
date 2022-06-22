const { CloudantV1 } = require("@ibm-cloud/cloudant");
const { IamAuthenticator } = require("ibm-cloud-sdk-core");
require("dotenv").config();

const cloudantApiKey = process.env["CLOUDANT_APIKEY"];
const cloudantURL = process.env.CLOUDANT_URL;
const cloudantDbName = process.env.CLOUDANT_DB_NAME;

function createCloudantClient() {
  const authenticator = new IamAuthenticator({
    apikey: cloudantApiKey,
  });
  const client = CloudantV1.newInstance({
    authenticator: authenticator,
  });
  client.setServiceUrl(cloudantURL);

  return client;
}

async function createDbAndDoc(client, docId, document) {
  return new Promise(async (resolve, reject) => {
    document._id = docId;
    try {
      const putDatabaseResult = (
        await client.putDatabase({
          db: cloudantDbName,
        })
      ).result;
      if (putDatabaseResult.ok) {
        console.log(`"${cloudantDbName}" database created.`);
      }
    } catch (err) {
      if (err.code === 412) {
        console.log(
          `Cannot create "${cloudantDbName}" database, it already exists. Will connect to existing Db...`
        );
      } else {
        reject(err);
      }
    }

    try {
      const createDocumentResponse = await client.postDocument({
        db: cloudantDbName,
        document: document,
      });

      // Keep track with the revision number of the document object
      document._rev = createDocumentResponse.result.rev;
      resolve("Document created with success.");
    } catch (err) {
      if (err.code === 409) {
        console.log(
          `Cannot create document, as it already exists. Will try updating it instead...`
        );
        resolve(await updateDoc(client, docId, document));
      } else {
        reject(err);
      }
    }
  });
}

async function updateDoc(client, docId, document) {
  return new Promise(async (resolve, reject) => {
    // Try to get the document if it previously existed in the database
    try {
      const existingDocument = (
        await client.getDocument({
          docId: docId,
          db: cloudantDbName,
        })
      ).result;

      document._rev = existingDocument._rev;
      document._id = docId;

      await client.postDocument({
        db: cloudantDbName,
        document: document,
      });

      resolve("Document updated with success.");
    } catch (err) {
      if (err.code === 404) {
        reject(
          `Cannot update document because either "${cloudantDbName}" database or document was not found.`
        );
      }
    }
  });
}

async function getDoc(client, docId) {
  return new Promise(async (resolve, reject) => {
    try {
      const getDocParams = { db: cloudantDbName, docId: docId };
      const response = await client.getDocument(getDocParams);
      const { result } = response;

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  createCloudantClient,
  createDbAndDoc,
  getDoc,
};
