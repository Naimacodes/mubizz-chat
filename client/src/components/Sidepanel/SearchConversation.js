import React, { useContext, useEffect, useRef } from 'react';
import ChatContext from '../../context/chat/chatContext';


const SearchConversation = ({user}) => {
  const chatContext = useContext(ChatContext);
  const text = useRef('');


  const { filterConversation, clearFilter, filtered } = chatContext;
  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '' && user !== null ) {
      filterConversation(e.target.value);
    } else {
      clearFilter();
    }
  };



  return (
    <div className='headind_srch'>
    <div className='recent_heading'>
      <h4>Recent</h4>
    </div>
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
    </div>
  );
};

export default SearchConversation;
