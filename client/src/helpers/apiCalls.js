import api from "../services/api";

export async function getActivities() {
  return await api.get("/getAllActivities");
}

export async function login(insertedData) {
  const response = await api.post("/getAccount", {
    email: insertedData.email,
    password: insertedData.password,
  });
  if (response.data.status?.found === false) {
    return null;
  } else {
    return response.data;
  }
}
