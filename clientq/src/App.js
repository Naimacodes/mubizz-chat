import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import JoinChat from './components/JoinChat/JoinChat'
import Chat from './components/Chat/Chat'


function App() {
  return (
    <Router>
      <Route exact path="/" component={JoinChat} ></Route>
      <Route path='/chat' component={Chat}></Route>
    </Router>
  );
}

export default App;
