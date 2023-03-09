import React from 'react'
import logo from '../img/logo.png'

const header = () => {
  return (

    <div className='header'>
        <img src={logo} alt="Logo" />;
        <h1>Welcome to WAIV Case Notes App!</h1>
    </div>
    
  )
}

export default header