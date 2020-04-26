import React, { useContext, useState, useEffect } from 'react';
import ChatContext from '../../context/chat/chatContext';

const Input = ({ user, current, socket }) => {
  const chatContext = useContext(ChatContext);
  const { addMessageToServer } = chatContext;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  // console.log(socket);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      return null;
    } else if (text !== '' && current && current !== null) {
      const message = {
        name: user.name,
        text: text,
        date: Date.now(),
      };
      addMessageToServer(current._id, message);
        setText('');
     
    
      socket.emit('message', ({ current, message }) => {
       
      });
    
    }
  };

  

  return (
    <form className='type_msg' onSubmit={onSubmit}>
      <div className='input_msg_write'>
        <input
          type='text'
          value={text}
          onChange={onChange}
          autoFocus
          className='input_msg_write'
          placeholder='Type a message'
        />
        <button className='msg_send_btn' type='button' onClick={onSubmit}>
          <i className='fa fa-paper-plane' aria-hidden='true'></i>
        </button>
      </div>
    </form>
  );
};

export default Input;
