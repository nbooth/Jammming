import React, { Component } from 'react';
import Sound from 'react-sound';
import './Track.css';

class Track extends React.Component {

  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  //adds track
  addTrack(){
    this.props.onAdd(this.props.track);
  }
  //removes track
  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  render(){
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist + ' | \n' + this.props.track.album}</p>
          {!this.props.component && <p>Preview:</p>}
          { this.props.track.preview && !this.props.component && <audio controls controlsList="nodownload"> && <source src={this.props.track.preview} type="audio/wav" />
           && </audio>}
          {!this.props.track.preview && !this.props.component && <p>No preview available.</p>}
        </div>
        {!this.props.component && <a className="Track-action" onClick={this.addTrack}> + </a>}
        {this.props.component && <a className="Track-action" onClick={this.removeTrack}> - </a>}
      </div>
    );
  }
}

export default Track;
