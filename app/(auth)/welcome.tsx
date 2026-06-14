import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/stores/authStore';

export default function Welcome() {
  const { setGuest } = useAuthStore();
  
  return (
    <View style={{ flex: 1, backgroundColor: '#060610', padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: '#C9A84C', fontSize: 36, textAlign: 'center', marginBottom: 20 }}>Z Zenith</Text>
      <Text style={{ color: '#CCC8B4', fontSize: 16, textAlign: 'center', marginBottom: 48 }}>Kozmik yolculuğuna başla</Text>
      
      <TouchableOpacity 
        style={{ backgroundColor: '#C9A84C', padding: 16, borderRadius: 12, marginBottom: 12 }}
        onPress={() => router.push('/(auth)/cosmic-id')}
      >
        <Text style={{ color: '#000', textAlign: 'center', fontWeight: 'bold' }}>Kozmik Kimliğimi Oluştur</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={{ borderWidth: 1, borderColor: '#8B6914', padding: 16, borderRadius: 12 }}
        onPress={() => { setGuest(); router.push('/(tabs)'); }}
      >
        <Text style={{ color: '#CCC8B4', textAlign: 'center' }}>Misafir Olarak Devam Et</Text>
      </TouchableOpacity>
    </View>
  );
}
