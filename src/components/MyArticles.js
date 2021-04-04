import React from 'react';
import requests from '../requests';

const MyArticles = (props) => {
    if (props.currentUser) {
        const clickHandler = (ev) => {
            ev.preventDefault();
            props.onTabClick('feed');
        }

        return (
            <li className="nav-item">
                <a href=""
                    className={props.tab === 'feed' ? 'nav-link active' : 'nav-link'}
                    onClick={clickHandler}>
                    {"Моите статии"}
                </a>
            </li>
        );
    }
    return null;
};

export default MyArticles;
