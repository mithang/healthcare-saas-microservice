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

interface NewsFeedProps {
  data: NewsData[];
}

const NewsFeed: React.FC<NewsFeedProps> = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return null;
  }

  return (
    <div className="profile-newsfeed news">
      <div className="row m-row">
        {data.length > 0 && _.map(data, (item, i) =>
          <div className="col-xl-4 col-md-6" key={i}>
            <NewsArticle data={item} role="userNewsFeed" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;