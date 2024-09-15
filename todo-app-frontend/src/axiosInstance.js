import axios from 'axios';

// Create an axios instance with the base URL from the environment variable
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default axiosInstance;
