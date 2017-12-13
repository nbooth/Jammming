import React, { Component } from 'react';
import './SearchBar.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
  render(){
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList searchResults={this.props.searchResults}/>
      </div>
    );
  }
}
