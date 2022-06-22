import api from "../services/api";

export async function getActivities() {
  return await api.get("/getAllActivities");
}
