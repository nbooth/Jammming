import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      //searchResults array for holding song/artist/album information from search
      searchResults: [

      ],
      //stand-in for playlist name, replaced when playlist input is changed
      playListName: 'New Playlist',
      //keeps track of songs added from SearchResults array, and display information
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
    //goes through each track in the playlist and checks if song isn't there already, if so, pushes
    //the track we want to add to the playlistTracks array in state and then sets the state
    if(this.state.playListTracks.every(currentTrack => currentTrack.id !== track.id)){
      let currentPlaylist = this.state.playListTracks.push(track);
      this.setState({'playlistTracks': currentPlaylist});
      let index = this.state.searchResults.findIndex(tracks => tracks.uri === track.uri);
      let currentSearchResults = this.state.searchResults.splice(index, 1);
    }

  }

//removes tracks from playlist
  removeTrack(track){
    //finds index of the track
    let index = this.state.playListTracks.findIndex(tracks => tracks.uri === track.uri);
    //splices the track based on its index
    let currentPlaylist = this.state.playListTracks.splice(index, 1);
    //sets the state
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
//NEEDS ENTER
  search(term){
    console.log('Searching for ' + term);
    return Spotify.search(term).then(tracks => {
      this.setState({'searchResults': tracks})
    });
  }

//render method
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
