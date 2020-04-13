import React, { useContext, useEffect, useRef } from 'react';
import ChatContext from '../../context/chat/chatContext';


const SearchConversation = () => {
  const chatContext = useContext(ChatContext);
  const text = useRef('');


  const { getConversations, filterConversation, clearFilter, filtered } = chatContext;
  const onChange = (e) => {
    if (text.current.value !== '') {
      filterConversation(e.target.value);
    } else {
      clearFilter();
    }
  };
  useEffect(() => {
    getConversations()
    if (filtered === null) {
      text.current.value = '';
    }
  });


  return (
    <div className='srch_bar'>
      <div className='stylish-input-group'>
        <input
          ref={text}
          type='text'
          className='search-bar'
          placeholder='Search'
          onChange={onChange}
        ></input>
        <span className='input-group-addon'>
          <button type='button'>
           
            <i className='fa fa-search' aria-hidden='true'></i>{' '}
          </button>
        </span>
      </div>
    </div>
  );
};

export default SearchConversation;
