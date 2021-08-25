import axios from 'axios';
import { apiKey } from '../config';

export const sendData = async (url, data) => {
  try {
    const response = await axios.post(url + apiKey, data);
    return response;
  } catch (error) {
    console.warn(error.response.data.error.message);
  }
};