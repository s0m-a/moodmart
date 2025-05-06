import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '../../components/Tabbar'


const TabLayout = () => {
  return (
    <Tabs 
    screenOptions={{ headerShown: false }}
    tabBar={props => <TabBar{...props} /> } 
    >
        <Tabs.Screen name='index' options={{title: "Home"}} />
        <Tabs.Screen name='moodAnalysis' options={{title: "Analysis"}} />
    </Tabs>
  )
}

export default TabLayout