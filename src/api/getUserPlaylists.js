import fetchEndPoint from './fetchEndPoint.js'

const playlistsEndPoint = 'https://api.spotify.com/v1/me/playlists';

const getPlaylists = async () => {
    try {
        const access_token = localStorage.getItem('access_token');
        const playlists = await fetchEndPoint(access_token, playlistsEndPoint);
        return formatPlaylists(playlists);
    } catch (error) {
        return null;
    }
};

const formatPlaylists = (playlists) => {
    if (!playlists) {
        return null;
    }

    const { items } = playlists;

    const formattedPlaylists = items.map((playlist) => {
        const { id, name, images, collaborative } = playlist;
        const { url } = images[0];
        return {
            id,
            title: name,
            albumImageUrl: url,
            isCollaborative: collaborative,
            isPublic: playlist.public,
        };
    });

    return formattedPlaylists;
};

export default getPlaylists;
