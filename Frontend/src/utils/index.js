import axios from 'axios'
import { TOKEN_KEY } from './constants'

/**
* get user token from local storage
 * @param {}
* @return {string} response data
*/

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}
/**
 *  @param {}
* set header Authorization with token
* set token in local storage
*/
export function setToken(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  localStorage.setItem(TOKEN_KEY, token)
}