import { Redirect } from 'expo-router';
import { useAuthStore } from '../src/stores/authStore';

export default function Index() {
  const { isGuest } = useAuthStore();
  return <Redirect href={isGuest ? "/(auth)/welcome" : "/(tabs)"} />;
}
