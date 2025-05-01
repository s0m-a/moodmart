import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 

const emojis = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😞', label: 'Sad' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '🥱', label: 'Tired' },
    { emoji: '😎', label: 'Excited' },
]

const EmojiMoodScreen = () => {
    const [selectedMood, setSelectedMood] = useState(null)
    const navigation = useNavigation();
    const saveMood = async (emojis, label)=>{
        try {
            const moodDate = {
                mood: emojis,
                label: label,
                timestamp: new Date().toISOString()
            };
            let moods = await AsyncStorage.getItem('moods');
            moods = moods ? JSON.parse(moods): [];
            moods.push(moodDate);
            // Save the updated moods array back to AsyncStorage
            await AsyncStorage.setItem('moods', JSON.stringify(moods))
            setSelectedMood(moodDate);
            navigation.navigate('index', { mood: label }); // Pass mood to WatchList screen
        } catch (error) {
            console.error("Error saving mood:", error)
        }
    }
    return (
        <View style={styles.container}>
          <Text style={styles.headText}>How are you feeling now?</Text>
          
          {/* Parent View that contains all emojis */}
          <View style={styles.emojisRow}>
            {emojis.map((item, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => saveMood(item.emoji, item.label)}
                style={styles.emojiContainer}
              >
                <Text style={{fontSize: 30}}>{item.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {selectedMood && (
            <Text> You selected: {selectedMood.label} {selectedMood.mood} </Text>
          )}
        </View>
      );
      
}

export default EmojiMoodScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
  
    headText: {
      textTransform: 'uppercase',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'Roboto_700Bold',
    },
  
   
    emojisRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
    },
  
    emojiContainer: {
      marginHorizontal: 10, 
    }
  });
  