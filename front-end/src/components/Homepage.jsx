import React, { useState } from 'react'
import Home from './Home'
import Login from './Login';

function Homepage() {
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
      setShowLogin(true);
    };
  return (
    <div className={`bghome homepage-container ${showLogin ? 'show-login' : ''}`}>
        <Home  onLoginClick={handleLoginClick}/>
        {showLogin && <Login/>}
    </div>
  )
}

export default Homepage