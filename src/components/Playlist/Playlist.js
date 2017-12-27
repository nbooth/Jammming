import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.hasTracks = false;
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.props.name} onChange={this.handleNameChange}/>
        <TrackList track={this.props.playListTracks} isRemoval={true} onAdd={this.props.onAdd} onRemove={this.props.onRemove} component={'Playlist'}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
