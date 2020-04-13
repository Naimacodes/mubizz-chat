import React from 'react';
// import './Input.css';

const Input = () => {
  return (
    <div class='type_msg'>
      <div class='input_msg_write'>
        <input type='text' class='input_msg_write' placeholder='Type a message' />
        <button class='msg_send_btn' type='button'>
          <i class='fa fa-paper-plane' aria-hidden='true'></i>
        </button>
      </div>
    </div>
  );
};

export default Input;
