import React, { useMemo } from 'react';
import _ from 'lodash';
import NewsArticle from '@/components/common/NewsArticle';
import { API_GET_LATEST_NEWS } from '@/components/common/Constant';

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

interface NewsArticleProps {
  data: NewsData;
  role: 'latestTop' | 'latestSub';
}

const Latest: React.FC = () => {
  const { data } = API_GET_LATEST_NEWS;

  // Ensure each news item has the correct type property and cast types
  const typedData = useMemo(() => {
    if (!data) return [];
    return data.map(item => ({
      ...item,
      type: 'article'
    })) as NewsData[];
  }, [data]);

  if (!typedData.length) {
    return null;
  }

  return (
    <div className="news">
      <div className="flex flex-wrap -mx-[5px]">
        <div className="w-full px-[5px]">
          <NewsArticle data={typedData[0]} role="latestTop" />
        </div>
        {typedData.slice(1).map((item, i) => (
          <div className="w-1/2 px-[5px]" key={i}>
            <NewsArticle data={item} role="latestSub" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Latest;