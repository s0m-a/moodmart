import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '../../components/Tabbar'


const TabLayout = () => {
  return (
    <Tabs 
    screenOptions={{ headerShown: false }}
    tabBar={props => <TabBar{...props} /> } >
        <Tabs.Screen name='index' options={{title: "Home"}} />
        <Tabs.Screen name='emoji-mood-screen' options={{title: "Mood"}} />
    </Tabs>
  )
}

export default TabLayout