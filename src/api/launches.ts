import axios from 'axios';
import { Launch } from '../types/launch';

const BASE_URL = 'https://api.spacexdata.com/v4';

export const getLaunces = () => {
  return axios.get<Launch[]>(`${BASE_URL}/launches/`);
};
