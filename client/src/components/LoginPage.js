import React from 'react'
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

const App = () => {
  const token = Cookies.get('spotifyAuthToken')
  return (
    <div className='app'>
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          <p>You are authorized with token: {token}</p>
        </SpotifyApiContext.Provider>
      ) : (
        <SpotifyAuth
          redirectUri='http://localhost:3000/login'
          clientID='cc48b68ed28d46e794f6d437dff2c294'
          scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
        />
      )}
    </div>
  )
}
export default App