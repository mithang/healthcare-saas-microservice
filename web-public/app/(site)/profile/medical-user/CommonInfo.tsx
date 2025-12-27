import React from 'react';
import _ from 'lodash';
import Flaticon from '@/components/common/Flaticon';
import { USER_TYPE } from '@/components/common/Constant';

interface CommonInfoData {
  avatar: string;
  degree: string;
  name: string;
  speciality: string;
  userType: keyof typeof USER_TYPE;
}

interface CommonInfoProps {
  data: CommonInfoData;
  likeCount: number;
}

const CommonInfo: React.FC<CommonInfoProps> = ({ data, likeCount }) => {
  const { avatar, degree, name, speciality, userType } = data;
  return (
    <div className="profile-info">
      <div className="avatar">
        <div className="avatar-cover">
          <img src={avatar} className="img-fluid" alt="" />
        </div>
        <div className="online"></div>
      </div>
      <div className="main-info">
        <h1 className="name">
          <span>{degree} </span>{name}
        </h1>
        <h5 className="title">Chuyên khoa {speciality}</h5>
        <span className="like"><Flaticon icon='like' /><strong> {likeCount} </strong> lượt yêu thích</span>
        <span className="suggest"><Flaticon icon='like-3' /><strong>98% </strong> giới thiệu {USER_TYPE[userType]} này </span>
      </div>
    </div>
  );
};

export default CommonInfo;