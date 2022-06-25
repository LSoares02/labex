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

export async function register(insertedData) {
  const response = await api.post("/registerAccount", {
    name: insertedData.name,
    email: insertedData.email,
    password: insertedData.password,
    adm: false,
    registerTime: new Date().toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }),
  });

  if (response.data.status?.inserted === false) {
    return null;
  } else {
    return response.data;
  }
}
