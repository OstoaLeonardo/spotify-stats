import fetchEndPoint from './fetchEndPoint.js'

const getTrackByIdEndPoint = 'https://api.spotify.com/v1/tracks/';

const getTrackById = async (id) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = getTrackByIdEndPoint + id;
        const track = await fetchEndPoint(access_token, endPoint);
        return formatTrack(track);
    } catch (error) {
        return null;
    }
};

const formatTrack = (track) => {
    if (!track) {
        return null;
    }

    const { id, name, album, artists, duration_ms, external_urls, popularity, preview_url } = track;

    return {
        id,
        name,
        image: album.images[1].url,
        artists: artists.map((artist) => ({
            id: artist.id,
            name: artist.name,
        })),
        albumType: album.album_type,
        releaseDate: album.release_date,
        url: external_urls.spotify,
        duration: duration_ms,
        popularity,
        preview_url,
    }
};

export default getTrackById;
