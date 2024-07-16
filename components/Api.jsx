// api.js
import axios from 'axios';

const API_URL = 'https://dummyjson.com/c/11bc-5170-452d-a492/retailers';

export const fetchRetailers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.retailers;
  } catch (error) {
    console.error('Error fetching retailers:', error);
    throw error;
  }
};
