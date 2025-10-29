import { apiClient } from "./apiClient";

export const getEquipmentData = async (date = null, city = null) => {
  const params = {};
  if (date) params.date = date;
  if (city) params.city = city;
  const response = await apiClient.get("/equipment", {params});
  return response.data;
};
export const getCities = async () => {
  const response = await apiClient.get("/equipment/cities");
  return response.data;
};
export const getWeatherData = async (
  startDate = null,
  endDate = null,
  sites = []
) => {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  if (sites && sites.length > 0) {
    sites.forEach((site) => params.append("sites[]", site));
  }
  const response = await apiClient.get(`/weather?${params.toString()}`);
  return response.data;
};
export const getSiteIds = async () => {
  const response = await apiClient.get("/weather/sites");
  return response.data;
};
