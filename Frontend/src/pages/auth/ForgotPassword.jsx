import React, { useState } from "react"
import "./style.css"
import Spinner from '../../components/Spinner'

export default function ForgotPassword() {
  const [isLoading, setLoading] = useState(false);
  return (
    <div className="forgotpassword-container">
      <div className='item-left'>

        <img src="/images/ring1.png" alt="" className="ring2" />
        <img src="/images/ring2.png" className="ring1" alt="" />
        <h1>
          OSCSA
        </h1>
      </div>

      <div className="field input-field item-right ">
        <input type="email" name="email" placeholder="Email" required />
        <div className="field button-field">
          <button>{isLoading ? <Spinner /> : "Login"}</button>

        </div>
      </div>
    </div>


  )
}
