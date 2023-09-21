import fetchEndPoint from './fetchEndPoint.js'

const currentUserEndPoint = 'https://api.spotify.com/v1/me';

const getCurrentUser = async () => {
    try {
        const access_token = localStorage.getItem('access_token');
        const user = await fetchEndPoint(access_token, currentUserEndPoint);
        return formatCurrentUser(user);
    } catch (error) {
        return null;
    }
};

const formatCurrentUser = (user) => {
    if (!user) {
        return null;
    }

    const { id, display_name, email, images, external_urls, product } = user;
    
    return {
        id: id,
        name: display_name,
        email: email,
        image: images[0]?.url || null,
        url: external_urls.spotify,
        product: product
    };
};

export default getCurrentUser;
