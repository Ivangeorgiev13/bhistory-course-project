import React, { useEffect, useState } from 'react';
import MyArticles from './MyArticles';
import AllArticles from './AllArticles';
import Banner from './Banner';
import Articles from './Articles';


const Home = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [articlesCount, setArticlesCount] = useState(0)
    const [tab, setTab] = useState('all');

    useEffect(() => {
        if (tab === 'feed') {

        } else if (tab === 'all') {

        }
    }, [tab]);

    const onTabClick = (tabType) => {
        setTab(tabType)
    }

    return (
        <div className="home-page">
            <Banner appName={'bHistory'} />
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                <MyArticles
                                    currentUser={props.currentUser}
                                    tab={tab}
                                    onTabClick={onTabClick} />

                                <AllArticles tab={tab} onTabClick={onTabClick} />
                            </ul>
                        </div>

                        <Articles
                            articles={articles}
                            loading={loading}
                            articlesCount={articlesCount}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
