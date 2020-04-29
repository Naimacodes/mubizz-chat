import React, { useContext, useState } from 'react';
import ChatContext from '../../context/chat/chatContext';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const Input = ({ user, conversation, socket }) => {
  const chatContext = useContext(ChatContext);
  const { addMessageToServer } = chatContext;
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      return null;
    } else if (text !== '') {
      const message = {
        name: user.name,
        text: text,
        date: Date.now(),
      };
      addMessageToServer(conversation._id, message);
      setText('');
    }
  };


  //uploading files to chat
  const onDrop = (files) => {
    console.log(files);
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);
    Axios.post('api/conversations/uploadfiles', formData, config).then(
      (res) => {
        if (res.data.success) {
          let url = res.data.url;
          const message = {
            name: user.name,
            text: text,
            date: Date.now(),
            url: url,
            type: 'VideoOrImage'
          };
          

          addMessageToServer(
            conversation._id,
            message
          
          );
        }
      }
    );
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
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <button className='upload_btn' type='button'>
                  <i className='fas fa-cloud-upload-alt' aria-hidden='true'></i>
                </button>
              </div>
            </section>
          )}
        </Dropzone>

        <button className='msg_send_btn' type='button' onClick={onSubmit}>
          <i className='fa fa-paper-plane' aria-hidden='true'></i>
        </button>
      </div>
    </form>
  );
};

export default Input;
