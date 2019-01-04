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

  handleChange(e) {
    this.setState({ newMessageContent: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newMessageContent) {return}
    const newMessage = {
      username: this.props.user,
      content: this.state.newMessageContent,
      sentAt: this.setTime(),
      roomID: this.props.active
    };
    this.messagesRef.push(newMessage);
    this.setState({newMessageContent: ''})
  }

  setTime() {
    return this.props.firebase.database.ServerValue.TIMESTAMP
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
        <form className={this.props.showForm} onSubmit={(e) => this.handleSubmit(e)}>
          <input
            className="message-input"
            type="text"
            value= {this.state.newMessageContent}
            onChange={(e) => this.handleChange(e)}
          />
          <input className="message-submit" type="submit" value="Send"/>
        </form>
      </div>
    );
  }
}

export default MessageList;
