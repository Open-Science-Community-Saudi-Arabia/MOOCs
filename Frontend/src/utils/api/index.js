import axios from 'axios'
import { TOKEN_KEY } from '../constants'

const token = localStorage.getItem(TOKEN_KEY)
const baseURL = import.meta.env.VITE_API_BASEURL

if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }
  async function makeApiCall(url,method,payload,axiosRequestConfig){
try{
    if (!baseURL || typeof baseURL !== 'string') {
        throw new Error('VITE_API_BASEURL is not defined')
      }
      const { data } = await axios({
        url,
        method,
        data: payload,
        baseURL,
        ...axiosRequestConfig,
      })
  
      return data
} catch (error) {
    // use the server error response if available
    if (error.response) {
      const serverMessage = error.response?.data?.message

      if (error.response.status === 401) {
        localStorage.removeItem(TOKEN_KEY)
        window.location.assign('/signin')
      }

      throw new Error(serverMessage)
    }
    // throw errors that happen in the browser as is
    throw new Error(error.message)
  }
  }

  export default makeApiCall 