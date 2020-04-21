import React, { useContext, useState} from 'react';
import ChatContext from '../../context/chat/chatContext';
import io from 'socket.io-client';

const Input = ({ user, current }) => {
  
  const socketUrl = 'http://localhost:5000/api/conversations/messages';
 
  const socket = io(socketUrl);
  
  const chatContext = useContext(ChatContext);
  const { sendConversationMsgs } = chatContext;

  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };


  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      return null;
    } else if (text !== '' && current) {
      const message = {
        name: user.name,
        text: text,
        date: Date.now(),
      };
      socket.emit('message', sendConversationMsgs(current._id, message));
      setText('');
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
