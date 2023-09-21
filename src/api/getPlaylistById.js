import fetchEndPoint from './fetchEndPoint.js'

const playlistsByIdEndPoint = 'https://api.spotify.com/v1/playlists/';

const getPlaylistById = async (id) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = playlistsByIdEndPoint + id;
        const playlist = await fetchEndPoint(access_token, endPoint);
        return formatPlaylist(playlist);
    } catch (error) {
        return null;
    }
};

const formatPlaylist = (playlist) => {
    if (!playlist) {
        return null;
    }

    const { id, name, description, type, images, collaborative, tracks, external_urls } = playlist;
    const { items } = tracks;

    return {
        id,
        name,
        description,
        type,
        image: images[0].url,
        collaborative,
        isPublic: playlist.public,
        totalTracks: tracks.total,
        tracks: items.map((item) => {
            const { id, name, artists, album, external_urls } = item.track;
            return {
                id,
                title: name,
                artist: artists[0].name,
                albumImageUrl: album.images[1].url,
                url: external_urls.spotify,
            };
        }),
        url: external_urls.spotify,
    };
};

export default getPlaylistById;
