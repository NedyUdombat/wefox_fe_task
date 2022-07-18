import axios, { AxiosInstance } from 'axios';

import config from '../config';

const http: AxiosInstance = axios.create({
  baseURL: config?.BASE_URL,
});

const cloudinaryClient: AxiosInstance = axios.create({
  baseURL: `${config?.CLOUDINARY_API_URL}${config?.CLOUDINARY_CLOUD_NAME}`,
});

export { http, cloudinaryClient };
