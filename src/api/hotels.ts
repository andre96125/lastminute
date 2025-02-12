import {API_URL} from '../constants/globalConst';
import {Hotel} from '../types/Hotel';

export const fetchHotels = async (): Promise<Hotel[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Hotel[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};
