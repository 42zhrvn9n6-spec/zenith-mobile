import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../src/stores/authStore';
import { useDailyStore } from '../../src/stores/dailyStore';
import { dailyApi } from '../../src/services/api/daily';

export default function DailyScreen() {
  const { user } = useAuthStore();
  const { todayReading, setTodayReading } = useDailyStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!todayReading && user?.birthData) {
      setLoading(true);
      dailyApi.getTodayReading('Koç').then(res => { setTodayReading(res.data); setLoading(false); });
    }
  }, [user]);

  if (loading) return <ActivityIndicator size="large" color="#C9A84C" style={{ flex: 1, backgroundColor: '#060610' }} />;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#060610', padding: 24 }}>
      <Text style={{ color: '#C9A84C', fontSize: 28, textAlign: 'center', marginBottom: 8 }}>Günlük Burç Yorumu</Text>
      <Text style={{ color: '#807C6A', fontSize: 14, textAlign: 'center', marginBottom: 32 }}>{todayReading?.date}</Text>
      <View style={{ backgroundColor: '#0E0E1C', padding: 24, borderRadius: 20 }}>
        <Text style={{ color: '#CCC8B4', fontSize: 16, lineHeight: 26 }}>{todayReading?.reading || 'Yükleniyor...'}</Text>
      </View>
    </ScrollView>
  );
}
