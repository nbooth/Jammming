import React, { Component } from 'react';
import './Playlist.css';

class Playlist extends React.Component {
  render(){
    return (
      <div class="Playlist">
        <input value="New Playlist"/>
        <p>Add a TrackList component</p>
        <a class="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
