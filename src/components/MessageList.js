import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.messagesRef = this.props.firebase.database().ref('messages');

    this.state = {
      messages: [],
      newMessageContent: '',
    };
  }

  componentDidMount() {
    this.setState({
      messages: []
    });
    this.messagesRef.on('child_added', snapshot => {
      const messages = snapshot.val();
      messages.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(messages) });
    });
  }


  render() {
    return (
      <div className="messages">
        <div className="room-title">
          <h2>{this.props.roomName}</h2>
        </div>
        <section className="message-list">
          {
            this.state.messages
              .filter( message => message.roomID === this.props.active )
              .map( (message) =>
                <div className="message" key={message.key}>
                  <p className="message-text username">{message.username}</p>
                  <p className="message-text content">{message.content}</p>
                  <p className="message-text sent-at">{message.sentAt}</p>
                </div>
              )
          }
        </section>
      </div>
    );
  }
}

export default MessageList;
