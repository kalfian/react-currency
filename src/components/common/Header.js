import React from 'react';
import './Header.css';
import Logo from './logo.png';
import Search from './Search';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div className="Header">
            <Link to="/">
                <img src={Logo} alt="logo" className="Header-logo" />
            </Link>

            <Search/>
        </div>
    );
}

export default Header;