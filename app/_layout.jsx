import { Stack } from 'expo-router';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Navbar from '../components/Navbar';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
export default function Layout() {
  const [mood, setMood] = useState('relaxed');
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
     <Navbar />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
