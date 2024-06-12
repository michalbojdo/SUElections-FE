import axios, { type AxiosRequestConfig } from 'axios' 

const config: AxiosRequestConfig = {
  baseURL: 'http://127.0.0.1:5062/api/',
  headers: { 
    'Access-Control-Allow-Origin':'*'    
  }
}

const SUElectionsAPI = axios.create(config)

export default SUElectionsAPI