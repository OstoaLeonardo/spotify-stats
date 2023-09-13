const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'b98830dfd88f4b03b153bbe48623e883';
const responseType = 'code';
const redirectUri = 'https://getspotifystats.vercel.app/';
const scopes = [
    'user-read-email',
    'user-read-private',
    'user-read-recently-played',
    'user-read-currently-playing',
    'user-top-read',
];

export const accessUrl =
    authEndpoint +
    '?client_id=' + clientId +
    '&response_type=' + responseType +
    '&redirect_uri=' + redirectUri +
    '&scope=' + scopes.join('%20') +
    '&response_type=token&show_dialog=true';
