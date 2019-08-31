import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-3c2a3.firebaseio.com/'
})

export default instance;