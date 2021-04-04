import React from 'react';
import ArticlePreview from './ArticlePreview';


const Articles = (props) => {

    if (props.articles.length === 0) {
        return (
            <div className="article-preview">
                Все още нямате публикувани статии...
            </div>
        );
    }

    return (
        <div>
            {
                props.articles.map(article => {
                    return (
                        <ArticlePreview article={article} key={article.slug} />
                    );
                })
            }

        </div>
    );
};

export default Articles;
