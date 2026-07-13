export interface City {
  name: string;
  country: string;
  lat: number;
  lng: number;
  utcOffset: number;
}

export const CITIES: City[] = [
  { name: 'İstanbul', country: 'Türkiye', lat: 41.0082, lng: 28.9784, utcOffset: 3 },
  { name: 'Ankara', country: 'Türkiye', lat: 39.9334, lng: 32.8597, utcOffset: 3 },
  { name: 'İzmir', country: 'Türkiye', lat: 38.4237, lng: 27.1428, utcOffset: 3 },
  { name: 'Bursa', country: 'Türkiye', lat: 40.1885, lng: 29.0610, utcOffset: 3 },
  { name: 'Antalya', country: 'Türkiye', lat: 36.8969, lng: 30.7133, utcOffset: 3 },
  { name: 'Adana', country: 'Türkiye', lat: 37.0000, lng: 35.3213, utcOffset: 3 },
  { name: 'Konya', country: 'Türkiye', lat: 37.8746, lng: 32.4932, utcOffset: 3 },
  { name: 'Gaziantep', country: 'Türkiye', lat: 37.0662, lng: 37.3833, utcOffset: 3 },
  { name: 'Mersin', country: 'Türkiye', lat: 36.8000, lng: 34.6333, utcOffset: 3 },
  { name: 'Kayseri', country: 'Türkiye', lat: 38.7312, lng: 35.4787, utcOffset: 3 },
  { name: 'Eskişehir', country: 'Türkiye', lat: 39.7767, lng: 30.5206, utcOffset: 3 },
  { name: 'Diyarbakır', country: 'Türkiye', lat: 37.9144, lng: 40.2306, utcOffset: 3 },
  { name: 'Samsun', country: 'Türkiye', lat: 41.2867, lng: 36.3300, utcOffset: 3 },
  { name: 'Denizli', country: 'Türkiye', lat: 37.7765, lng: 29.0864, utcOffset: 3 },
  { name: 'Trabzon', country: 'Türkiye', lat: 41.0027, lng: 39.7168, utcOffset: 3 },
  { name: 'Berlin', country: 'Almanya', lat: 52.5200, lng: 13.4050, utcOffset: 1 },
  { name: 'Münih', country: 'Almanya', lat: 48.1351, lng: 11.5820, utcOffset: 1 },
  { name: 'Londra', country: 'İngiltere', lat: 51.5074, lng: -0.1278, utcOffset: 0 },
  { name: 'Paris', country: 'Fransa', lat: 48.8566, lng: 2.3522, utcOffset: 1 },
  { name: 'Amsterdam', country: 'Hollanda', lat: 52.3676, lng: 4.9041, utcOffset: 1 },
  { name: 'New York', country: 'ABD', lat: 40.7128, lng: -74.0060, utcOffset: -5 },
  { name: 'Moskova', country: 'Rusya', lat: 55.7558, lng: 37.6173, utcOffset: 3 },
  { name: 'Bakü', country: 'Azerbaycan', lat: 40.4093, lng: 49.8671, utcOffset: 4 },
];

export function searchCities(query: string, options?: { limit?: number }): City[] {
  const limit = options?.limit ?? 5;
  const normalized = query.toLocaleLowerCase('tr-TR');
  return CITIES.filter((c) =>
    c.name.toLocaleLowerCase('tr-TR').includes(normalized)
  ).slice(0, limit);
}
