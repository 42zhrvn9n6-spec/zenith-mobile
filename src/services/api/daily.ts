import { apiClient } from './client';

interface DailyReadingRequest {
  sign?: string;
  date?: string;
}

interface DailyReadingResponse {
  success: boolean;
  data: {
    sign: string;
    date: string;
    reading: string;
    mood?: string;
    luckyColor?: string;
    luckyNumber?: number;
    advice?: string;
  };
  message?: string;
}

export const dailyApi = {
  getReading: async (sign?: string, date?: string): Promise<DailyReadingResponse> => {
    const params: Record<string, string> = {};
    if (sign) params.sign = sign;
    if (date) params.date = date;
    const response = await apiClient.get('/api/daily-reading', { params });
    return response.data;
  },
  
  getTodayReading: async (sign: string): Promise<DailyReadingResponse> => {
    const today = new Date().toISOString().split('T')[0];
    const response = await apiClient.get('/api/daily-reading', {
      params: { sign, date: today }
    });
    return response.data;
  },
  
  getWeeklyReadings: async (sign: string): Promise<DailyReadingResponse[]> => {
    const promises = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      promises.push(apiClient.get('/api/daily-reading', { params: { sign, date: dateStr } }));
    }
    const responses = await Promise.all(promises);
    return responses.map(r => r.data);
  },
};
