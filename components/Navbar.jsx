import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';


const Navbar = () => {
  const [fontsLoaded] = useFonts({
    'ZillaSlab': require('../assets/fonts/ZillaSlab-Medium.ttf'),
    "ZillaSlabRegular": require('../assets/fonts/ZillaSlab-Regular.ttf'),
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
        <View style={styles.left}>
            <Image source={require("../assets/logo.png")} 
            style = {styles.logo}/>
            <Text style={styles.title} >MoodMart</Text>
        </View>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    container:{
        marginTop:50,
        paddingHorizontal:15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding:16,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
    },
    logo: {
        width: 15,
        height: 15,
        marginRight: 6,
      },
      left:{
        flexDirection: "row",
        alignItems:"center"
      },
      title:{
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: 'ZillaSlab',
      },
})