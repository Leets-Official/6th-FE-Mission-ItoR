// src/api/axiosInstance.ts
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://blog.leets.land',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
