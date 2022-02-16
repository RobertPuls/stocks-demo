import { STONKS_URL } from './constants';

export const fetchStonks = async () => {
  try {
    const response = await fetch(STONKS_URL);
    return response.json();
  } catch (error) {
    console.log(error);
  };
};