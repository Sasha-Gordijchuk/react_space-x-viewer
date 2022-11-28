import axios from 'axios';
import { Launch } from '../types/launch';

const BASE_URL = 'https://api.spacexdata.com/v4';

export const getLaunches = () => {
  return axios.get<Launch[]>(`${BASE_URL}/launches/past`);
};

export const getRockets = () => {
  return axios.get<any>(`${BASE_URL}/rockets`);
};

export const getRocket = (id: string) => {
  return axios.get<any>(`${BASE_URL}/rockets/${id}`);
}; 

export const getLaunchpad = (id: string) => {
  return axios.get<any>(`${BASE_URL}/launchpads/${id}`);
};

export const getCrewMember = (id: string) => {
  return axios.get<any>(`${BASE_URL}/crew/${id}`);
};
