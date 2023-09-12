import fetchEndPoint from './fetchEndPoint.js'

const topTracksEndPoint = 'https://api.spotify.com/v1/artists/';

const getTopTracksById = async (id) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = topTracksEndPoint + id + '/top-tracks?market=ES'
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
    
    const tracks = topTracks.tracks;

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

export default getTopTracksById;
