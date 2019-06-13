import React, { Component } from "react";
import ReactDOM from "react-dom";
import io from 'socket.io-client';
import Greeting from './Greeting';
import Message from './Message';
import MessageAction from './MessageAction';

import "../scss/chat.scss";

class Chat extends Component {
  constructor(props)  {
    super(props);
    this.chat = io('http://localhost:8000/chat');
    this.state = {
      user: null,
      message: '',
      name: '',
      messages: [],
    }

    this.handleUser = this.handleUser.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.chat.on('PublicMessageReceived', data => {
      this.setState({ messages: [...this.state.messages, { ...data, messageType: 'receive' }] });
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUser(e) {
    e.preventDefault();
    this.setState({ user: this.state.name });
  }

  handleMessage(e) {
    e.preventDefault();
    this.setState({ message: '', messages: [...this.state.messages, { name: this.state.user, message: this.state.message, messageType: 'send' } ] });
    this.chat.emit('publicChat', { name: this.state.user, message: this.state.message });
  }

  render() {
    const messages = this.state.messages.map((m, i) => <Message key={i} name={m.name} message={m.message} messageType={m.messageType} />)
    return (
      <form onSubmit={this.state.user ? this.handleMessage : this.handleUser}>
        <div className="row mt-5">
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
    )
  }
}

ReactDOM.render(<Chat />, document.getElementById("root"));
