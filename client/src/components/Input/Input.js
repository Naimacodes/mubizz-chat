import React from 'react';
import './Input.css';

const Input = ({ message, setMessage, sendMessage, typing }) => {
  return (
    <form className='form'>
      <input
        type='text'
        className='input'
        placeholder='type your message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
      />
 
      <button className='sendButton' onClick={(e) => sendMessage(e)}>
        Send
      </button>
    </form>
  );
};

export default Input;
