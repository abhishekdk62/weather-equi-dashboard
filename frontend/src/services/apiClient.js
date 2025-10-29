import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV == "dev"
      ? import.meta.env.VITE_DEV_URL
      : import.meta.env.VITE_PROD_URL,
});
