import fetchEndPoint from './fetchEndPoint.js'

const topArtistsEndPoint = 'https://api.spotify.com/v1/me/top/artists';

const getTopArtists = async (time_range = 'long_term', limit = '5') => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = `${topArtistsEndPoint}?time_range=${time_range}&limit=${limit}`;
        const artists = await fetchEndPoint(access_token, endPoint);
        return formatTopArtists(artists);
    } catch (error) {
        return null;
    }
};

const formatTopArtists = (artists) => {
    if (!artists) {
        return null;
    }

    const { items } = artists;
    
    const formattedArtists = items.map((artist) => {
        return {
            id: artist.id,
            name: artist.name,
            image: artist.images[1].url,
            genres: artist.genres,
            url: artist.external_urls.spotify,
        };
    });

    return formattedArtists;
};

export default getTopArtists;
