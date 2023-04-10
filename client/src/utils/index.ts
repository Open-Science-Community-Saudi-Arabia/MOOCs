import axios from 'axios'
import { TOKEN_KEY } from './constants'

/**
 * @category Frontend
 * @subcategory TokenHandler
 * @module Token
 * @description This module contains token functions,
 */


/**
* @description Get user token from local storage
* @return {string} response data
*/
export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
  }

/**
 * @description Set token in Authorization header and local storage
 *  @param {token} string updatedToken
*/
  export function setToken(token:string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    localStorage.setItem(TOKEN_KEY, token)
  }