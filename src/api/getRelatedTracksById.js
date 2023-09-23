import fetchEndPoint from './fetchEndPoint.js'

const relatedTracksEndPoint = 'https://api.spotify.com/v1/recommendations?limit=10';

const getRelatedTracksById = async (artist, track) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = relatedTracksEndPoint + '&seed_artists=' + artist + '&seed_tracks=' + track;
        const tracks = await fetchEndPoint(access_token, endPoint);
        return formatTracks(tracks);
    } catch (error) {
        return null;
    }
};

const formatTracks = (tracks) => {
    if (!tracks) {
        return null;
    }

    const relatedTracks = tracks.tracks;

    const formattedTracks = relatedTracks.map((track) => {
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

export default getRelatedTracksById;
