import { View, Text, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import import { useAstroStore } from '../../src/store/astroStore';

import { COLORS } from '../../src/constants/colors';
import Svg, { Circle, Line, Text as SvgText, G, Polygon } from 'react-native-svg';

const { width } = Dimensions.get('window');

// --- 24 SORU ---
const QUESTIONS = [
  { id: 1, text: 'Gecenin derin saatinde hangi duygu seni ele geçirir?', options: ['Öfke', 'Yalnızlık', 'Boşluk', 'Korku'] },
  { id: 2, text: 'Başkalarında en çok hangi özellik seni rahatsız eder?', options: ['Sahtelik', 'Zayıflık', 'Bencillik', 'Kontrolsüzlük'] },
  { id: 3, text: 'İçinde yaşayan "diğer sen" sana ne söylerdi?', options: ['Sertsin', 'Kaçıyorsun', 'Hissediyorsun', 'Memnun ediyorsun'] },
  { id: 4, text: 'Hayatında en derin iz bırakan ilişki sende ne uyandırdı?', options: ['Kendimi gördüm', 'Fark ettim', 'Anladım', 'Maskemi gördüm'] },
  { id: 5, text: 'Sevdiğin biri için hangi sınırı aşabilirsin?', options: ['Her şeyi', 'Kendimi kaybetmem', 'Hiçbirini', 'Sınırsız'] },
  { id: 6, text: 'Kurallar sana göre mi, yoksa sen kurallara göre mi?', options: ['Benim için var', 'Uyarım ama isyan', 'Güvenlik verir', 'Hangi kurallar?'] },
  { id: 7, text: 'Hayatının anlamını düşündüğünde içinde ne belirir?', options: ['Sessizlik', 'Huzursuzluk', 'Netlik', 'Korku'] },
  { id: 8, text: 'Kendine verdiğin en büyük söz neydi?', options: ['Vazgeçmem', 'Değişirim', 'Hatırlamıyorum', 'Vermem'] },
  { id: 9, text: 'Başkaları seni nasıl tanımlar?', options: ['Lider', 'Duygusal', 'Zeki', 'Gizemli'] },
  { id: 10, text: 'Zor bir karar verirken neye güvenirsin?', options: ['Mantık', 'Sezgi', 'Deneyim', 'İç ses'] },
  { id: 11, text: 'En büyük korkun ne?', options: ['Başarısızlık', 'Yalnızlık', 'Kaybetmek', 'Bilinmezlik'] },
  { id: 12, text: 'Hayatında en çok neyi değiştirmek isterdin?', options: ['Geçmiş', 'İlişkiler', 'Kariyer', 'Kendim'] },
  { id: 13, text: 'İnsanlara güvenir misin?', options: ['Evet', 'Hayır', 'Bazen', 'Şartlı'] },
  { id: 14, text: 'Aşk senin için ne ifade eder?', options: ['Tutku', 'Güven', 'Fedakarlık', 'Özgürlük'] },
  { id: 15, text: 'Hangi duygu seni en çok yorar?', options: ['Öfke', 'Kaygı', 'Üzüntü', 'Hayal kırıklığı'] },
  { id: 16, text: 'Yalnız kaldığında ne yaparsın?', options: ['Düşünürüm', 'Okurum', 'Plan yaparım', 'Hislerimle yüzleşirim'] },
  { id: 17, text: 'En büyük pişmanlığın ne?', options: ['Vazgeçmek', 'Konuşmamak', 'Korkmak', 'Gecikmek'] },
  { id: 18, text: 'Hayatta en çok neye değer verirsin?', options: ['Özgürlük', 'Sevgi', 'Başarı', 'Adalet'] },
  { id: 19, text: 'Bir arkadaşın sana ne zaman kızar?', options: ['Geç kalınca', 'Yalan söyleyince', 'Önemsemeyince', 'Anlamayınca'] },
  { id: 20, text: 'Hangi ortamda kendini en rahat hissedersin?', options: ['Kalabalık', 'Yalnız', 'Doğada', 'Evde'] },
  { id: 21, text: 'Hangi konuda uzmansın?', options: ['İletişim', 'Planlama', 'Yaratıcılık', 'Dinleme'] },
  { id: 22, text: 'Gelecekten ne bekliyorsun?', options: ['Başarı', 'Huzur', 'Aşk', 'Sürpriz'] },
  { id: 23, text: 'Hangi söz seni en çok motive eder?', options: ['Yapabilirsin', 'Kazanacaksın', 'Hata yok', 'Devam et'] },
  { id: 24, text: 'Son soru: Kendini tek kelimeyle tanımla?', options: ['Güçlü', 'Duyarlı', 'Zeki', 'Özgün'] },
];

const ARCHETYPES = ['Kahraman', 'Gölge', 'Anima', 'Benlik', 'Persona', 'Hileci', 'Bakıcı', 'Bilge'];

const COLORS_ARCHETYPE: Record<string, string> = {
  Kahraman: '#C05555',
  Gölge: '#4A1A6A',
  Anima: '#4878C0',
  Benlik: '#F0D080',
  Persona: '#8B6914',
  Hileci: '#7850B0',
  Bakıcı: '#C08040',
  Bilge: '#4A9870',
};

export default function JungTestScreen() {
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const { setJungResult } = useAstroStore();

  const handleAnswer = (optionIdx: number) => {
    const archetype = ARCHETYPES[optionIdx % ARCHETYPES.length];
    setScores(prev => ({ ...prev, [archetype]: (prev[archetype] || 0) + 1 }));

    if (index < QUESTIONS.length - 1) {
      setIndex(index + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleShowResult = () => {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const dominant = sorted[0]?.[0] || 'Bilge';
    const secondary = sorted[1]?.[0] || 'Gölge';
    
    setJungResult({ dominant, secondary, scores });
    router.push('/(tabs)/analysis');
  };

  const renderRadar = () => {
    const size = width - 80;
    const center = size / 2;
    const radius = size / 2 - 20;
    const maxScore = Math.max(...Object.values(scores), 1);

    const angleStep = (2 * Math.PI) / ARCHETYPES.length;
    const points = ARCHETYPES.map((arch, i) => {
      const score = scores[arch] || 0;
      const r = (score / maxScore) * radius;
      const angle = i * angleStep - Math.PI / 2;
      return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
    });

    const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

    return (
      <Svg width={size} height={size}>
        {[1, 2, 3, 4].map((level) => {
          const r = (level / 4) * radius;
          const pts = ARCHETYPES.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          }).join(' ');
          return <Polygon key={level} points={pts} fill="none" stroke="#31254C" strokeWidth={0.5} />;
        })}

        {ARCHETYPES.map((arch, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return (
            <Line
              key={i}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="#31254C"
              strokeWidth={0.5}
            />
          );
        })}

        <Polygon points={polygonPoints} fill="rgba(201,168,76,0.2)" stroke="#C9A84C" strokeWidth={2} />

        {ARCHETYPES.map((arch, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const score = scores[arch] || 0;
          const r = (score / maxScore) * radius;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          const labelR = radius + 20;
          const lx = center + labelR * Math.cos(angle);
          const ly = center + labelR * Math.sin(angle);

          return (
            <G key={i}>
              <Circle cx={x} cy={y} r={4} fill={COLORS_ARCHETYPE[arch] || '#C9A84C'} />
              <SvgText x={lx} y={ly} fill="#E0D7EC" fontSize={9} textAnchor="middle" alignmentBaseline="middle">
                {arch.substring(0, 4)}
              </SvgText>
            </G>
          );
        })}
      </Svg>
    );
  };

  if (showResult) {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const dominant = sorted[0]?.[0] || 'Bilge';
    const secondary = sorted[1]?.[0] || 'Gölge';

    return (
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.dark.ink, padding: 24 }}>
        <Text style={{ color: COLORS.dark.gold, fontSize: 28, textAlign: 'center', marginBottom: 16 }}>
          🧠 Jung Arketip Sonucun
        </Text>

        <View style={{ alignItems: 'center', marginVertical: 16 }}>
          {renderRadar()}
        </View>

        <View style={{ backgroundColor: COLORS.dark.panel, padding: 16, borderRadius: 12, marginBottom: 12 }}>
          <Text style={{ color: COLORS.dark.textDim, fontSize: 12 }}>Baskın Arketip</Text>
          <Text style={{ color: COLORS.dark.gold, fontSize: 24, fontWeight: 'bold' }}>{dominant}</Text>
          <Text style={{ color: COLORS.dark.text, fontSize: 14, marginTop: 4 }}>
            {dominant === 'Kahraman' ? 'Cesur, kararlı, lider' :
             dominant === 'Gölge' ? 'Karanlık, bastırılmış, güçlü' :
             dominant === 'Anima' ? 'Duygusal, bağlantı kuran, sezgisel' :
             dominant === 'Benlik' ? 'Bütün, merkez, dengeli' :
             dominant === 'Persona' ? 'Maskeli, sosyal, uyumlu' :
             dominant === 'Hileci' ? 'Sınır tanımaz, yaratıcı, özgür' :
             dominant === 'Bakıcı' ? 'Koruyucu, şefkatli, besleyici' :
             'Bilen, rehberlik eden, içgörülü'}
          </Text>
        </View>

        <View style={{ backgroundColor: COLORS.dark.panel, padding: 16, borderRadius: 12, marginBottom: 20 }}>
          <Text style={{ color: COLORS.dark.textDim, fontSize: 12 }}>İkincil Arketip</Text>
          <Text style={{ color: COLORS.dark.text, fontSize: 18, fontWeight: 'bold' }}>{secondary}</Text>
        </View>

        <TouchableOpacity
          style={{ backgroundColor: COLORS.dark.gold, padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 }}
          onPress={handleShowResult}
        >
          <Text style={{ color: '#060610', fontSize: 16, fontWeight: 'bold' }}>
            🔓 Detaylı Raporu Aç (99 TL)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ borderWidth: 1, borderColor: COLORS.dark.border, padding: 16, borderRadius: 12, alignItems: 'center' }}
          onPress={() => {
            setScores({});
            setIndex(0);
            setShowResult(false);
          }}
        >
          <Text style={{ color: COLORS.dark.textDim }}>Testi Tekrarla</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const q = QUESTIONS[index];
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.dark.ink, padding: 24 }}>
      <Text style={{ color: COLORS.dark.gold, fontSize: 16, marginBottom: 8 }}>
        Soru {index + 1} / {QUESTIONS.length}
      </Text>

      <Text style={{ color: COLORS.dark.text, fontSize: 22, fontWeight: '600', marginBottom: 32 }}>
        {q.text}
      </Text>

      {q.options.map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={{
            backgroundColor: COLORS.dark.panel,
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: COLORS.dark.border,
          }}
          onPress={() => handleAnswer(i)}
        >
          <Text style={{ color: COLORS.dark.text, fontSize: 16 }}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
