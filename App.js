import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen'
import Exchange from './screens/Exchange';
import SettingScreen from './screens/SettingScreen'
import CustomSidebarMenu from './components/CustomSidebarMenu'
import UserDetailsScreen from './screens/UserDetails'
import MyBartersScreen from './screens/MyBartersScreen'

export default function App() {
  return (
    <AppContainer/>
  );
}

const AppStackNavigator = createStackNavigator({
  Home:{screen:HomeScreen, navigationOptions:{headerShown:false}},
  UserDetails:{screen:UserDetailsScreen, navigationOptions:{headerShown:false}},
  MyBarters:{screen:MyBartersScreen, navigationOptions:{headerShown:false}}
},{
  initialRouteName:'Home'
})



const TabNavigator = createBottomTabNavigator({
    Home: {screen: AppStackNavigator},
    Exchange: {screen: Exchange},
  },
  {
    defaultNavigationOptions: ({navigation})=>({
      tabBarIcon: ()=>{
        const routeName = navigation.state.routeName;
        if(routeName === "Home"){
          return(
            <Image
            source={require("./assets/home-icon.png")}
            style={{width:20, height:20}}
          />
          )

        }
        else if(routeName === "Exchange"){
          return(
            <Image
            source={require("./assets/ads-icon.png")}
            style={{width:20, height:20,}}
          />)

        }
      }
    })
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Home:{screen:TabNavigator},
  Setting:{screen:SettingScreen},
  MyBarters:{screen:MyBartersScreen}
},
{contentComponent:CustomSidebarMenu},
{initialRootName:'Home'}

)



const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  BottomTab:{screen: AppDrawerNavigator}
})

const AppContainer =  createAppContainer(switchNavigator);
