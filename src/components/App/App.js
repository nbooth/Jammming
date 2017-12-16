import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props){
    super(props);
    //currently hard-coded for rendering stuff in playlist and track list
    this.state = {
      //stand-in for search results, will be replaced by api
      searchResults: [
        {
          name: 'Creature Comfort',
          artist: 'Arcade Fire',
          album: 'creature comfort'
        },

        {
          id: 'boop',
          name: 'Thunder',
          artist: 'Imagine Dragons',
          album: 'Thunder'
        },

      ],

      //stand-in for playlist name, will be replaced
      playListName: 'New Playlist',
      //should be kept
      playListTracks: [

      ]

    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.changeName = this.changeName.bind(this);
  }

//adds tracks to playlist if not already inside the playlist
  addTrack(track){
    if(this.state.playListTracks.every(currentTrack => currentTrack.id !== track.id)){
      let currentPlaylist = this.state.playListTracks.push(track);
      this.setState({ 'playlistTracks': currentPlaylist});
    }

  }

//removes tracks from playlist
  removeTrack(track){
    let currentPlaylist = this.state.playListTracks.pop();
    this.setState({'playlistTracks': currentPlaylist});
  }

//changes name of the playlist
  changeName(name){
    this.setState({'playListName': name});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist title={this.state.playListName} playListTracks={this.state.playListTracks} onRemove={this.removeTrack} onNameChange={this.changeName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
