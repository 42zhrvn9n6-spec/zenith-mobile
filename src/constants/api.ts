export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://z-zenith-backend.onrender.com';

export const API_ENDPOINTS = {
  health: '/api/health',
  natalChart: '/api/natal-chart',
  transit: '/api/transit',
  synastry: '/api/synastry',
  citySearch: '/api/city-search',
  dailyReading: '/api/daily-reading',
};

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};
