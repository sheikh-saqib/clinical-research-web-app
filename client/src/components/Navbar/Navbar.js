import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3 ">
            <Link className="navbar-brand" to="/">Clinical Research</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Patients</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/studies">Studies</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
