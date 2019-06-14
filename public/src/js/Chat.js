import React, { Component } from "react";
import io from 'socket.io-client';
import Greeting from './Greeting';
import Message from './Message';
import MessageAction from './MessageAction';
import { randomBytes } from 'crypto';

import "../scss/chat.scss";

export default class Chat extends Component {
  constructor(props)  {
    super(props);
    this.chat = io('http://localhost:8000/chat');
    this.state = {
      user: null,
      message: '',
      name: '',
      chatType: '',
      messages: [],
    }

    this.handleUser = this.handleUser.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.chat.on('PublicMessageReceived', data => {
      this.setState({ messages: [...this.state.messages, { ...data, messageType: 'receive' }] });
    });

    this.chat.on('privateChat', data => {
      this.setState({ messages: [...this.state.messages, { ...data, messageType: 'receive' }] });
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUser(e) {
    e.preventDefault();
    this.setState({ user: this.state.name });
    const { pathname } = this.props.location;
    if(pathname === '/private') {
      const room = this.createRoom();
      this.props.history.push(`/private/${room}`);
      this.chat.emit('JoinRoom', { user: this.state.name, room });
    } else if(pathname.includes('private/room-')) {
      const room = pathname.split("private/")[1];
      this.props.history.push(`/private/${room}`);
      this.chat.emit('JoinRoom', { user: this.state.name, room });
    }
  }

  handleMessage(e) {
    e.preventDefault();
    const { pathname } = this.props.location;
    this.setState({ message: '', messages: [...this.state.messages, { name: this.state.user, message: this.state.message, messageType: 'send' } ] });
    if(pathname.includes('private')) {
      this.chat.emit('privateChat', { room: pathname.split('private/')[1], name: this.state.user, message: this.state.message });
    } else {
      this.chat.emit('publicChat', { name: this.state.user, message: this.state.message });
    }
  }

  createRoom() {
    const room = randomBytes(7).toString('hex');
    return `room-${room}`;
  }

  render() {
    const { pathname } = this.props.location;
    const messages = this.state.messages.map((m, i) => (
      <Message key={i} name={m.name} message={m.message} messageType={m.messageType} />
    ));

    return (
      <div>
        <form onSubmit={this.state.user ? this.handleMessage : this.handleUser}>
          <div className="row mt-5">
            {
              (pathname === '/private' || (pathname.includes('private') && !this.state.user) ) &&
                <div className="col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-12 comments-main pt-4 py-4 rounded" >
                  <h3>Enter your name for private chat</h3>
                </div>
            }
            {
              !this.state.user 
                ? <Greeting handleChange={this.handleChange} />
                : <div className="col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-12 comments-main pt-4 rounded">
                  {messages}
                  <MessageAction handleChange={this.handleChange} message={this.state.message} />
                </div>
            }
          </div>
        </form>
      </div>
    )
  }
}

// ReactDOM.render(<Chat />, document.getElementById("root"));
