import React from 'react'
import "./style.css"
import { useAuthActions } from '../../context'


 function Dashboard() {

  const { logout } = useAuthActions()
  return (
    <div className='dashboard-container'>

      <p>Dashboard</p>
      <button onClick={logout}>Log Out</button>
    </div>
  )
}

export default Dashboard