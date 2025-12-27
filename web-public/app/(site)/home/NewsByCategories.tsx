import React from 'react';
import _ from 'lodash';
import NewsArticle from '@/components/common/NewsArticle';
import { NEWS_BY_CATEGORY } from '@/components/common/Constant';

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
  type: 'article' | 'video';
}

interface CategoryData {
  categoriesName: string;
  articles: NewsData[];
}

interface NewsArticleProps {
  data: NewsData;
  role: 'categoriesTop' | 'categoriesSub';
}

const NewsByCategories: React.FC = () => {
  const { data } = NEWS_BY_CATEGORY;

  if (!data || !Array.isArray(data)) {
    return null;
  }

  return (
    <div className="flex flex-wrap -mx-[10px]">
      {_.map(data, (category: CategoryData, i: number) =>
        <div className="w-full md:w-1/3 px-[10px] mb-7.5 md:mb-0" key={i}>
          <div className="mb-5 relative pl-5 after:content-[''] after:absolute after:left-[5px] after:top-[3px] after:w-[6px] after:h-[60%] after:bg-[#34B166] after:-skew-x-[20deg] uppercase">
            <h1 className="text-xl md:text-2xl font-normal uppercase m-0 p-0"><a href="/category" className="no-underline text-text-main hover:text-secondary">{category.categoriesName}</a></h1>
          </div>
          <div className="news">
            <div className="flex flex-wrap -mx-[5px]">
              <div className="w-full px-[5px]">
                <NewsArticle data={category.articles[0]} role="categoriesTop" />
              </div>
              {_.map(_.drop(category.articles), (item: NewsData, j: number) =>
                <div className="w-full px-[5px]" key={j}>
                  <NewsArticle data={item} role="categoriesSub" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsByCategories;