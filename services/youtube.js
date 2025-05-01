import Constants from 'expo-constants'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_KEY = Constants.expoConfig.extra.youtubeApiKey;


export const fetchVidoes = async () => {
  const cacheKey = 'videos_mukbang';

  try {
    // 1. Try to load from cache
    const cached = await AsyncStorage.getItem(cacheKey);
    if (cached) {
      console.log('Using cached mukbang videos');
      return JSON.parse(cached);
    }

    // 2. Fetch mukbang videos from YouTube API
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=mukbang&maxResults=10&key=${API_KEY}`
    );

    if (!res.ok) {
      console.warn(`YouTube API error: ${res.status}`);
      return [];
    }

    const data = await res.json();
    if (!data.items) {
      console.warn(`Unexpected API response`, data);
      return [];
    }

    // 3. Cache the result
    await AsyncStorage.setItem(cacheKey, JSON.stringify(data.items));
    console.log(data.items)
    return data.items;

  } catch (e) {
    console.error('Fetch failed:', e);
    return [];
  }
};
