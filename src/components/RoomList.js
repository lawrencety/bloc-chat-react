import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.roomsRef = this.props.firebase.database().ref('rooms');

    this.state = {
      rooms: []
    };
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
      <div className ="room-list">
        <ul>
          {
            this.state.rooms.map( (key, name) =>
              <li className="room-item" key="key">
                {key.name}
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default RoomList;
