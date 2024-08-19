import axios, { type AxiosRequestConfig } from 'axios' 

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_SUELECTIONS_API_URL_HTTPS
}

const SUElectionsAPI = axios.create(config)

export default SUElectionsAPI