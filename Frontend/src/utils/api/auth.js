import makeApiCall from "."
import { setToken } from '..'

export async function signUp(payload) {
    const response = await makeApiCall('/auth/signup', 'post', payload)
    setToken(response.token)
  
  }

  export async function login(payload) {
    const response = await makeApiCall('/auth/login', 'post', payload)
    setToken(response.token)

  }
  export async function forgotpassword(payload) {
    const response = await makeApiCall('/auth/forgotpassword', 'post', payload)
    return response
  }