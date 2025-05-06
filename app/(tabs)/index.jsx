import { StyleSheet, Text, View, Button,ScrollView, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react';
import * as WebBrowser from 'expo-web-browser';
import WatchList from "../../components/watchList"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native'; 
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import MovieList from '../../components/movieList';


const happyLines = [
  'Joy sparkles through your veins.',
  'You radiate light and laughter.',
  'The sun itself seems to follow you.',
  'Your smile lights up hidden corners.',
  'Every step feels like a dance today.'
];

const sadLines = [
  'A soft ache lingers in your chest.',
  'The sky wears a gray shawl with you.',
  'Raindrops echo the weight in your heart.',
  'Your breath feels heavy with quiet sorrow.',
  'A silent tear slips through your thoughts.'
];

const tiredLines = [
  'Your eyelids carry the weight of the day.',
  'Every breath feels slow, longing for rest.',
  'Your mind drifts like a leaf on still water.',
  'The world softens, waiting for you to pause.',
  'You carry the hush of evening in your bones.'
];
const angryLines = [
  'Fire crackles beneath your skin.',
  'Your thoughts race like a storm unleashed.',
  'Heat pulses with every heartbeat.',
  'Lightning sparks in the corners of your mind.',
  'You are a tempest waiting to roar.'
];

const neutralLines = [
  'You move through the day in quiet balance.',
  'A calm stillness shapes your thoughts.',
  'Neither high nor low, you rest in the middle.',
  'Your mind is a blank canvas, open to what comes.',
  'You float gently through the present moment.'
];
const moodLines = {
  Happy: happyLines,
  Sad: sadLines,
  Natural: neutralLines,
  Tired: tiredLines,
  Angry: angryLines
};
const handleViewMoreMovies = () => {
  const searchUrl = 'https://www.youtube.com/results?search_query=mukbang';
  WebBrowser.openBrowserAsync(searchUrl);
};
const Home = () => {
      const [mood, setMood] = useState(null);
      const[isNewDay, setIsNewDay] = useState(false)
      const [hasNavigated, setHasNavigated] = useState(false);
      const router = useRouter();
      useEffect(() => {
        const loadMood = async () => {
            try {
                const storedMood = await AsyncStorage.getItem('moods');
    
                if (storedMood) {
                    const moods = JSON.parse(storedMood);
                    const lastMood = moods[moods.length -1]
                    setMood(lastMood.label);
                } else {
                    console.log("No moods found in AsyncStorage");
                }
            } catch (error) {
                console.error("Error loading mood:", error);
            }
        };
    
        loadMood();
    }, []);
    useEffect( ()=>{
        const checkNewDay = async ()=>{
            const lastVisit = await AsyncStorage.getItem('lastVisit');
            const currentTime = new Date().toISOString().split('T')[0]; //gets cureent date
            if(lastVisit !== currentTime){
                setIsNewDay(true);
                await AsyncStorage.setItem('lastVisit', currentTime)
            }
        };
        checkNewDay();
    },[]);
    useEffect(() => {
      if (isNewDay && !hasNavigated) {
          setHasNavigated(true);  // Mark that navigation has occurred
          router.push("/emoji-mood-screen"); 
      }
  }, [isNewDay, router, hasNavigated]); 
    const [fontsLoaded] = useFonts({
    'ZillaSlab': require("../../assets/fonts/ZillaSlab-Regular.ttf"),
    "ZillaSlabRegular": require('../../assets/fonts/ZillaSlab-Regular.ttf'),
    "ZillaItalic":require("../../assets/fonts/ZillaSlab-Italic.ttf")
  });
  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const randomMoodLine = moodLines[mood]
  ? moodLines[mood][Math.floor(Math.random() * moodLines[mood].length)]
  : '';
  return (
    <ScrollView >
<View style={styles.container}>
{mood && <Text style={styles.moodText}>{randomMoodLine}</Text>}

    <View style={styles.section}>
        <Text style={styles.title}>Trending Mukbang Videos</Text>
          <WatchList /> 
        <TouchableOpacity 
        style={styles.viewMoreButton} 
        onPress={() => handleViewMoreMovies()}
        >
          <Text style={styles.viewMoreText}> View More </Text>
        </TouchableOpacity>
    </View>

  <View style={styles.section}>
     <Text style={styles.title}>movie section</Text>
     <MovieList mood={mood} />
  </View>



    </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    moodText:{
        marginTop:20,
        textAlign: "center",
        fontFamily: "ZillaSlabRegular"
    },
    section: {
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5, // Shadow spread
    elevation: 5, 
      
    },
    title: {
      color: "#7D7D7D",
      fontSize: 15,
      fontWeight: 'bold',
      marginTop: 30,
      marginBottom:30,
      fontFamily: "ZillaItalic",
      paddingHorizontal:30,
      textTransform: "Uppercase"
    },
    viewMoreButton: {
      marginVertical: 6,
      paddingVertical: 8,
      paddingHorizontal: 15,
      backgroundColor: '#6E6E6E',
      borderRadius: 5,
      alignSelf: 'center',
    },
    viewMoreText: {
      color: '#fff',
      fontWeight: 'bold',
      
    },
    scrollContainer: {
        paddingVertical: 10,
    },
  });
  