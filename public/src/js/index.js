import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'

import Chat from './Chat';

import "../scss/chat.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Chat} />
      <Route exact path='/private' component={Chat} />
      <Route path='/private/:room' component={Chat} />
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
