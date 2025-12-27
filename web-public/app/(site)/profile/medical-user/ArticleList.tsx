import React from 'react';
import _ from 'lodash';

import NewsArticle from '@/components/common/NewsArticle';

interface Author {
  avatar: string;
  name: string;
}

interface Comment {
  id: string;
  content: string;
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
        <NewsArticle data={item} key={i} role="profile" />
      )}
    </div>
  );
};

export default ArticleList;