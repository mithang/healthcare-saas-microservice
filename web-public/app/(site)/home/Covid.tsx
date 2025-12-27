import React from 'react';
import _ from 'lodash';
import { API_GET_COVID } from '@/components/common/Constant';

interface CovidData {
  label: string;
  infected: number;
  dead: number;
}

const Covid: React.FC = () => {
  const { data } = API_GET_COVID as { data: CovidData[] };

  return (
    <div className="border border-[#f3f6f9] rounded-[7px] bg-[#fff5ee] overflow-hidden">
      <a href="" className="h-[70px] lg:h-[100px] bg-center bg-no-repeat bg-cover relative flex justify-center items-center text-decoration-none group bg-[url('/styles/img/banner/covid.jpg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h2 className="text-base lg:text-[16px] text-white relative font-bold m-0 text-center z-10">THÔNG KÊ SỐ LIỆU COVID-19
          <p className="text-[13px] text-center mt-[5px] font-normal m-0 text-white">Cập nhật: 15:30 - 15/01/2021</p>
        </h2>
      </a>
      <table className="w-full m-0 hidden xl:table">
        <thead>
          <tr className="border-b border-white">
            <th scope="col" style={{ width: '90%' }} className="text-left text-sm lg:text-xs p-2 lg:px-2 lg:py-1 font-bold">Quốc gia</th>
            <th scope="col" className="text-left text-sm lg:text-xs p-2 lg:px-2 lg:py-1 w-[20%]"><img src="/img/icon/facial-mask.svg" alt="" className="w-1/2 lg:w-3/4 mx-auto" /></th>
            <th scope="col" className="text-left text-sm lg:text-xs p-2 lg:px-2 lg:py-1 w-[20%]"><img src="/img/icon/death.svg" alt="" className="w-1/2 lg:w-3/4 mx-auto" /></th>
          </tr>
        </thead>
        <tbody>
          {_.map(data, (item: CovidData, i: number) =>
            <tr key={i} className="border-b border-white last:border-0">
              <th scope="row" className="text-left text-sm lg:text-xs p-2 lg:px-2 lg:py-1 font-normal">{item.label}</th>
              <td className="text-right text-sm lg:text-xs p-2 lg:px-2 lg:py-1">{item.infected.toLocaleString()}</td>
              <td className="text-right text-sm lg:text-xs p-2 lg:px-2 lg:py-1 text-danger">{item.dead.toLocaleString()}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Covid;