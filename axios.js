import axios from 'axios'
import { API_URL } from '@/lib/util'
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export default instance
