import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0E0E1C', borderTopColor: 'rgba(201,168,76,0.13)' },
        tabBarActiveTintColor: '#C9A84C',
        tabBarInactiveTintColor: '#807C6A',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Ana' }} />
      <Tabs.Screen name="natal" options={{ title: 'Haritam' }} />
      <Tabs.Screen name="shadow" options={{ title: 'Gölgem' }} />
      <Tabs.Screen name="daily" options={{ title: 'Günlük' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profilim' }} />
    </Tabs>
  );
}
