import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const BACK_END_URL = 'http://localhost:3000/api'

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
}

const requests = {
    del: url =>
        superagent.del(`${BACK_END_URL}${url}`).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${BACK_END_URL}${url}`).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${BACK_END_URL}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${BACK_END_URL}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
    current: () =>
        requests.get('/user'),
    login: (email, password) =>
        requests.post('/users/login', { user: { email, password } }),
    register: (username, email, password) =>
        requests.post('/users', { user: { username, email, password } }),
    save: user =>
        requests.put('/user', { user })
};


export default {
    Auth,
};
