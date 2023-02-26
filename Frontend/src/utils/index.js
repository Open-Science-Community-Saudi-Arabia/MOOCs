import axios from 'axios'
import { TOKEN_KEY } from './constants'

/**
 * @module Token
 */

/**
* get user token from local storage
* @return {string} response data
*/
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}
/**
 * Sets token in Authorization header and local storage
 *  @param {token} string `updatedToken`
*/
export function setToken(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  localStorage.setItem(TOKEN_KEY, token)
}