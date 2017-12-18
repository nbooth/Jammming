import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = { playListName: 'New Playlist'};
  //   this.handleChangeName = this.handleChangeName.bind(this);
  //   //this.handleName = this.handleName.bind(this);
  // }
  //
  // handleChangeName(e){
  //   this.props.onNameChange(e.target.value);
  // }
  //
  // // handleName(){
  // //   this.props.onSave(this.props.title, this.props.playListTracks);
  // // }
  //
  // render(){
  //   return (
  //     <div className="Playlist">
  //       <input onChange={this.handleChangeName} defaultValue={this.state.playListName}/>
  //       <TrackList track={this.props.playListTracks} onRemove={this.props.onRemove} component='playlist' onChange={this.props.title}/>
  //       <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
  //     </div>
  //   );
  // }
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input
          value={this.props.name}
          onChange={this.handleNameChange}
        />
        <TrackList
          track={this.props.playListTracks}
          isRemoval={true}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
        />
        <a
          className="Playlist-save"
          onClick={this.props.onSave}
        >SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
