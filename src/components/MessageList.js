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

  componentDidUpdate(prevProps) {
    if (this.props.active !== prevProps.active) {
      this.setState({
        messages: []
      });
      this.messagesRef.on('child_added', snapshot => {
        const messages = snapshot.val();
        messages.key = snapshot.key;
        console.log(messages);
        if (this.props.active === messages.roomID) {
          this.setState({ messages: this.state.messages.concat(messages) });
        }
      });
    };
  }

  render() {
    return (
      <div className="messages">
        <div className="room-title">
          <h2>{this.props.roomName}</h2>
        </div>
        <section className="message-list">
          {
            this.state.messages.map( (message) =>
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
