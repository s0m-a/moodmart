import { StyleSheet, Text, View, Button,ScrollView, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react';
import { Link } from 'expo-router';
import WatchList from "../../components/watchList"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native'; 
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import MovieList from '../../components/movieList';

const Home = () => {
      const route = useRoute(); // Use route to access passed parameters
      const mood = route.params?.mood; // Get mood from params
      const[isNewDay, setIsNewDay] = useState(false)
      const router = useRouter();

    useEffect( ()=>{
        const checkNewDay = async ()=>{
            const lastVisit = await AsyncStorage.getItem('lastVisit');
            const currentTime = new Date().toISOString().split('T')[0];
            if(lastVisit !== currentTime){
                setIsNewDay(true);
                await AsyncStorage.setItem('lastVisit', currentTime)
            }
        };
        checkNewDay();
    },[]);
    useEffect( ()=>{
        if(isNewDay) {
            router.push("/emoji-mood-screen")
        }
    }, [isNewDay, router]);
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

  
  return (
<View style={styles.container}>
{mood && <Text style={styles.moodText}>Your current mood: {mood}</Text>}

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
    marginBottom: 20,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow intensity
    shadowRadius: 5, // Shadow spread
    elevation: 5, // For Android shadow
      
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
      marginVertical: 10,
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
  