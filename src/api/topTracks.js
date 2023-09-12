import fetchEndPoint from './fetchEndPoint.js'

const topTracksEndPoint = 'https://api.spotify.com/v1/me/top/tracks';

const getTopTracks = async (time_range = 'long_term', limit = '5') => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = `${topTracksEndPoint}?time_range=${time_range}&limit=${limit}`;
        const topTracks = await fetchEndPoint(access_token, endPoint);
        return formatTopTracks(topTracks);
    } catch (error) {
        return null;
    }
};

const formatTopTracks = (topTracks) => {
    if (!topTracks) {
        return null;
    }

    const tracks = topTracks.items;

    const formattedTracks = tracks.map((track) => {
        return {
            id: track.id,
            title: track.name,
            artist: track.artists.map((artist) => artist.name).join(', '),
            albumImageUrl: track.album.images[1].url,
            trackUrl: track.external_urls.spotify,
            previewUrl: track.preview_url,
        };
    });

    return formattedTracks;
};

export default getTopTracks;
