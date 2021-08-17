import React, { useContext, useState } from 'react';
import GithubContext from '../../context/github/GithubContext';

const Search = (props) => {
  const githubContext = useContext(GithubContext);

  const [text, setText] = useState('');

  const changeText = (event) => setText(event.target.value);
  const submitForm = (event) => {
    event.preventDefault();

    if (text) {
      githubContext.searchUsers(text);
      setText('');
    } else {
      alert('Please enter some text...');
    }
  };

  return (
    <div>
      <form className='form' onSubmit={(event) => submitForm(event)}>
        <input
          type='text'
          name='text'
          placeholder='Search users...'
          value={text}
          onChange={(event) => changeText(event)}
        />
        <input
          type='submit'
          value='search'
          className='btn btn-dark btn-block'
        />
      </form>
      <button
        className='btn btn-light btn-block'
        onClick={githubContext.clearUsers}
        style={githubContext.users.length === 0 ? { display: 'none' } : null}
      >
        Clear
      </button>
    </div>
  );
};

export default Search;
