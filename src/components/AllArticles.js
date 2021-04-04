import React from 'react';


const AllArticles = (props) => {
    const clickHandler = (ev) => {
        ev.preventDefault();
        props.onTabClick('all');
    };
    return (
        <li className="nav-item">
            <a
                href=""
                className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
                onClick={clickHandler}>
                {"Всички статии"}
            </a>
        </li>
    );
};

export default AllArticles