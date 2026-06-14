// API
export { API_URL, API_ENDPOINTS, DEFAULT_HEADERS } from './api';

// Renkler
export { COLORS, DEFAULT_THEME, getColors } from './colors';
export type { Theme } from './colors';

// Tipler
export type { Planet, Sign, Aspect, House, Archetype } from './types';

// Burçlar
export { SIGNS, SIGN_SYMBOLS, SIGN_TR, SIGN_RULERS, getSignById } from './zodiac';

// Gezegenler
export { PLANETS, PLANET_SYMBOLS, PLANET_TR, getPlanetById } from './planets';

// Yönlendirmeler
export { ASPECTS, getAspectByAngle } from './aspects';

// Evler
export { HOUSES, getHouseByNumber } from './houses';

// Arketipler
export { ARCHETYPES, getArchetypeById } from './archetypes';

// Kullanıcı tercihleri
export const HOUSE_SYSTEMS = [
  { id: 'placidus', name: 'Placidus', description: 'En yaygın sistem' },
  { id: 'koch', name: 'Koch', description: 'Alman ekolü' },
  { id: 'whole', name: 'Whole Sign', description: 'Antik, basit' },
  { id: 'equal', name: 'Equal', description: 'Eşit ev' },
];

export const TRANSIT_TYPES = [
  { id: 'daily', name: 'Günlük', description: 'Bugünkü etkiler' },
  { id: 'weekly', name: 'Haftalık', description: 'Haftalık trend' },
  { id: 'monthly', name: 'Aylık', description: 'Ayın temaları' },
  { id: 'yearly', name: 'Yıllık', description: 'Güneş dönüşü' },
];
