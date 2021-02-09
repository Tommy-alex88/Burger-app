import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-bb9db-default-rtdb.firebaseio.com/'
});

export default instance;