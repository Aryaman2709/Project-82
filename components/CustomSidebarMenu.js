import * as React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'

export default class CustomSidebarMenu extends React.Component{
  render(){
    return(
      <View style={{flex:1}}>
      <DrawerItems {...this.props}> </DrawerItems>
      <View style={styles.drawerItemsContainer}>
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('WelcomeScreen'); firebase.auth().signOut()}} ><Text>Logout</Text></TouchableOpacity></View>
      </View>
    )
  }
} 

const styles= StyleSheet.create({
  drawerItemsContainer:{
    flex:1,
    justifyContent:'flex-end',
    paddingBottom:30
  }
})