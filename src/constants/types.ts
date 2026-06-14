export interface Planet {
  id: string;
  name: string;
  symbol: string;
  type: 'luminary' | 'personal' | 'social' | 'transpersonal' | 'asteroid' | 'point';
  meaning: string;
}

export interface Sign {
  id: string;
  name: string;
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  modality: 'cardinal' | 'fixed' | 'mutable';
  ruling: string;
  dates: string;
}

export interface Aspect {
  name: string;
  symbol: string;
  angle: number;
  orb: number;
  meaning: string;
  quality: 'major' | 'minor' | 'hard' | 'soft';
}

export interface House {
  number: number;
  name: string;
  ruler: string;
  meaning: string;
  keywords: string[];
}

export interface Archetype {
  id: string;
  nameTR: string;
  color: string;
  shadow: string;
  gift: string;
  element: string;
  description: string;
  meditation: string;
}
