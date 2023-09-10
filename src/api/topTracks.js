import fetchEndPoint from './fetchEndPoint.js'

const topTracksEndPoint = 'https://api.spotify.com/v1/me/top/tracks';

const getTopTracks = async (time_range = 'long_term', limit = '5') => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = `${topTracksEndPoint}?time_range=${time_range}&limit=${limit}`;
        const song = await fetchEndPoint(access_token, endPoint);
        return formatTopTracks(song);
    } catch (error) {
        return null;
    }
};

const formatTopTracks = (song) => {
    if (!song) {
        return null;
    }

    const formattedSongs = song.items.map((item) => {
        return {
            title: item.name,
            artist: item.artists.map((artist) => artist.name).join(", "),
            albumImageUrl: item.album.images[1].url,
            trackUrl: item.external_urls.spotify,
            previewUrl: item.preview_url,
        };
    });

    return formattedSongs;
};

export default getTopTracks;
