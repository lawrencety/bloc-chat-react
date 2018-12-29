import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';

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
  render() {
    return (
      <div className="App">
        <section className ="side-bar">
          <h1> Bloc Chat </h1>
          <RoomList
            firebase = {firebase}
          />
        </section>
      </div>
    );
  }
}

export default App;
