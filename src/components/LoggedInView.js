import React from 'react';
import { Link } from 'react-router-dom';


const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Начало
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/editor" className="nav-link">
                        <i className="ion-compose"></i>&nbsp;Нова статия
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                        <i className="ion-gear-a"></i>&nbsp;Профил
                    </Link>
                </li>


            </ul>
        );
    }

    return null;
};

export default LoggedInView;