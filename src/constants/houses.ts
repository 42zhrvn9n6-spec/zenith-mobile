import { House } from './types';

export const HOUSES: House[] = [
  { number: 1, name: 'Yaşam', ruler: 'Mars', meaning: 'Kişilik, beden, başlangıç, dış görünüş', keywords: ['ben', 'başlangıç', 'imaj'] },
  { number: 2, name: 'Değerler', ruler: 'Venüs', meaning: 'Para, yetenek, öz değer, mal varlık', keywords: ['para', 'değer', 'sahip olmak'] },
  { number: 3, name: 'İletişim', ruler: 'Merkür', meaning: 'Kardeşler, eğitim, seyahat, yakın çevre', keywords: ['iletişim', 'öğrenme', 'seyahat'] },
  { number: 4, name: 'Aile', ruler: 'Ay', meaning: 'Ev, kökler, duygusal güvenlik, baba', keywords: ['aile', 'kökler', 'güvenlik'] },
  { number: 5, name: 'Yaratıcılık', ruler: 'Güneş', meaning: 'Aşk, çocuklar, eğlence, yaratıcılık', keywords: ['aşk', 'yaratıcılık', 'eğlence'] },
  { number: 6, name: 'Sağlık', ruler: 'Merkür', meaning: 'İş, rutin, hastalık, sağlık, hizmet', keywords: ['sağlık', 'iş', 'rutin'] },
  { number: 7, name: 'İlişkiler', ruler: 'Venüs', meaning: 'Evlilik, ortaklık, düşman, açık düşman', keywords: ['ilişki', 'evlilik', 'ortaklık'] },
  { number: 8, name: 'Dönüşüm', ruler: 'Plüton', meaning: 'Ölüm, miras, seks, dönüşüm, kriz', keywords: ['dönüşüm', 'kriz', 'güç'] },
  { number: 9, name: 'Bilgelik', ruler: 'Jüpiter', meaning: 'Seyahat, felsefe, yüksek öğrenim, yayıncılık', keywords: ['bilgelik', 'seyahat', 'felsefe'] },
  { number: 10, name: 'Kariyer', ruler: 'Satürn', meaning: 'Statü, başarı, otorite, kariyer, itibar', keywords: ['kariyer', 'başarı', 'otorite'] },
  { number: 11, name: 'Topluluk', ruler: 'Uranüs', meaning: 'Arkadaşlar, umutlar, grup, sosyal çevre', keywords: ['arkadaş', 'topluluk', 'umut'] },
  { number: 12, name: 'Bilinçdışı', ruler: 'Neptün', meaning: 'Gizli, yalnızlık, hastane, rüyalar, bilinçdışı', keywords: ['bilinçdışı', 'gizli', 'ruya'] },
];

export const getHouseByNumber = (number: number): House | undefined => HOUSES.find(h => h.number === number);
