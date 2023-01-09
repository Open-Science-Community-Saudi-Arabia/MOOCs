
import makeApiCall from "."
import { setToken } from '..'

/**
*- handle signup api call and update current token 
 * @param  {object} payload  `request data`  
 * @return {Promise<object>} `response data`      
*/
 async function signUp(payload) {
  const response = await makeApiCall('/auth/signup', 'post', payload)
  setToken(response.token)

}
/**
*- handle login api call and update current token 
* @param  {object} payload  `request data` 
* @return {Promise<object>} `response data`         
*/
 async function login(payload) {
  const response = await makeApiCall('/auth/login', 'post', payload)
  setToken(response.token)
}
/**
*- handle forgot-password api call
 * @param   {object} payload  `request data`    
 * @return {Promise<object>} `response data`       
*/
 async function forgotpassword(payload) {
  const response = await makeApiCall('/auth/forgotpassword', 'post', payload)
  return response
}
/**
*- handle reset-password api call
* @param   {object} payload  `request data`   
* @return {object} `response data`      
*/
 async function resetpassword(payload) {
  const response = await makeApiCall(`/auth/resetpassword`, 'patch', payload)
  return response
}

export {forgotpassword ,resetpassword,login,signUp}