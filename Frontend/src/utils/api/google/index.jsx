
import  {  useEffect } from "react"
import axios from 'axios'
import { setToken } from '../../index'

const baseURL = import.meta.env.VITE_API_BASEURL
const googleID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const {google} = window;

function GoogleLogin({ setLoadingBoard}) {
  async function handleGoogle(response) {
    try {
      setLoadingBoard(true)
      await axios(
        {
          method: "post",
          url: `${baseURL}/auth/googlesignin`,
          headers: {
            "Authorization": `Bearer ${response.credential}`,
            "Content-Type": "application/json",
          }
        }).then((responsedata) => {
          const tokenAccess = responsedata.data.token
          setToken(tokenAccess)
          return  window.location.assign('/dashboard')
        })
    } catch (error) {
      setLoadingBoard(false)
      return error
    }

    return null
  }
  useEffect(() => {

    if (window.google) {
      google.accounts.id.initialize({
        client_id: googleID ,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } );
    }
  },[]);

  
  
}

export default GoogleLogin


