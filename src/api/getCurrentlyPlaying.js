import fetchEndPoint from './fetchEndPoint.js'

const currentlyPlayingEndPoint = 'https://api.spotify.com/v1/me/player/currently-playing';

const getCurrentlyPlaying = async () => {
    try {
        const access_token = localStorage.getItem('access_token');
        const song = await fetchEndPoint(access_token, currentlyPlayingEndPoint);
        return formatCurrentlyPlaying(song);
    } catch (error) {
        return null;
    }
};

const formatCurrentlyPlaying = (song) => {
    if (!song) {
        return null;
    }
    
    const track = song.item;

    return {
        name: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        album: track.album.name,
        albumArt: track.album.images[1].url,
        durationMs: track.duration_ms,
        progressMs: song.progress_ms,
        url: track.external_urls.spotify,
        isPlaying: song.is_playing
    };
};

export default getCurrentlyPlaying;
