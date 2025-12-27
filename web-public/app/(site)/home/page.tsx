'use client';

import { useRouter } from 'next/navigation';
import React, { Fragment, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Banner from '@/components/common/Banner';
import { useViewport } from '@/components/common/Function';

// Dynamic imports
const Latest = dynamic(() => import('./Latest'), { ssr: false });
const TopDoctor = dynamic(() => import('./TopDoctor'), { ssr: false });
const TopHospital = dynamic(() => import('./TopHospital'), { ssr: false });
const MostView = dynamic(() => import('./MostView'), { ssr: false });
const Infographic = dynamic(() => import('./Infographic'), { ssr: false });
const TopLatestVideo = dynamic(() => import('./TopLatestVideo'), { ssr: false });
const Covid = dynamic(() => import('./Covid'), { ssr: false });
const TabletMenu = dynamic(() => import('./TabletMenu'), { ssr: false });

// Ecosystem Role Card
const EcosystemCard = ({ title, desc, icon, link, color }: { title: string, desc: string, icon: string, link: string, color: string }) => (
  <Link href={link} className="flex items-start p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg hover:border-primary transition-all duration-300 group">
    <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center flex-shrink-0 mr-4`}>
      <i className={`fi flaticon-${icon} text-2xl ${color.replace('bg-', 'text-')}`}></i>
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  </Link>
);

const SectionHeader = ({ title, linkText = "Xem tất cả", linkUrl = "#" }: { title: string, linkText?: string, linkUrl?: string }) => (
  <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-3">
    <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-primary pl-3">{title}</h2>
    <Link href={linkUrl} className="text-sm font-medium text-gray-500 hover:text-primary flex items-center gap-1 transition-colors">
      {linkText} <i className="fi flaticon-right-arrow text-xs"></i>
    </Link>
  </div>
);

const Home = () => {
  const { width } = useViewport();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 1. Hero Section - Professional & Clean */}
      <div className="w-full bg-white relative z-0 mb-12 shadow-sm">
        <Banner page="home" />
      </div>

      {/* 2. Tablet Menu - Quick Actions */}
      <TabletMenu />

      {/* 3. Healthcare Ecosystem Hub - The Core Request */}
      <div className="container mx-auto px-4 max-w-7xl mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Hệ sinh thái Y tế Toàn diện</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Kết nối toàn diện giữa Bệnh nhân, Bác sĩ, và các Cơ sở y tế trên một nền tảng thống nhất.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EcosystemCard
            title="Dành cho Bệnh nhân"
            desc="Đặt lịch khám, tư vấn trực tuyến và quản lý hồ sơ sức khỏe cá nhân."
            icon="user"
            link="/profile/user"
            color="bg-blue-500"
          />
          <EcosystemCard
            title="Dành cho Bác sĩ"
            desc="Quản lý lịch hẹn, bệnh nhân và nâng cao uy tín chuyên môn."
            icon="doctor"
            link="/search?type=doctor"
            color="bg-teal-600"
          />
          <EcosystemCard
            title="Cơ sở Y tế"
            desc="Giải pháp chuyển đổi số toàn diện cho Bệnh viện và Phòng khám."
            icon="hospital"
            link="/search?type=hospital"
            color="bg-indigo-600"
          />
          <EcosystemCard
            title="Nhà thuốc"
            desc="Kết nối nhà thuốc đạt chuẩn GPP với người dân có nhu cầu."
            icon="pharmacy"
            link="/search?type=pharmacy"
            color="bg-emerald-600"
          />
          <EcosystemCard
            title="Dược sĩ"
            desc="Cộng đồng dược sĩ chuyên nghiệp, tư vấn thuốc an toàn hiệu quả."
            icon="pharmacist"
            link="/search?type=pharmacist"
            color="bg-orange-500"
          />
          <EcosystemCard
            title="Cửa hàng Y tế"
            desc="Mua sắm thiết bị y tế và thực phẩm chức năng chính hãng."
            icon="shopping-cart"
            link="/shop"
            color="bg-rose-500"
          />
        </div>
      </div>

      {/* 3. Main Content Grid - Classic Web Layout */}
      <div className="container mx-auto px-4 max-w-7xl mb-20">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

          {/* Left Column (Main Content) - 9 Cols */}
          <div className="xl:col-span-9 space-y-16">

            {/* Top Doctors */}
            <section>
              <SectionHeader title="Bác sĩ nổi bật" linkUrl="/search?type=doctor" />
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <TopDoctor />
              </div>
            </section>

            {/* Top Hospitals */}
            <section>
              <SectionHeader title="Cơ sở y tế uy tín" linkUrl="/search?type=hospital" />
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <TopHospital />
              </div>
            </section>

            {/* News Stream */}
            <section>
              <SectionHeader title="Tin tức Y tế" linkUrl="/news" />
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <Latest />
              </div>
            </section>

            {/* Videos - Light & Clean Section */}
            <section>
              <SectionHeader title="Video Tư vấn" linkUrl="/video" />
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <TopLatestVideo />
              </div>
            </section>
          </div>

          {/* Right Sidebar - 3 Cols */}
          <div className="hidden xl:block xl:col-span-3 space-y-10">

            {/* Trending / Most View */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">Đọc nhiều nhất</h3>
              <MostView />
            </div>

            {/* Covid Stats or Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">Thông tin Covid-19</h3>
              <Covid />
            </div>

            {/* Ads / Promotion */}
            <div className="space-y-4">
              <a href="#" className="block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <img src="/img/news/quyen-loi.jpg" alt="Ads" className="w-full h-auto" />
              </a>
              <a href="#" className="block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <img src="/img/news/zalo.png" alt="Ads" className="w-full h-auto" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Bottom Full Width Section - Education */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <SectionHeader title="Infographic Y khoa" linkUrl="#" />
          <Infographic />
        </div>
      </div>
    </div>
  );
};

export default Home;