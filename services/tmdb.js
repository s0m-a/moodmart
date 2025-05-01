import Constants from "expo-constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
const tmdbApiKey = Constants.expoConfig.extra.tmdbapikey;


export const fetchMovies = async (mood)=>{
    const currentMood = mood ? mood.toLowerCase() : 'happy';
      // Define genre IDs for different moods
  const moodGenres = {
    happy: [28, 35, 10751, 16], // Action, Comedy, Family, Animation
    sad: [18, 10749], // Drama, Romance
    neutral: [12, 14, 878], // Adventure, Fantasy, Sci-Fi
    excited: [28, 12, 53, 80], // Action, Adventure, Thriller, Crime
    tired: [10752, 36, 99], // War, History, Documentary
  };
  const selectedGenres = moodGenres[currentMood] || [28, 35]; // Default to happy
  const genreQuery = selectedGenres.join(',');
    const cacheKey = `movie_${mood}`
    try{
        const cached = await AsyncStorage.getItem(cacheKey);
        if(cached){
            console.log(`using cached ${mood} movies`);
            return JSON.parse(cached);
        }
        const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&with_genres=${genreQuery}&page=1&language=en-US`
        );
        if(!res.ok){
            console.warn(`TMDB API error: ${res.status}`)
            return []
        }
        const data = await res.json();
        if(!data.results){
            console.warn(`Unexpected API response`, data);
            return [];
        }
        await AsyncStorage.setItem(cacheKey, JSON.stringify(data.results));
        return data.results;
    
    }catch (e){
        console.error('Fetch failed:', e);
        return [];
    }
}
