import { apiClient } from "./apiClient";

// ========== EQUIPMENT SERVICES ==========
export const getEquipmentData = async (startDate = null, endDate = null, city = null) => {
  const params = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  if (city) params.city = city;
  const response = await apiClient.get("/equipment", { params });
  return response.data;
};


export const getCities = async () => {
  const response = await apiClient.get("/equipment/cities");
  return response.data;
};

// ✅ NEW: Equipment CSV Upload
export const uploadEquipmentCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post("/equipment/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

// ========== WEATHER SERVICES ==========
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

export const uploadWeatherCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post("/weather/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};
