"use client";
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Banner from '@/components/common/Banner';
import LineChart from '@/components/common/Chart/LineChart';
import Flaticon from '@/components/common/Flaticon';
import { useViewport } from '@/components/common/Function';

import ProfileTab from '@/app/(site)/profile/components/ProfileTab';
import CommonInfo from './CommonInfo';
import Statistic from './Statistic';
import ArticleList from './ArticleList';
import Workplace from '@/app/(site)/profile/components/Workplace';
import Facilities from './Facilities';
import { USERS } from '@/components/common/Constant';

interface Author {
  name: string;
  avatar: string;
}

interface SocialContactItem {
  name: string;
  icon: string;
  link: string;
}

interface ServiceItem {
  name: string;
  price: number;
}

interface SpecialityService {
  speciality: string;
  services: ServiceItem[];
}

interface IntroSection {
  exp: string;
  degree: string;
  associationAward: string;
}

interface RatingItem {
  author: Author;
  publishDate: string;
  service: string;
  content: string;
  reply: string;
  vote: number;
  isAgreeRecommend: boolean;
}

interface WorkTime {
  weekday: string[];
  weekend: string[];
  holiday: string[];
}

interface Traffic {
  like: number;
  search: number;
  view: number;
  visit: number;
  post: number;
}

interface Statistics {
  yearExp: number;
  visit: number;
  post: number;
  like: number;
  search: number;
  view: number;
  feedback: number;
}

interface WorkplaceData {
  userId: string;
  userType: string;
  name: string;
  avatar: string;
  speciality: string;
  traffic: Traffic;
  statistic: Statistics;
  address: string;
}

interface GalleryItem {
  img: string;
}

interface MapItem {
  img: string;
  label: string;
}

interface QaItem {
  author: Author;
  publishDate: string;
  service: string;
  content: string;
  reply: string;
  vote: number;
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

interface FavoriteItem {
  userId: string;
  userType: 'doctor' | 'hospital' | 'clinic';
  name: string;
  degree: string;
  avatar: string;
  speciality: string;
  traffic: Traffic;
  statistic: Statistics;
  address: string;
}

interface VisitHistoryItem {
  userId: string;
  userType: string;
  name: string;
  avatar: string;
  detail: {
    doctor: {
      userId: string;
      userType: string;
      name: string;
    };
    service: {
      name: string;
      price: number;
    };
    datetime: string;
  };
}


interface ProfileByUserId {
  userId: string;
  userType: 'user' | 'doctor' | 'clinic' | 'hospital';
  statistic: Statistics;
  traffic: Traffic;
  workplace: WorkplaceData[];
  facilities: Array<{
    facilitiesName: string;
    address: string;
    phone: string;
  }>;
  name: string;
  speciality: string;
  degree: string;
  address: string;
  phone: string[];
  email: string[];
  avatar: string;
  socialContact: SocialContactItem[];
  intro: IntroSection;
  service: SpecialityService[];
  rating: RatingItem[];
  worktime: WorkTime;
  gallery: GalleryItem[];
  indoorMap?: MapItem[];
  qa: QaItem[];
  newsFeed?: NewsData[];
  favoriteList?: FavoriteItem[];
  userQa?: QaItem[];
  visitHistory?: VisitHistoryItem[];
}

const articlesByUserId: NewsData[] = [
  {
    title: 'Chuyện về Virus mang vương miện mới, Novel coronavirus (2019-nCoV)',
    type: 'article',
    thumbnail: '/styles/img/news/mostview-news.png',
    author: {
      name: 'Bệnh viện Nhân dân Gia Định',
      avatar: '/styles/img/user/gia-dinh.png'
    },
    publishDate: '5 phút trước',
    desc: 'Thế giới vừa bước sang 2020, chúng ta vừa hưởng cái Tết đầm ấm; xuất hiện 2019- nCoV lây bệnh, chết người',
    slug: '/news/',
    view: 1000,
    comments: {
      length: 20
    }
  }
];

export default function MedicalUser() {
  const profileByUserId = _.find(USERS, { userId: "doc-001" }) as unknown as ProfileByUserId;
  const { statistic, workplace, facilities, userType } = profileByUserId;
  
  const [likeState, setLikeState] = useState<boolean>(false);
  const [isPressLike, setIsPressLike] = useState<boolean>(false);
  const [userStatistic, setUserStatistic] = useState<Statistics>(statistic);

  const { width } = useViewport();
  const breakpoint = 1199;
  let likeCount = userStatistic.like;

  const likeButtonHandler = () => {
    setLikeState(!likeState);
    setIsPressLike(true);
  };

  useEffect(() => {
    if (isPressLike) {
      likeCount = likeState ? likeCount + 1 : likeCount - 1;
      setUserStatistic(oldUserStatistic => ({
        ...oldUserStatistic,
        like: likeCount
      }));
    }

    setLikeState(likeState);
  }, [likeState]);

  return (
    <>
      <Banner page='others' />
      <div className="profile">
        <div className="profile-header box-wrap">
          <div className="container">
            <div className="row m-row">
              <div className="col-xl-8 col-12">
                <CommonInfo data={profileByUserId} likeCount={userStatistic.like} />
              </div>

              <div className="col-xl-4 col-12">
                <div className="profile-interaction">
                  <button
                    className={`btn btn-like${likeState ? ' active' : ''}`}
                    onClick={likeButtonHandler}>
                    <Flaticon icon='like' />Yêu thích</button>
                  <a className="btn btn-main" href="">Đặt lịch khám bệnh</a>
                </div>
                <Statistic data={profileByUserId} />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row m-row">
            <div className="col-xl-8">
              <div className="profile-tab box-wrap">
                <ProfileTab data={profileByUserId} />
              </div>
              <ArticleList data={articlesByUserId} />
            </div>

            <div className="col-xl-4">
              {userType !== 'doctor'
                ? facilities.length > 0 && <Facilities data={facilities} />
                : width > breakpoint ? <Workplace data={workplace} />
                  : false}

              <div className="profile-chart box-wrap">
                <h2 className="profile-title">Lượt truy cập trong tuần</h2>
                <LineChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};