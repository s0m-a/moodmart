import { StyleSheet, Text, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BarChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width;
const moodAnalysis = () => {
    const [moodCount, setMoodCount] = useState({});
    useEffect( ()=>{
        const loadMoods = async ()=>{
            try {
                let moods = await AsyncStorage.getItem('moods');
                moods = moods ? JSON.parse(moods): [];

                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate()-7);
                const lastWeekMoods = moods.filter(m => new Date(m.timestamp) >= sevenDaysAgo);
                const counts = {};
                lastWeekMoods.forEach(m => {
                    const moodLabel = m.label;
                    counts[moodLabel] = (counts[moodLabel] || 0) + 1;
                });

                setMoodCount(counts);
            } catch (err) {
                console.error('Error loading moods:', err);
            }
        };
        loadMoods()
        }, [])

        const chartData = {
            labels: Object.keys(moodCount),
            datasets: [
                {
                    data: Object.values(moodCount),
                },
            ],
        };
  return (
    <ScrollView style={styles.container}>
      <Text> Mood Analysis (Last 7 Days)</Text>
      {Object.keys(moodCount).length > 0 ? (
        <BarChart
        data={chartData}
        width={SCREEN_WIDTH -14}
        height={500}
        fromZero
        chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
            marginVertical: 8,
            borderRadius: 16,
            marginLeft: 8,
        }}
        />
      ):(
        <Text style={{ textAlign: 'center', marginVertical: 20 }}>
        No mood data for the past week.
      </Text>

      )}
    </ScrollView>
  )
}

export default moodAnalysis

const styles = StyleSheet.create({
container: {
    flex:1,
    marginVertical:80,

}

})