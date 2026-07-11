import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useAstroStore } from '../../src/store/astroStore';
import { usePaymentService } from '../../src/services/payment';
import { COLORS } from '../../src/constants/colors';

const { width } = Dimensions.get('window');

export default function AnalysisScreen() {
  const { birthData, jungResult } = useAstroStore();
  const { isSubscribed, purchaseProduct, checkSubscriptionStatus } = usePaymentService();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await checkSubscriptionStatus();
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.dark.ink, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.dark.gold} />
        <Text style={{ color: COLORS.dark.textDim, marginTop: 16 }}>Yıldızlar hesaplanıyor...</Text>
      </View>
    );
  }

  if (isSubscribed) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.dark.ink, padding: 24 }}>
        <Text style={{ color: COLORS.dark.gold, fontSize: 28, textAlign: 'center', marginBottom: 8 }}>
          ✨ Tam Raporun
        </Text>
        <Text style={{ color: COLORS.dark.textDim, fontSize: 14, textAlign: 'center', marginBottom: 32 }}>
          Doğum haritan ve Jung arketipin birleşti
        </Text>

        <View style={{ backgroundColor: COLORS.dark.panel, padding: 16, borderRadius: 12, marginBottom: 12 }}>
          <Text style={{ color: COLORS.dark.gold, fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>🌞 Doğum Haritan</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ color: COLORS.dark.textDim }}>Güneş Burcu</Text>
            <Text style={{ color: COLORS.dark.text }}>{birthData?.sign || '—'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ color: COLORS.dark.textDim }}>Ay Burcu</Text>
            <Text style={{ color: COLORS.dark.text }}>{birthData?.moonSign || 'Hesaplanıyor...'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: COLORS.dark.textDim }}>Yükselen</Text>
            <Text style={{ color: COLORS.dark.text }}>{birthData?.ascendant || 'Hesaplanıyor...'}</Text>
          </View>
        </View>

        <View style={{ backgroundColor: COLORS.dark.panel, padding: 16, borderRadius: 12, marginBottom: 12 }}>
          <Text style={{ color: COLORS.dark.gold, fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>🧠 Jung Arketipin</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ color: COLORS.dark.textDim }}>Baskın</Text>
            <Text style={{ color: COLORS.dark.gold, fontWeight: 'bold' }}>{jungResult?.dominant || '—'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: COLORS.dark.textDim }}>İkincil</Text>
            <Text style={{ color: COLORS.dark.text }}>{jungResult?.secondary || '—'}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{ borderWidth: 1, borderColor: COLORS.dark.border, padding: 16, borderRadius: 12, alignItems: 'center' }}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={{ color: COLORS.dark.textDim }}>Ana Sayfaya Dön</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // ÜCRETSİZ KULLANICIYA GÖSTERİLEN EKRAN
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.dark.ink, padding: 24 }}>
      <Text style={{ color: COLORS.dark.gold, fontSize: 28, textAlign: 'center', marginBottom: 8 }}>
        ✨ Raporun Neredeyse Hazır
      </Text>
      <Text style={{ color: COLORS.dark.textDim, fontSize: 14, textAlign: 'center', marginBottom: 32 }}>
        Son iki adım kaldı, hadi tamamlayalım
      </Text>

      {/* ÖZET (Tadımlık) */}
      <View style={{ backgroundColor: COLORS.dark.panel, padding: 16, borderRadius: 12, marginBottom: 12 }}>
        <Text style={{ color: COLORS.dark.gold, fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>🌞 Güneş Burcun</Text>
        <Text style={{ color: COLORS.dark.text, fontSize: 24, fontWeight: 'bold' }}>{birthData?.sign || '—'}</Text>
        <Text style={{ color: COLORS.dark.textDim, fontSize: 12, marginTop: 4 }}>
          Kişiliğinin özü, temel karakterin
        </Text>
      </View>

      <View style={{ backgroundColor: COLORS.dark.panel, padding: 16, borderRadius: 12, marginBottom: 12 }}>
        <Text style={{ color: COLORS.dark.gold, fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>🧠 Jung Arketipin</Text>
        <Text style={{ color: COLORS.dark.text, fontSize: 24, fontWeight: 'bold' }}>{jungResult?.dominant || '—'}</Text>
        <Text style={{ color: COLORS.dark.textDim, fontSize: 12, marginTop: 4 }}>
          Bilinçdışındaki en güçlü yönün
        </Text>
      </View>

      {/* KİLİTLİ İÇERİK (Merak Uyandırma) */}
      <View style={{ backgroundColor: COLORS.dark.panel, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: COLORS.dark.gold, marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
          <Text style={{ color: COLORS.dark.gold, fontWeight: 'bold' }}>🔒 Kilitli İçerik</Text>
          <Text style={{ color: COLORS.dark.textDim, fontSize: 12 }}>Premium</Text>
        </View>
        <Text style={{ color: COLORS.dark.text, marginBottom: 6 }}>• 15 sayfa detaylı rapor</Text>
        <Text style={{ color: COLORS.dark.text, marginBottom: 6 }}>• 12 ev ve 7 açı analizi</Text>
        <Text style={{ color: COLORS.dark.text, marginBottom: 6 }}>• Kişisel AI yorum (3 paragraf)</Text>
        <Text style={{ color: COLORS.dark.text, marginBottom: 6 }}>• PDF olarak dışa aktar</Text>
        <Text style={{ color: COLORS.dark.textDim, fontSize: 12, marginTop: 8 }}>
          Bu içerikler 5 dakikada oluşturuldu, senin için özel.
        </Text>
      </View>

      {/* SOSYAL KANIT */}
      <Text style={{ color: COLORS.dark.textDim, fontSize: 12, textAlign: 'center', marginBottom: 16 }}>
        ⭐ Bugün 1.234 kişi tam raporunu aldı
      </Text>

      {/* ÖDEME BUTONU (3 GÜN ÜCRETSİZ) */}
      <TouchableOpacity
        style={{ backgroundColor: COLORS.dark.gold, padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 }}
        onPress={() => purchaseProduct('premium_trial')}
      >
        <Text style={{ color: '#060610', fontSize: 18, fontWeight: 'bold' }}>
          🚀 3 Gün Ücretsiz Dene
        </Text>
        <Text style={{ color: '#060610', fontSize: 12 }}>
          Sonra 99 TL/ay • İstediğin zaman iptal et
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ borderWidth: 1, borderColor: COLORS.dark.border, padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 }}
        onPress={() => router.push('/(tabs)')}
      >
        <Text style={{ color: COLORS.dark.textDim }}>Daha Sonra</Text>
      </TouchableOpacity>

      <Text style={{ color: COLORS.dark.textDim, fontSize: 10, textAlign: 'center', marginTop: 8 }}>
        Beğenmezsen 7 gün içinde iade
      </Text>
    </ScrollView>
  );
}
