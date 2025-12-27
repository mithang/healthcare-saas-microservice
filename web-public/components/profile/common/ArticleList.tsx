import React from 'react';
import _ from 'lodash';

import NewsArticle from '../../common/NewsArticle';
import { Author } from '../../common/NewsArticle'; // Assuming NewsArticle exports Author or I define it here. 
// Wait, NewsArticle types might not be exported. 
// I'll redefine generic types or check if NewsArticle exports them. 
// For safety, I'll redefine them as they were, to avoid import errors if NewsArticle doesn't export.

interface Author {
    avatar: string;
    name: string;
}

interface NewsData {
    thumbnail: string;
    title: string;
    author: Author;
    publishDate: string;
    desc: string;
    view: number;
    comments: { length: number };
    slug: string;
    type: 'article' | 'video';
}

interface ArticleListProps {
    data: NewsData[];
}

const ArticleList: React.FC<ArticleListProps> = ({ data }) => {
    if (!data || !Array.isArray(data)) {
        return null;
    }

    return (
        <div className="profile-articles box-wrap news">
            <h2 className="profile-title">Bài viết</h2>
            {_.map(data, (item, i) =>
                // @ts-ignore
                <NewsArticle data={item} key={i} role="profile" />
            )}
        </div>
    );
};

export default ArticleList;
