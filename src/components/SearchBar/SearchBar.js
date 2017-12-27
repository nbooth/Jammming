import React, { Component } from 'react';
import keydown, { Keys } from 'react-keydown';
import './SearchBar.css';

class SearchBar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      //empty term for search results to be changed with input
      term: ''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  //search method
  search(term){
    this.props.onSearch(this.state.term);
  }
  //allows playlist name
  handleTermChange(e){
    const term = e.target.value;
    this.setState({ 'term': term});
  }
  //handles the key press event so that when enter is clicked, the search is performed
  handleKeyPress(event, term){
    const keyName = event.key;
    if(keyName === 'Enter'){
      this.props.onSearch(this.state.term);
    }
  }

  render(){
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
