import fetchEndPoint from './fetchEndPoint.js'

const recentlyPlayedEndPoint = 'https://api.spotify.com/v1/me/player/recently-played';

const getRecentlyPlayed = async (limit = '1') => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = `${recentlyPlayedEndPoint}?limit=${limit}`;
        const song = await fetchEndPoint(access_token, endPoint);
        return formatRecentlyPlayed(song);
    } catch (error) {
        return null;
    }
};

const formatRecentlyPlayed = (song) => {
    if (!song) {
        return null;
    }

    const formattedSongs = song.items.map((item) => {
        return {
            id: item.track.id,
            title: item.track.name,
            artist: item.track.artists.map((artist) => artist.name).join(", "),
            album: item.track.album.name,
            albumImageUrl: item.track.album.images[1].url,
            durationMs: item.track.duration_ms,
            trackUrl: item.track.external_urls.spotify,
            previewUrl: item.track.preview_url,
            playedAt: item.played_at,
        };
    });

    return formattedSongs;
};

export default getRecentlyPlayed;
