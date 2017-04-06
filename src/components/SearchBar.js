import React, { Component, PropTypes } from 'react';

class SearchBar extends Component {
  render(){
    return (
        <input
          aria-labelledby="email_search"
          className='search-bar search_input'
          type="text"
          value={this.props.value}
          placeholder=" Search for a sender.."
          onChange={ event => this.props.onChange(event) }
        />
    );
  }
}

SearchBar.PropTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default SearchBar;
