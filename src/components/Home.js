import React, { useEffect, useState } from 'react';
import MyArticles from './MyArticles';
import AllArticles from './AllArticles';
import Banner from './Banner';


const Home = (props) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        if (window.token) {
            setToken(window.token);
        }
    }, []);

    return (
        <div className="home-page">
            <Banner token={token} appName={'bHistory'} />
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                <MyArticles
                                    token={token}
                                    tab={props.tab}
                                    onTabClick={props.onTabClick} />

                                <AllArticles tab={props.tab} onTabClick={props.onTabClick} />
                            </ul>
                        </div>

                        <AllArticles
                            pager={props.pager}
                            articles={props.articles}
                            loading={props.loading}
                            articlesCount={props.articlesCount}
                            currentPage={props.currentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
