import { apiClient } from './client';

interface BirthData {
  date: string;
  time: string;
  city: string;
  lat?: number;
  lng?: number;
  houseSystem?: string;
}

interface NatalChartResponse {
  success: boolean;
  data: {
    planets: Record<string, { sign: string; degree: number; house: number; minutes: number }>;
    houses: Record<number, { sign: string; degree: number }>;
    ascendant: string;
    midheaven: string;
    aspects: Array<{ planet1: string; planet2: string; aspect: string; angle: number; orb: number }>;
  };
  message?: string;
}

export const natalApi = {
  calculate: async (birthData: BirthData): Promise<NatalChartResponse> => {
    const response = await apiClient.post('/api/natal-chart', birthData);
    return response.data;
  },
  
  getByUser: async (userId: string): Promise<NatalChartResponse> => {
    const response = await apiClient.get(`/api/natal-chart/${userId}`);
    return response.data;
  },
  
  save: async (birthData: BirthData): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post('/api/natal-chart/save', birthData);
    return response.data;
  },
};
