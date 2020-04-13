import React from 'react';
// import './Input.css';

const Input = () => {
  return (
    <div className='type_msg'>
      <div className='input_msg_write'>
        <input type='text' className='input_msg_write' placeholder='Type a message' />
        <button className='msg_send_btn' type='button'>
          <i className='fa fa-paper-plane' aria-hidden='true'></i>
        </button>
      </div>
    </div>
  );
};

export default Input;
