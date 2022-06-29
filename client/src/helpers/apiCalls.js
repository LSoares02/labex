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

export async function activityRegister(insertedData) {
  const {
    id,
    title,
    type,
    initialDate,
    finalDate,
    authors,
    description,
    image,
    links,
  } = insertedData;
  const response = await api.post("/registerActivity", {
    value: {
      id: id,
      title: title,
      type: type,
      initialDate: initialDate,
      finalDate: finalDate,
      authors: authors,
      description: description,
      image: image,
      links: links,
      registerTime: new Date(),
    },
  });
  return response;
}
