import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render(){
    return (
      // maps each track recieved by search result to be displayed with a unique key id
      <div className="TrackList">
        {
          this.props.track.map(track => {
              return <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} component={this.props.component}/>
            }
          )
        }
      </div>
    );
  }
}

export default TrackList;
