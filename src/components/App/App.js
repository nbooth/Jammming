import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    //currently hard-coded for rendering stuff in playlist and track list
    this.state = {
      //stand-in for search results, will be replaced by api
      searchResults: [

      ],

      //stand-in for playlist name, will be replaced
      playListName: 'New Playlist',
      //should be kept
      playListTracks: [

      ],

    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.changeName = this.changeName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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
    //console.log(this.state.playListName);
  }

  //saves playlist to user's SPOTIFY account
  savePlaylist(tracks, name){
    let playlistArray = this.state.playListTracks;
    let uriArray = playlistArray.map(track => track.uri);
    Spotify.savePlaylist(this.state.playListName, uriArray);
    this.setState({ playListTracks: [], playListName: 'New Playlist' });
  }

//takes information from spotify based on term, sets results to searchresults in state
  search(term){
    console.log('Searching for ' + term);
    return Spotify.search(term).then(tracks => {
      this.setState({'searchResults': tracks})
    });
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist name={this.state.playListName} playListTracks={this.state.playListTracks} onRemove={this.removeTrack} onNameChange={this.changeName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
