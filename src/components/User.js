import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props)

    this.state = {
      signedIn: false,
      signOutButton: "login display-none",
      signInButton: "login display-block",
    }
  }

  handleSignIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  };

  handleSignOut() {
    this.props.firebase.auth().signOut();
    this.setState({
      signOutButton: "login display-none",
      signInButton: "login display-block",
    });
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
      if (user != null) {
        this.setState({
          signOutButton: "login display-block",
          signInButton: "login display-none",
        });
      }
    });
  }

  render() {
    return (
      <div className="user">
        <p className="username">{this.props.user}</p>
        <button className={this.state.signInButton} onClick={() => this.handleSignIn()}>Sign In</button>
        <button className={this.state.signOutButton} onClick={() => this.handleSignOut()}>Sign Out</button>
      </div>
    )
  }
}

export default User;
