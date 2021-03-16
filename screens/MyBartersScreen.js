import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ListItem, Card, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class MyBartersScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      allBarters: [],
    };
    this.requestRef = null;
  }

  getAllBarters = () => {
    this.requestRef = db
      .collection('all_barters')
      .where('donor_id', '==', this.state.userId)
      .onSnapshot((snapshot) => {
        var allBarters = snapshot.docs.map((document) => document.data());
        this.setState({
          allBarters: allBarters,
        });
      });
  };

  componentDidMount(){
    this.getAllBarters()
  }

  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => (
    <ListItem
      key={i}
      title={item.name}
      subtitle={
        'Requested By : ' +
        item.requested_by +
        '\nStatus : ' +
        item.request_status
      }
      leftElement={<Icon name="item" type="font-awesome" color="#696969" />}
      titleStyle={{ color: 'black', fontWeight: 'bold' }}
      rightElement={
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: '#ffff' }}>Send Item</Text>
        </TouchableOpacity>
      }
      bottomDivider
    />
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader navigation={this.props.navigation} title="My Barters" />
        <View style={{ flex: 1 }}>
          {this.state.allBarters.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 20 }}>List of all book Donations</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allBarters}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,
  },
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
