import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../src/stores/authStore';
import { useChartStore } from '../../src/stores/chartStore';
import { natalApi } from '../../src/services/api/natal';

export default function NatalScreen() {
  const { user } = useAuthStore();
  const { natalChart, setNatalChart, setError } = useChartStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.birthData && !natalChart) {
      setLoading(true);
      natalApi.calculate(user.birthData)
        .then(res => { setNatalChart(res.data); setLoading(false); })
        .catch(err => { setError(err.message); setLoading(false); });
    }
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" color="#C9A84C" style={{ flex: 1, backgroundColor: '#060610' }} />;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#060610', padding: 20 }}>
      <Text style={{ color: '#C9A84C', fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Doğum Haritan</Text>
      {natalChart?.planets && Object.entries(natalChart.planets).map(([planet, data]) => (
        <View key={planet} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(201,168,76,0.13)' }}>
          <Text style={{ color: '#CCC8B4' }}>{planet}</Text>
          <Text style={{ color: '#C9A84C' }}>{data.sign} {data.degree}°</Text>
          <Text style={{ color: '#807C6A' }}>{data.house}. Ev</Text>
        </View>
      ))}
    </ScrollView>
  );
}
