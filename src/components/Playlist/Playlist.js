import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  handleChangeName(event){
    this.props.onNameChange(event.target.value);
  }

  render(){
    return (
      <div className="Playlist">
        <input defaultValue={this.props.title} onNameChange={this.handleChangeName}/>
        <TrackList track={this.props.playListTracks} onRemove={this.props.onRemove} component='playlist' changeName={this.props.changeName}/>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
