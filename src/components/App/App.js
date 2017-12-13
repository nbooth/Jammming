import React, { Component } from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {name: creature comfort},
        {artist: Arcade Fire},
        {Album: creature comfort}
      ];
    }
  }

  render() {
    //add <p>SearchBar Component</p> between div app and div App-playlist
    //SearchResults component</p>
    //Add a Playlist component</p>
    //add these in order inside of div App-playlist
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">

          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}/>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
