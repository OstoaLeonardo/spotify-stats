const SCOPES = [
    'user-read-email',
    'user-read-private',
    'user-read-recently-played',
    'user-read-currently-playing',
    'user-top-read',
    'playlist-read-private',
    'playlist-read-collaborative'
];

export const SPOTIFY = {
    REDIRECT_URI: 'http://localhost:5173/',
    AUTH_ENDPOINT: 'https://accounts.spotify.com/authorize',
    TOKEN_ENDPOINT: 'https://accounts.spotify.com/api/token',
    SCOPES: SCOPES,
}
