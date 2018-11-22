import React from 'react';
import './Header.css';
import Logo from './logo.png';

const Header = () => {
    return (
        <div className="Header">
            <img src={Logo} alt="logo" className="Header-logo" />
        </div>
    );
}

export default Header;