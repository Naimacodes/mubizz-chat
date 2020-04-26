import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import * as io from 'socket.io-client'
import PrivateRoute from './components/routing/Privateroute';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
// import Home from './components/pages/Home';
import Home from './components/pages/Home';

// import SocketContext from './context/socket/socketContext'
import AuthState from './context/auth/AuthState';
import ChatState from './context/chat/ChatState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import './Chat-app.css';
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
              <Fragment>
                <div className='container'>
                  {/* <SocketContext.Provider value={socket}> */}
                  <PrivateRoute exact path='/' component={Home}></PrivateRoute>
                  {/* </SocketContext.Provider> */}
                  <Route exact path='/register' component={Register}></Route>
                  <Route exact path='/login' component={Login}></Route>
                </div>
              </Fragment>
            </Switch>
          </Router>
        </AlertState>
      </ChatState>
    </AuthState>
  );
}

export default App;
