// const apiKey = process.env.REACT_APP_API_KEY
const apiTokenKey = process.env.REACT_APP_TOKEN_KEY

export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiTokenKey}`
    }
};