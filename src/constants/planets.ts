import { Planet } from './types';

export const PLANETS: Planet[] = [
  { id: 'sun', name: 'Güneş', symbol: '☉', type: 'luminary', meaning: 'Öz, ego, yaşam amacı' },
  { id: 'moon', name: 'Ay', symbol: '☽', type: 'luminary', meaning: 'Duygular, iç dünya, alışkanlıklar' },
  { id: 'mercury', name: 'Merkür', symbol: '☿', type: 'personal', meaning: 'İletişim, düşünce, öğrenme' },
  { id: 'venus', name: 'Venüs', symbol: '♀', type: 'personal', meaning: 'Aşk, güzellik, değerler' },
  { id: 'mars', name: 'Mars', symbol: '♂', type: 'personal', meaning: 'Eylem, tutku, savaşçı' },
  { id: 'jupiter', name: 'Jüpiter', symbol: '♃', type: 'social', meaning: 'Şans, büyüme, bilgelik' },
  { id: 'saturn', name: 'Satürn', symbol: '♄', type: 'social', meaning: 'Disiplin, sınır, sorumluluk' },
  { id: 'uranus', name: 'Uranüs', symbol: '♅', type: 'transpersonal', meaning: 'Değişim, özgürlük, yenilik' },
  { id: 'neptune', name: 'Neptün', symbol: '♆', type: 'transpersonal', meaning: 'Hayal, sezgi, spiritüellik' },
  { id: 'pluto', name: 'Plüton', symbol: '♇', type: 'transpersonal', meaning: 'Dönüşüm, güç, yeniden doğuş' },
  { id: 'chiron', name: 'Chiron', symbol: '⚷', type: 'asteroid', meaning: 'Yara, şifa, öğretmen' },
  { id: 'northNode', name: 'Kuzey Düğüm', symbol: '☊', type: 'point', meaning: 'Kader, gelişim yönü' },
  { id: 'lilith', name: 'Lilith', symbol: '⚸', type: 'point', meaning: 'Karanlık, bastırılmış güç' },
];

export const PLANET_SYMBOLS: Record<string, string> = {
  Sun: '☉', Moon: '☽', Mercury: '☿', Venus: '♀', Mars: '♂',
  Jupiter: '♃', Saturn: '♄', Uranus: '♅', Neptune: '♆', Pluto: '♇',
  Chiron: '⚷', NorthNode: '☊', Lilith: '⚸'
};

export const PLANET_TR: Record<string, string> = {
  Sun: 'Güneş', Moon: 'Ay', Mercury: 'Merkür', Venus: 'Venüs', Mars: 'Mars',
  Jupiter: 'Jüpiter', Saturn: 'Satürn', Uranus: 'Uranüs', Neptune: 'Neptün',
  Pluto: 'Plüton', Chiron: 'Chiron', NorthNode: 'Kuzey Düğüm', Lilith: 'Lilith'
};

export const getPlanetById = (id: string): Planet | undefined => PLANETS.find(p => p.id === id);
