// React & React Native core imports
import React, { useEffect } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import Icons from '../constant/icon';

// Reanimated animation functions
import {
  interpolate,             // Interpolates between values (0 → 1 becomes 1 → 1.2)
  useAnimatedStyle,        // Hook to apply animated styles
  useSharedValue,          // Shared value between JS and UI threads
  withSpring               // Creates a spring animation
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated'; // Required to wrap animated components


const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  label,
}) => {
    const scale = useSharedValue(0);
    useEffect( ()=>{
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1:0):isFocused,
            {duration: 350}
        )
    }, [scale, isFocused]);
    const animatedIconStyle = useAnimatedStyle( ()=>{
        const scaleValue = interpolate(scale.value, [0,1], [1,1.2]);
        const top = interpolate(scale.value, [0,1], [0,9])
        return{
            transform:[{
                scale: scaleValue
            }],
            top
        }
    })
    const animatedTextStyle = useAnimatedStyle( ()=>{
    const opacity = interpolate(scale.value, [0,1], [1,0])
    return{
        opacity
    };

})
  return (

    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarItem}
    >
       < Animated.View style={animatedIconStyle}>
      {Icons[routeName]?.({
        color: isFocused ? '#fff' : '#222',
        size: 24,
      })}
      </Animated.View>
   <Animated.Text style={[animatedTextStyle, { color: isFocused ? '#fff' : '#222', fontSize:12 }]}>
  {label}
   </Animated.Text>

    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
