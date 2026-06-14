import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/stores/authStore';

export default function CosmicId() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [city, setCity] = useState('');
  const { setUser } = useAuthStore();

  const handleSave = () => {
    setUser({ birthData: { date, time, city } });
    router.push('/(tabs)');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#060610', padding: 24 }}>
      <Text style={{ color: '#C9A84C', fontSize: 24, marginBottom: 32, textAlign: 'center' }}>Kozmik Kimliğin</Text>
      
      <Text style={{ color: '#CCC8B4', marginBottom: 8 }}>Doğum Tarihi (YYYY-AA-GG)</Text>
      <TextInput style={{ backgroundColor: '#0E0E1C', color: '#CCC8B4', padding: 12, borderRadius: 8, marginBottom: 20 }} placeholder="1983-10-05" placeholderTextColor="#807C6A" value={date} onChangeText={setDate} />
      
      <Text style={{ color: '#CCC8B4', marginBottom: 8 }}>Doğum Saati (SS:DD)</Text>
      <TextInput style={{ backgroundColor: '#0E0E1C', color: '#CCC8B4', padding: 12, borderRadius: 8, marginBottom: 20 }} placeholder="15:45" placeholderTextColor="#807C6A" value={time} onChangeText={setTime} />
      
      <Text style={{ color: '#CCC8B4', marginBottom: 8 }}>Doğum Şehri</Text>
      <TextInput style={{ backgroundColor: '#0E0E1C', color: '#CCC8B4', padding: 12, borderRadius: 8, marginBottom: 32 }} placeholder="İstanbul" placeholderTextColor="#807C6A" value={city} onChangeText={setCity} />
      
      <TouchableOpacity style={{ backgroundColor: '#C9A84C', padding: 16, borderRadius: 12 }} onPress={handleSave}>
        <Text style={{ color: '#000', textAlign: 'center', fontWeight: 'bold' }}>Yolculuğa Başla</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
