import fetchEndPoint from './fetchEndPoint.js'

const topArtistsEndPoint = 'https://api.spotify.com/v1/me/top/artists';

const getTopArtists = async (time_range = 'long_term', limit = '5') => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = `${topArtistsEndPoint}?time_range=${time_range}&limit=${limit}`;
        const artist = await fetchEndPoint(access_token, endPoint);
        return formatTopArtists(artist);
    } catch (error) {
        return null;
    }
};

const formatTopArtists = (artist) => {
    if (!artist) {
        return null;
    }
    
    const formattedArtists = artist.items.map((item) => {
        return {
            name: item.name,
            genres: item.genres,
            popularity: item.popularity,
            imageUrl: item.images[1].url,
            artistUrl: item.external_urls.spotify,
        };
    });

    return formattedArtists;
};

export default getTopArtists;
