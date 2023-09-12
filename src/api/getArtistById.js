import fetchEndPoint from './fetchEndPoint.js'

const getArtistByIdEndPoint = 'https://api.spotify.com/v1/artists/';

const getArtistById = async (id) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = getArtistByIdEndPoint + id;
        const artist = await fetchEndPoint(access_token, endPoint);
        return formatArtist(artist);
    } catch (error) {
        return null;
    }
};

const formatArtist = (artist) => {
    if (!artist) {
        return null;
    }
    
    const { id, name, images, genres, type, popularity, followers, external_urls } = artist;

    return {
        id,
        name,
        image: images[1].url,
        genres,
        type,
        popularity,
        followers: followers.total,
        url: external_urls.spotify
    }
};

export default getArtistById;
