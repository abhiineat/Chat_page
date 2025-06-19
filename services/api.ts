// services/api.ts
import axios from 'axios';

export const fetchMessages = async (page: number = 0) => {
  const res = await axios.get(`https://qa.corider.in/assignment/chat?page=${page}`);
  return res.data;
};
