import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './JoinChat.css';

const JoinChat = () => {
  const [username, setName] = useState('');
  const [room, setRoom] = useState('');



  const onClick = e => {
    if (!username || !room) {
      return e.preventDefault();
    } else {
      return null;
    }
  };

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>Chat app</h1>
        <div>
          <input
            placeholder='username'
            name='name'
            type='text'
            className='joinInput'
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder='room'
            name='room'
            type='text'
            className='joinInput mt-20'
            onChange={e => setRoom(e.target.value)}
          />
        </div>
        <Link onClick={onClick} to={`/chat?name=${username}&room=${room}`}>
          <button className='button mt-20' type='submit'>
            Sign in
          </button>
        </Link>
        
      </div>
    </div>
  );
};

export default JoinChat;
