import { View, Platform, StyleSheet } from 'react-native';
import TabBarButton from './tabBarButton';
import { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export function TabBar({ state, descriptors, navigation }) {
  // Store the height and width of the whole tab bar
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  // Width of one tab button (used for highlight positioning)
  const buttonWidth = dimensions.width / state.routes.length;

  // Handle layout measurement when the tab bar first renders
  const onTabBarLayout = (e) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  // Shared value for horizontal translation of the highlight
  const tabPositionX = useSharedValue(0);

  // Animated style that moves the highlight under the selected tab
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View onLayout={onTabBarLayout} style={styles.tabbar}>
      {/* Animated purple background highlight */}
      <Animated.View
        style={[
          animatedStyle,
          {
            position: 'absolute',
            top: 5, 
            left: 0,
            backgroundColor: 'rgba(114,63,235,0.5)',
            borderWidth: 1,
            borderRadius: 30,
            height: dimensions.height - 10,
            width: buttonWidth - 10,
            zIndex: 0,
            borderWidth:0
          },
        ]}
      />

      {/* Render each tab button */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          // Animate the purple background to this tab
          tabPositionX.value = withSpring(buttonWidth * index + 5, {
            damping: 15,
            stiffness: 100,
          });

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? '#fff' : '#222'}
            label={label}
          />
        );
      })}
    </View>
  );
}

// Tab bar container styling
const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    zIndex: 1,
  },
});
