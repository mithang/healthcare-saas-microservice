import React from 'react';
import _ from 'lodash';
import DoctorCard from '@/components/common/DoctorCard';
import { USERS } from '@/components/common/Constant';

interface Traffic {
  like: number;
  search: number;
  view: number;
  visit: number;
  post: number;
}

interface Statistic {
  yearExp: number;
  like: number;
  search: number;
  view: number;
  visit: number;
  post: number;
}

interface DoctorData {
  userId: string;
  userType: string;
  name: string;
  degree: string;
  speciality: string;
  avatar: string;
  address: string;
  phone: string[];
  traffic: Traffic;
  statistic: Statistic;
}

interface DoctorCardProps {
  data: DoctorData;
}

const TopDoctor: React.FC = () => {
  const doctors = USERS.filter(user => user.userType === 'doctor') as DoctorData[];

  return (
    <div className="flex flex-wrap gap-6">
      {_.map(doctors, (item: DoctorData, i: number) => (
        <div className="w-full lg:w-[calc(50%-12px)]" key={i}>
          <DoctorCard data={item} />
        </div>
      ))}
    </div>
  );
};

export default TopDoctor;