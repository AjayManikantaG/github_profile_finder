import React, { Component } from 'react';

class Search extends Component {
  state = {
    text: '',
  };

  changeText = (event) => this.setState({ text: event.target.value });
  submitForm = (event) => {
    event.preventDefault();

    if (this.state.text) {
      console.log(this.props);
      this.props.searchUsers(this.state.text);
      this.setState({ text: '' });
    } else {
      alert('Please enter some text...');
    }
  };

  render() {
    return (
      <div>
        <form className='form' onSubmit={(event) => this.submitForm(event)}>
          <input
            type='text'
            name='text'
            placeholder='Search users...'
            value={this.state.text}
            onChange={(event) => this.changeText(event)}
          />
          <input
            type='submit'
            value='search'
            className='btn btn-dark btn-block'
          />
        </form>
        <button
          className='btn btn-light btn-block'
          onClick={this.props.clearUsers}
          style={!this.props.showClear ? { display: 'none' } : null}
        >
          Clear
        </button>
      </div>
    );
  }
}

export default Search;
