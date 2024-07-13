import axios, { type AxiosRequestConfig } from 'axios' 

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:5062/api/',
  headers: { 
    'Access-Control-Allow-Origin':'*'    
  }
}

const SUElectionsAPI = axios.create(config)

export default SUElectionsAPI