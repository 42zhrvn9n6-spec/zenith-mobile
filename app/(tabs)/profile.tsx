import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/stores/authStore';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#060610', padding: 24 }}>
      <Text style={{ color: '#C9A84C', fontSize: 28, marginBottom: 32, textAlign: 'center' }}>Profilim</Text>
      
      <View style={{ backgroundColor: '#0E0E1C', padding: 20, borderRadius: 16, marginBottom: 24 }}>
        <Text style={{ color: '#CCC8B4', fontSize: 14, marginBottom: 8 }}>Doğum Tarihi</Text>
        <Text style={{ color: '#C9A84C', fontSize: 18 }}>{user?.birthData?.date || '-'}</Text>
        
        <Text style={{ color: '#CCC8B4', fontSize: 14, marginBottom: 8, marginTop: 16 }}>Doğum Yeri</Text>
        <Text style={{ color: '#C9A84C', fontSize: 18 }}>{user?.birthData?.city || '-'}</Text>
      </View>
      
      <TouchableOpacity 
        style={{ backgroundColor: '#C05555', padding: 16, borderRadius: 12 }}
        onPress={() => { logout(); router.push('/(auth)/welcome'); }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
