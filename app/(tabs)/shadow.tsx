import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useShadowStore } from '../../src/stores/shadowStore';

const QUESTIONS = [
  { id: 1, question: 'Gecenin en derin saatinde hangi duygu seni ele geçirir?', options: ['Öfke', 'Yalnızlık', 'Boşluk', 'Korku'] },
  { id: 2, question: 'Başkalarında en çok hangi özellik seni rahatsız eder?', options: ['Sahtelik', 'Zayıflık', 'Bencillik', 'Kontrolsüzlük'] },
];

export default function ShadowScreen() {
  const { results, setAnswer, setResults } = useShadowStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAnswer = (optionIndex: number) => {
    setAnswer(QUESTIONS[currentIndex].id, optionIndex);
    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setResults({ dominant: 'shadow', secondary: 'hero', scores: {} });
    }
  };

  if (results) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#060610', padding: 24 }}>
        <Text style={{ color: '#C9A84C', fontSize: 28, textAlign: 'center' }}>Gölge Arketipin</Text>
        <Text style={{ color: '#CCC8B4', fontSize: 16, textAlign: 'center', marginTop: 20 }}>Test tamamlandı! Sonuçların hazır.</Text>
      </ScrollView>
    );
  }

  const q = QUESTIONS[currentIndex];
  return (
    <View style={{ flex: 1, backgroundColor: '#060610', padding: 24 }}>
      <Text style={{ color: '#C9A84C', fontSize: 18, marginBottom: 8 }}>Soru {currentIndex + 1}/{QUESTIONS.length}</Text>
      <Text style={{ color: '#CCC8B4', fontSize: 20, marginBottom: 32 }}>{q.question}</Text>
      {q.options.map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={{ backgroundColor: '#0E0E1C', padding: 16, borderRadius: 12, marginBottom: 12 }}
          onPress={() => handleAnswer(i)}
        >
          <Text style={{ color: '#CCC8B4' }}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
