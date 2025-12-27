import React from 'react';
import _ from 'lodash';
import { TOP_FORUM_POSTS } from '@/components/common/Constant';

interface Author {
  userId: string;
  name: string;
  avatar: string;
}

interface ForumPost {
  author: Author;
  title: string;
  link: string;
  views: number;
  comments: number;
}

const TopForum: React.FC = () => {
  const data = TOP_FORUM_POSTS as ForumPost[];

  return (
    <div className="mb-0 lg:mb-0 mt-[50px] md:mt-0">
      <div className="bg-[#f3f6f9] rounded-[5px] mt-[2px] p-[15px]">
        <div className="mb-5 relative">
          <h1 className="text-xl md:text-2xl text-text-main font-normal uppercase font-google-sans bg-transparent">
            Sôi nổi trên diễn đàn
          </h1>
        </div>
        {_.map(data, (item: ForumPost, i: number) =>
          <div className="mb-1.5" key={i}>
            <div className="flex items-center mb-2 mt-0">
              <a href={`/user${item.author.userId}`} className="w-[35px] h-[35px] overflow-hidden block rounded-full border border-[#f3f6f9] flex justify-center items-center bg-white">
                <img src={item.author.avatar} className="w-full h-auto" alt="" />
              </a>
              <a href="/" className="ml-[7px] flex flex-col no-underline group">
                <span className="text-secondary text-[13px] block -mb-[5px] group-hover:no-underline">{item.author.name}</span>
              </a>
            </div>
            <a href={item.link} className="text-text-main text-[15px] leading-[22px] block mb-[15px] no-underline hover:underline">
              {item.title}
            </a>
            <div className="hidden">
              <div className="mr-2.5 flex items-center justify-center">
                <i className="fi flaticon-visibility text-base text-white mr-[3px]"></i>
                <span className="text-[13px] text-white inline-block">{item.views}</span>
              </div>
              <div className="mr-2.5 flex items-center justify-center">
                <i className="fi flaticon-speech-bubble text-base text-white mr-[3px]"></i>
                <span className="text-[13px] text-white inline-block">{item.comments}</span>
              </div>
            </div>
          </div>
        )}

        <a href="/" className="block w-full text-center text-xl font-light no-underline text-text-light mt-0 hover:text-secondary">Xem thêm</a>
      </div>
    </div>
  );
};

export default TopForum;