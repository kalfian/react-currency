import React from 'react';
import './NotFound.css';
import {Link} from 'react-router-dom';

const NotFound = () => {
    return(
        
        <div className="NotFound">
            <h1 className="NotFound-title">Ooops... Halaman Ranok.. ojo ngawot</h1>
            <Link className="NotFound-link" to="/">Mbalek sek cuuy</Link>
        </div>
    );
}

export default NotFound;