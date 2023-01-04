import makeApiCall from "."
import { setToken } from '..'

/**
* handle signup api call and update current token 
 * @param   {any} payload  `request data`         
*/
export async function signUp(payload) {
  const response = await makeApiCall('/auth/signup', 'post', payload)
  setToken(response.token)

}
/**
* handle login api call and update current token 
* @param   {any} payload  `request data`         
*/
export async function login(payload) {
  const response = await makeApiCall('/auth/login', 'post', payload)
  setToken(response.token)
}
/**
* handle forgot-password api call
 * @param   {any} payload  `request data`    
 * @return {any} response data       
*/
export async function forgotpassword(payload) {
  const response = await makeApiCall('/auth/forgotpassword', 'post', payload)
  return response
}
/**
* handle reset-password api call
* @param   {any} payload  `request data`   
* @return {any} response data      
*/
export async function resetpassword(payload) {
  const response = await makeApiCall(`/auth/resetpassword`, 'patch', payload)
  return response
}