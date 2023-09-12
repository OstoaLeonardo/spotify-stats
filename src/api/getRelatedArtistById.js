import fetchEndPoint from './fetchEndPoint.js'

const relatedArtistEndPoint = 'https://api.spotify.com/v1/artists/';

const getRelatedArtistById = async (id) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = relatedArtistEndPoint + id + '/related-artists'
        const artists = await fetchEndPoint(access_token, endPoint);
        return formatArtists(artists);
    } catch (error) {
        return null;
    }
};

const formatArtists = (artists) => {
    if (!artists) {
        return null;
    }

    const formattedArtists = artists.artists.map((artist) => {
        return {
            id: artist.id,
            name: artist.name,
            image: artist.images[1].url,
            url: artist.external_urls.spotify
        };
    });

    return formattedArtists;
};

export default getRelatedArtistById;
