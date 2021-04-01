import React from 'react';
import { Link } from 'react-router-dom';


const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Начало
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Вход
                    </Link>
                </li>
            </ul>
        );
    }
    return null;
};

export default LoggedOutView;