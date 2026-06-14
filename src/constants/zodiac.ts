import { Sign } from './types';

export const SIGNS: Sign[] = [
  { id: 'aries', name: 'Koç', symbol: '♈', element: 'fire', modality: 'cardinal', ruling: 'Mars', dates: '21 Mar - 19 Nis' },
  { id: 'taurus', name: 'Boğa', symbol: '♉', element: 'earth', modality: 'fixed', ruling: 'Venüs', dates: '20 Nis - 20 May' },
  { id: 'gemini', name: 'İkizler', symbol: '♊', element: 'air', modality: 'mutable', ruling: 'Merkür', dates: '21 May - 20 Haz' },
  { id: 'cancer', name: 'Yengeç', symbol: '♋', element: 'water', modality: 'cardinal', ruling: 'Ay', dates: '21 Haz - 22 Tem' },
  { id: 'leo', name: 'Aslan', symbol: '♌', element: 'fire', modality: 'fixed', ruling: 'Güneş', dates: '23 Tem - 22 Ağu' },
  { id: 'virgo', name: 'Başak', symbol: '♍', element: 'earth', modality: 'mutable', ruling: 'Merkür', dates: '23 Ağu - 22 Eyl' },
  { id: 'libra', name: 'Terazi', symbol: '♎', element: 'air', modality: 'cardinal', ruling: 'Venüs', dates: '23 Eyl - 22 Eki' },
  { id: 'scorpio', name: 'Akrep', symbol: '♏', element: 'water', modality: 'fixed', ruling: 'Plüton', dates: '23 Eki - 21 Kas' },
  { id: 'sagittarius', name: 'Yay', symbol: '♐', element: 'fire', modality: 'mutable', ruling: 'Jüpiter', dates: '22 Kas - 21 Ara' },
  { id: 'capricorn', name: 'Oğlak', symbol: '♑', element: 'earth', modality: 'cardinal', ruling: 'Satürn', dates: '22 Ara - 19 Oca' },
  { id: 'aquarius', name: 'Kova', symbol: '♒', element: 'air', modality: 'fixed', ruling: 'Uranüs', dates: '20 Oca - 18 Şub' },
  { id: 'pisces', name: 'Balık', symbol: '♓', element: 'water', modality: 'mutable', ruling: 'Neptün', dates: '19 Şub - 20 Mar' },
];

export const SIGN_MAP: Record<string, Sign> = {
  Aries: SIGNS[0], Taurus: SIGNS[1], Gemini: SIGNS[2], Cancer: SIGNS[3],
  Leo: SIGNS[4], Virgo: SIGNS[5], Libra: SIGNS[6], Scorpio: SIGNS[7],
  Sagittarius: SIGNS[8], Capricorn: SIGNS[9], Aquarius: SIGNS[10], Pisces: SIGNS[11]
};

export const SIGN_SYMBOLS: Record<string, string> = {
  Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋',
  Leo: '♌', Virgo: '♍', Libra: '♎', Scorpio: '♏',
  Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓'
};

export const SIGN_TR: Record<string, string> = {
  Aries: 'Koç', Taurus: 'Boğa', Gemini: 'İkizler', Cancer: 'Yengeç',
  Leo: 'Aslan', Virgo: 'Başak', Libra: 'Terazi', Scorpio: 'Akrep',
  Sagittarius: 'Yay', Capricorn: 'Oğlak', Aquarius: 'Kova', Pisces: 'Balık'
};

export const SIGN_RULERS: Record<string, string> = {
  Aries: 'Mars', Taurus: 'Venüs', Gemini: 'Merkür', Cancer: 'Ay',
  Leo: 'Güneş', Virgo: 'Merkür', Libra: 'Venüs', Scorpio: 'Plüton',
  Sagittarius: 'Jüpiter', Capricorn: 'Satürn', Aquarius: 'Uranüs', Pisces: 'Neptün'
};

export const SIGN_ELEMENTS: Record<string, string> = {
  Aries: 'fire', Leo: 'fire', Sagittarius: 'fire',
  Taurus: 'earth', Virgo: 'earth', Capricorn: 'earth',
  Gemini: 'air', Libra: 'air', Aquarius: 'air',
  Cancer: 'water', Scorpio: 'water', Pisces: 'water'
};

export const getSignById = (id: string): Sign | undefined => SIGNS.find(s => s.id === id);
export const getSignByName = (name: string): Sign | undefined => SIGNS.find(s => s.name === name);
export const getElementColor = (element: string): string => {
  switch(element) {
    case 'fire': return '#C05555';
    case 'earth': return '#4A9870';
    case 'air': return '#4878C0';
    case 'water': return '#7850B0';
    default: return '#C9A84C';
  }
};
