import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
// import Home from './components/pages/Home';
import JoinChat from './components/JoinChat/JoinChat';
import Chat from './components/Chat/Chat';
import AuthState from './context/auth/AuthState';
import ChatState from './context/chat/ChatState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ChatState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar />
          </Fragment>
          <Alerts />
          <Switch>
          <Route exact path='/' component={JoinChat}></Route>
          <Route path='/chat' component={Chat}></Route>
          <Route exact path='/register' component={Register}></Route>
          <Route exact path='/login' component={Login}></Route>
          </Switch>
        </Router>
        </AlertState>
      </ChatState>
    </AuthState>
  );
}

export default App;
