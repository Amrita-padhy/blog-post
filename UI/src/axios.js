import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://us-central1-react-demo-e1d88.cloudfunctions.net';
// axiosClient.defaults.baseURL = 'http://localhost:5001/react-demo-e1d88/us-central1';

export const getRequest = (url) => {
    return axiosClient.get(url);
}

export const postRequest = (url, payload) => {
    return axiosClient.post(url, payload);
}

export const patchRequest = (url, payload) => {
    return axiosClient.patch(url, payload);
}

export const deleteRequest = (url, payload) => {
    return axiosClient.delete(url, payload);
}