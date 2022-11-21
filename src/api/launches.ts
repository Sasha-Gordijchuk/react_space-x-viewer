import { Launch } from '../types/launch';
import { client } from '../utils/fetchLaunch';

export const getLaunces = () => {
  return client.get<Launch[]>('/launches');
};
