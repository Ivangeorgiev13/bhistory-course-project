import React from 'react';
import { Link } from 'react-router-dom';
import LoggedOutView from './LoggedOutView';
import LoggedInView from './LoggedInView';



const Header = (props) => {

    return (
        <nav className="navbar navbar-light">
            <div className="container">

                <Link to="/" className="navbar-brand">
                    <span style={{ color: '#b3b300' }}>
                        {props.appName.toLowerCase()}
                    </span>
                </Link>

                <LoggedOutView currentUser={props.currentUser} />

                <LoggedInView currentUser={props.currentUser} />
            </div>
        </nav>
    );
}

export default Header;
