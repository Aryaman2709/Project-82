import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class UserDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      receiverId: this.props.navigation.getParam('details')['username'],
      requestId: this.props.navigation.getParam('details')['request_id'],
      itemName: this.props.navigation.getParam('details')['item_name'],
      description: this.props.navigation.getParam('details')[
        'description'
      ],
      receiverName: '',
      receiverContact: '',
      receiverAddress: '',
      receiverRequestDocId: '',
    };
  }

  getReceiverDetails = () => {
    db.collection('users')
      .where('username', '==', this.state.receiverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            receiverName: doc.data().first_name,
            receiverContact: doc.data().mobile_number,
            receiverAddress: doc.data().address,
          });
        });
      });
  };

  updateBookStatus=()=>{
    db.collection('all_barters').add({
      'item_name':this.state.itemName,
      'request_id': this.state.requestId,
      'requested_by':this.state.receiverName,
      'donor_id':this.state.userId,
      'request_status':"Donor Interested"
    })
  }

  componentDidMount() {
    this.getReceiverDetails();
  }

  render() {
    return (
      <View>
        <MyHeader title="Receiver Details" />
        <View style={{ flex: 0.3 }}>
          <Card title={'Book Information'} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Name:{this.state.itemName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Reason:{this.state.description}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={{ flex: 0.3 }}>
          <Card title={'Receiver Information'} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Name:{this.state.receiverName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Contact:{this.state.receiverContact}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Address:{this.state.receiverAddress}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {this.state.receiverId !== this.state.userId ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateBookStatus();
                this.props.navigation.navigate('MyBarters');
              }}>
              <Text>Exchange</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,
  },
});
