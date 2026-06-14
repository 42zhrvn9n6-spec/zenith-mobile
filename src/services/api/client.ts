import axios from 'axios';
import { API_URL, DEFAULT_HEADERS } from '../../constants';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: DEFAULT_HEADERS,
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(`📡 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.log(`❌ API Error: ${error.response?.status} ${error.message}`);
    return Promise.reject(error);
  }
);
