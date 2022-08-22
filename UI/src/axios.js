import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://us-central1-react-demo-e1d88.cloudfunctions.net';
// axiosClient.defaults.baseURL = 'http://localhost:5001/react-demo-e1d88/us-central1';

export const getRequest = (endpoint) => {
    return axiosClient.get(endpoint);
}

export const postRequest = (endpoint, payload) => {
    return axiosClient.post(endpoint, payload);
}

export const patchRequest = (endpoint, payload) => {
    return axiosClient.patch(endpoint, payload);
}

export const deleteRequest = (endpoint, payload) => {
    return axiosClient.delete(endpoint, payload);
}