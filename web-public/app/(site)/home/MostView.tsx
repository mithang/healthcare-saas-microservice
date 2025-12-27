import React from 'react';
import _ from 'lodash';
import NewsArticle from '@/components/common/NewsArticle';
import { MOSTVIEW_NEWS } from '@/components/common/Constant';

interface Author {
  avatar: string;
  name: string;
}

interface Comments {
  length: number;
}

interface NewsData {
  thumbnail: string;
  title: string;
  author: Author;
  publishDate: string;
  desc: string;
  view: number;
  comments: Comments;
  slug: string;
  type: string;
}

const MostView: React.FC = () => {
  const data = MOSTVIEW_NEWS as unknown as NewsData[];

  return (
    <div className="news mostview">
      {data.map((item, i) => (
        <NewsArticle data={item} key={i} role="mostview" />
      ))}
      <a href="/" className="block w-full text-center text-xl font-light no-underline text-text-light mt-5 hover:text-secondary transition-colors duration-200">Xem thêm</a>
    </div>
  );
};

export default MostView;