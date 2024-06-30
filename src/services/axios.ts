import axios, { type AxiosRequestConfig } from 'axios' 

const config: AxiosRequestConfig = {
  baseURL: 'https://localhost:5001/api/',
  headers: { 
    'Access-Control-Allow-Origin':'*'    
  }
}

const SUElectionsAPI = axios.create(config)

export default SUElectionsAPI