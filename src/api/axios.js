import axios from 'axios'
import Cookies from 'js-cookie'
import { baseURL } from '../functions/baseUrl'

const api = axios.create({
  baseURL,
})

api.interceptors.request.use((config) => {
  const token = Cookies.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token')
      Cookies.remove('userData')
      
      const protectedPaths = ['/cart', '/checkout', '/all-orders']
      const currentPath = window.location.pathname
      
      const isProtected = protectedPaths.some(path => currentPath.startsWith(path))
      
      if (isProtected) {
        window.location.href = '/sign-in'
      }
    }
    return Promise.reject(error)
  }
)

export default api
