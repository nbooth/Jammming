const clientId = '3401631214784ea5958ac769120d04e6';
//const secret = 'a3a0333b48a64507a620bd62b904a017';
const redirectUri = 'http://localhost:3000/';
let accessToken = '';

const Spotify = {
  getAccessToken() {
    //checks if accessToken is set
    if (accessToken) {
      return accessToken;
    }
    //if access token hasn't:
    //variables for checking if the process of getting the access token is going on
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); //to get the access token
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);//to get the expiration time
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];//sets access token value
      const expiresIn = Number(expiresInMatch[1]);//sets variable for expiration time
      window.setTimeout(() => accessToken = '', expiresIn * 1000);//sets time out to clear access token
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      //redirect uri if access token isn't defined
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  //GET request
  search(term) {
    const accessToken = Spotify.getAccessToken();//gets access token
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { //gets track via terms from API
      headers: {
        Authorization: `Bearer ${accessToken}` //authorization property
      }
    }).then(response => {
      return response.json(); //returns json object
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return []; //if no response, then return empty array (no results found)
      }
      //else return the id, name, artist, album, and track info
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  //POST request
  savePlaylist(name, trackUris) {
    //if no name inserted or no uri's given, return
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();//var for accessToken
    const headers = { Authorization: `Bearer ${accessToken}` };//Authorization property
    let userId; //empty var for user id

    return fetch('https://api.spotify.com/v1/me', {headers: headers} //makes request
    ).then(response =>
      response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      //gets user's playlists
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        //defines request as a 'POST'
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response =>
        response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;
