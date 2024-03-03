import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/auth';
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/auth">Login/Register</Link>
          </li>
          <li>
            <Link to="/client-space">Client Space</Link>
          </li>
          <li>
            <Link to="/translation">Translation Request</Link>
          </li>
          <li>
            <Link to="/services">Additional Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            {localStorage.getItem('token') ? (
              <button onClick={handleLogout}>Logout</button>
            ) : null}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
