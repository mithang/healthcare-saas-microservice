import React from 'react';
import _ from 'lodash';
import Ratio from 'react-ratio';
import { API_GET_INFOGRAPHIC_NEWS } from '@/components/common/Constant';

interface InfographicItem {
  slug: string;
  thumbnail: string;
  title: string;
}

const Infographic: React.FC = () => {
  const { data } = API_GET_INFOGRAPHIC_NEWS as { data: InfographicItem[] };

  return (
    <div className="mt-[30px] md:mt-0 relative overflow-hidden md:overflow-visible">
      <div className="flex flex-wrap -mx-[5px]">
        {_.map(data, (item: InfographicItem, i: number) =>
          <div className="w-1/2 lg:w-1/3 xl:w-1/5 px-[5px] mb-2.5" key={i}>
            <a href={item.slug} className="relative block border border-[#f3f6f9] group overflow-hidden">
              <Ratio
                ratio={10 / 16}
              >
                <img src={item.thumbnail} alt="" className="w-full h-full object-cover transition-all duration-200" />
              </Ratio>
              <div className="absolute inset-0 flex flex-col justify-end items-start p-5 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="w-full transform translate-y-0 transition-transform duration-200 ease-in-out group-hover:-translate-y-5">
                  <h5 className="text-lg text-white block m-0 h-[70px] leading-6 relative text-center before:content-[''] before:absolute before:-top-5 before:left-1/2 before:-translate-x-1/2 before:w-[50px] before:h-[5px] before:bg-[#FFDBA4]">
                    {item.title}
                  </h5>
                </div>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Infographic;