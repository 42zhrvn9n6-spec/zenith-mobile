import { Archetype } from './types';

export const ARCHETYPES: Archetype[] = [
  { id: 'hero', nameTR: 'Kahraman', color: '#C05555', shadow: 'Zorba', gift: 'Cesaret, dayanıklılık, koruma', element: 'fire', description: 'Mücadele eden, hedeflerine ulaşan', meditation: 'Gücünü nereden alıyorsun?' },
  { id: 'shadow', nameTR: 'Gölge', color: '#4A1A6A', shadow: 'Yıkıcı', gift: 'Yaratıcılık, özgünlük, güç', element: 'dark', description: 'Bastırılan, inkar edilen', meditation: 'İçindeki karanlık ne söylüyor?' },
  { id: 'anima', nameTR: 'Anima', color: '#4878C0', shadow: 'Baş Belası', gift: 'Empati, bağlantı, sezgi', element: 'water', description: 'Ruh, bağlantı kurma', meditation: 'İç sesin ne diyor?' },
  { id: 'self', nameTR: 'Benlik', color: '#F0D080', shadow: 'Bütünleşmemiş', gift: 'Bütünlük, anlam, merkez', element: 'spirit', description: 'Bütün, merkez, denge', meditation: 'Tüm parçaların birleştiğinde kim oluyorsun?' },
  { id: 'persona', nameTR: 'Persona', color: '#8B6914', shadow: 'Sahtekar', gift: 'Sosyal uyum, çok yönlülük', element: 'earth', description: 'Maske, sosyal rol', meditation: 'Masken düştüğünde arkada kim var?' },
  { id: 'trickster', nameTR: 'Hileci', color: '#7850B0', shadow: 'Manipülatör', gift: 'Yaratıcılık, özgürlük, uyanış', element: 'air', description: 'Sınırları delen, değişim', meditation: 'Kurallar senin için ne ifade ediyor?' },
  { id: 'sage', nameTR: 'Bilge', color: '#4A9870', shadow: 'Dogmatik', gift: 'Bilgelik, rehberlik, içgörü', element: 'air', description: 'Bilen, yol gösteren', meditation: 'Bilmediğin şey nedir?' },
  { id: 'caregiver', nameTR: 'Bakıcı', color: '#C08040', shadow: 'Şehit', gift: 'Şefkat, koruma, besleme', element: 'earth', description: 'Bakan, koruyan', meditation: 'Kendine ne kadar bakıyorsun?' },
  { id: 'creator', nameTR: 'Yaratıcı', color: '#C05555', shadow: 'Mükemmeliyetçi', gift: 'Hayal gücü, ifade, yenilik', element: 'fire', description: 'Yaratan, üreten', meditation: 'Yaratmak seni nasıl hissettiriyor?' },
  { id: 'ruler', nameTR: 'Hükümdar', color: '#6B5A3A', shadow: 'Tiran', gift: 'Liderlik, düzen, otorite', element: 'earth', description: 'Yöneten, düzen kuran', meditation: 'Nasıl bir lider olmak istersin?' },
  { id: 'rebel', nameTR: 'İsyancı', color: '#E08040', shadow: 'Nihilist', gift: 'Değişim, özgürlük, dönüşüm', element: 'fire', description: 'Karşı çıkan, değiştiren', meditation: 'Neye karşı geliyorsun?' },
  { id: 'lover', nameTR: 'Aşık', color: '#B04070', shadow: 'Obsesif', gift: 'Tutku, bağlılık, bağlantı', element: 'water', description: 'Seven, bağlanan', meditation: 'Aşk sende nasıl hissediliyor?' },
];

export const getArchetypeById = (id: string): Archetype | undefined => ARCHETYPES.find(a => a.id === id);
