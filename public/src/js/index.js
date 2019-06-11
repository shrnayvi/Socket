import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../scss/socket";
import Greeting from './Greeting';
import Message from './Message';
import MessageAction from './MessageAction';

class Chat extends Component {
  constructor(props)  {
    super(props);
    this.chat = io('http://localhost:8000/chat');
    this.state = {
      user: null,
    }
  }

  render() {
    return (
        <div class="col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-12 comments-main pt-4 rounded">
          <Message />
          <MessageAction />
        </div>

    )
  }
}

ReactDOM.render(<Chat />, document.getElementById("root"));
