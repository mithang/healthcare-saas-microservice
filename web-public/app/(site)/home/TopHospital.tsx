import React from 'react';
import _ from 'lodash';
import HospitalCard from '@/components/common/HospitalCard';
import { USERS } from '@/components/common/Constant';

interface Traffic {
  like: number;
  search: number;
  view: number;
  visit: number;
  post: number;
}

interface Statistic {
  like: number;
  feedback: number;
  yearExp?: number;
}

interface HospitalData {
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

interface HospitalCardProps {
  data: HospitalData;
}

const TopHospital: React.FC = () => {
  const hospitals = USERS.filter(user => user.userType === 'hospital').map(hospital => ({
    ...hospital,
    statistic: {
      yearExp: hospital.statistic.yearExp || 0,
      like: hospital.statistic.like || 0,
      feedback: (hospital.rating as any[])?.length || 0
    }
  })) as HospitalData[];

  return (
    <div className="flex flex-wrap gap-6">
      {_.map(hospitals, (item: HospitalData, i: number) => (
        <div className="w-full lg:w-[calc(50%-12px)]" key={i}>
          <HospitalCard data={item} />
        </div>
      ))}
    </div>
  );
};

export default TopHospital;