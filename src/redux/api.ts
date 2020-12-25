import axios from 'axios';

export const getUsersAPI = (page: number) =>
  axios.get(`https://reqres.in/api/users?page=${page}`);
