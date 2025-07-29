import axios from 'axios';
import config from '../config/config';

const axiosInstance = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;