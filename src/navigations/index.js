import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import PlayingNowScreen from '../screens/playingnow/index';
import SongListScreen from '../screens/songlist/index';

const Tab = createBottomTabNavigator();
function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case 'PlayingNow':
      iconName = 'play';
      break;

    case 'SongList':
      iconName = 'headphones-alt';
      break;

    default:
      break;
  }
  return <Icon type="font-awesome-5" name={iconName} size={22} color={color} />;
}

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="SongList"
        tabBarOptions={{
          inactiveTintColor: '#FFC1A9',
          activeTintColor: 'rgb(250, 147, 109)',
          style: {
            backgroundColor: '#FFF',
            margin: 0,
            padding: 0,
          },
          showLabel: false,
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="SongList"
          component={SongListScreen}
          options={{
            title: 'Songs',
          }}
        />
        <Tab.Screen
          name="PlayingNow"
          component={PlayingNowScreen}
          options={{
            title: 'Playing Now',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
