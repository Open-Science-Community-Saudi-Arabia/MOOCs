import makeApiCall from "."
import { setToken } from '..'

export async function signUp(payload) {
    const response = await makeApiCall('/auth/signup', 'post', payload)
    setToken(response.token)
    return response
  }

  export async function login(payload) {
    const response = await makeApiCall('/auth/login', 'post', payload)
    setToken(response.token)
    return response
  }