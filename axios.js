import axios from 'axios'

const instance = axios.create({
  baseURL: "https://exam.kensa-system.net/api",
  withCredentials: true,
});

export default instance;