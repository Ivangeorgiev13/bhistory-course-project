import React from 'react';
import requests from '../requests';

const MyArticles = (props) => {
    if (props.token) {
        const clickHandler = ev => {
            ev.preventDefault();
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
