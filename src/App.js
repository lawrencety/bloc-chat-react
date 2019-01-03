import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCh_lgw9Di8VKsP-OsBlBxjJqdDzVky79I",
  authDomain: "bloc-chat-react-bf150.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-bf150.firebaseio.com",
  projectId: "bloc-chat-react-bf150",
  storageBucket: "bloc-chat-react-bf150.appspot.com",
  messagingSenderId: "850668141778"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.roomsRef = firebase.database().ref('rooms');

    this.state = {
      active: false,
      rooms: [],
      roomName: '',
      user: 'Guest',
    };
  }

  setActive(e) {
    this.setState({ active: e.key});
    this.roomTitle(e.key);
  }

  roomTitle(key) {
    const activeRoomID = key;
    const activeRoom = this.state.rooms.filter(room => room.key === activeRoomID);
    this.setState({roomName: activeRoom[0].name });
  }

  setUser(e) {
    if (e === null) {
      this.setState({ user: 'Guest' })}
    else {
      this.setState({ user: e.displayName })
    }
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  };

  render() {
    return (
      <div className="App">
        <User
          firebase = {firebase}
          user = {this.state.user}
          setUser = {(e) => this.setUser(e)}
        />
        <RoomList
          firebase = {firebase}
          setActive = {(e) => this.setActive(e)}
          active = {this.state.active}
        />
        <MessageList
          firebase = {firebase}
          active = {this.state.active}
          roomName = {this.state.roomName}
        />
      </div>
    );
  }
}

export default App;
