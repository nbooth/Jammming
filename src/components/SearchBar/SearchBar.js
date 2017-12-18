import React, { Component } from 'react';
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

  render(){
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
