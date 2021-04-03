import React from 'react';

const Banner = ({ appName, token }) => {
    if (token) {
        return null;
    }
    return (
        <div className="banner" style={{ background: '#b3b300' }}>
            <div className="container">
                <h1 className="logo-font">
                    {appName.toLowerCase()}
                </h1>
                <p>{"Yor history blog"}</p>
            </div>
        </div>
    );
};

export default Banner;
