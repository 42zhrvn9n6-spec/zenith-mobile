import { Aspect } from './types';

export const ASPECTS: Aspect[] = [
  { name: 'Conjunction', symbol: '☌', angle: 0, orb: 8, meaning: 'Birleşme, güçlenme, odaklanma', quality: 'major' },
  { name: 'Opposition', symbol: '☍', angle: 180, orb: 8, meaning: 'Zıtlık, denge, farkındalık', quality: 'major' },
  { name: 'Trine', symbol: '△', angle: 120, orb: 8, meaning: 'Uyum, akış, yetenek', quality: 'soft' },
  { name: 'Square', symbol: '□', angle: 90, orb: 8, meaning: 'Gerilim, dönüşüm, büyüme', quality: 'hard' },
  { name: 'Sextile', symbol: '⚹', angle: 60, orb: 6, meaning: 'Fırsat, kolaylık, potansiyel', quality: 'soft' },
  { name: 'Quincunx', symbol: '⚻', angle: 150, orb: 4, meaning: 'Ayarlama, uyumsuzluk, esneklik', quality: 'minor' },
  { name: 'Semi-Square', symbol: '∠', angle: 45, orb: 3, meaning: 'Gerilim, sürtüşme, dürtü', quality: 'minor' },
  { name: 'Sesquiquadrate', symbol: '⚼', angle: 135, orb: 3, meaning: 'Blokaj, takıntı, zorluk', quality: 'minor' },
];

export const getAspectByAngle = (angle: number, orb: number = 8): Aspect | undefined => {
  return ASPECTS.find(a => Math.abs(a.angle - angle) <= orb);
};
