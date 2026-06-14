import { apiClient } from './client';

interface TransitRequest {
  birthData: {
    date: string;
    time: string;
    city: string;
    lat?: number;
    lng?: number;
  };
  transitDate: string;
}

interface TransitResponse {
  success: boolean;
  data: {
    planets: Array<{
      name: string;
      sign: string;
      degree: number;
      house: number;
      isRetrograde: boolean;
    }>;
    aspects: Array<{
      transitingPlanet: string;
      natalPlanet: string;
      aspect: string;
      orb: number;
      influence: string;
    }>;
    themes: string[];
  };
  message?: string;
}

export const transitApi = {
  calculate: async (request: TransitRequest): Promise<TransitResponse> => {
    const response = await apiClient.post('/api/transit', request);
    return response.data;
  },
  
  getDaily: async (birthData: TransitRequest['birthData']): Promise<TransitResponse> => {
    const today = new Date().toISOString().split('T')[0];
    const response = await apiClient.post('/api/transit', { birthData, transitDate: today });
    return response.data;
  },
  
  getWeekly: async (birthData: TransitRequest['birthData']): Promise<TransitResponse[]> => {
    const promises = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const transitDate = date.toISOString().split('T')[0];
      promises.push(apiClient.post('/api/transit', { birthData, transitDate }));
    }
    const responses = await Promise.all(promises);
    return responses.map(r => r.data);
  },
};
