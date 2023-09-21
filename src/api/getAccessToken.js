const client_id = 'b98830dfd88f4b03b153bbe48623e883';
const secret_id = '6e7f3069ac9f485c82fbe77a78b00c19';

const tokenEndPoint = 'https://accounts.spotify.com/api/token';

const getAccessToken = async (refresh_token) => {
    const response = await fetch(tokenEndPoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(client_id + ':' + secret_id).toString('base64')
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token,
        })
    })

    const data = await response.json();
    return data;
};

export default getAccessToken;
