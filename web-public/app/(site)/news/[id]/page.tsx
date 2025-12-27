"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Aside from '@/components/layout/Aside';
import TagList from '@/components/common/TagList';
import CommentSection from '@/app/(site)/news/components/CommentSection';
import RelatedNews from '@/app/(site)/news/components/RelatedNews';
import { useQuery } from '@apollo/client/react';
import { GET_NEWS_BY_ID } from '@/graphql/news';

const NewsDetailPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const { data, loading, error } = useQuery<any>(GET_NEWS_BY_ID, {
    variables: { id },
    skip: !isMounted || !id
  });

  const [fixed, setAtsideFixed] = useState<boolean>(false);

  // Scroll logic for Aside
  useEffect(() => {
    const handleScroll = () => {
      setAtsideFixed(window.pageYOffset >= 400);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted || loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-20 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium">Đang tải nội dung bài viết...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.getNewsById) {
    return (
      <div className="container py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-6xl mb-6">🔍</div>
        <h3 className="text-2xl font-bold text-gray-900">Không tìm thấy bài viết</h3>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">Bài viết bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc liên kết không hợp lệ.</p>
        <Link href="/news" className="mt-8 bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
          Quay lại trang tin tức
        </Link>
      </div>
    );
  }

  const newsItem = data.getNewsById;

  return (
    <section className="news-details py-12 bg-gray-50/30 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">

          {/* Main Content - Left 75% on large screens */}
          <div className="w-full lg:w-9/12 px-4 mb-8 lg:mb-0">
            {/* Breadcrumb */}
            <div className="flex items-center text-xs font-bold uppercase tracking-wider text-gray-400 mb-8 overflow-hidden">
              <Link href="/" className="hover:text-primary transition-colors flex-shrink-0">TRANG CHỦ</Link>
              <span className="mx-3 opacity-30">/</span>
              <Link href="/news" className="hover:text-primary transition-colors flex-shrink-0">TIN TỨC</Link>
              <span className="mx-3 opacity-30">/</span>
              <span className="text-primary truncate">{newsItem.title}</span>
            </div>

            <div className="bg-white p-6 md:p-10 lg:p-14 rounded-[2.5rem] shadow-sm border border-gray-100/60 transition-all hover:shadow-xl hover:shadow-gray-200/40">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-primary/10 mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  {newsItem.category?.name}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.15] mb-8 font-poppins">
                  {newsItem.title}
                </h1>
              </div>

              {/* Author & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-6 border-y border-gray-50 py-8 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                    <img src={newsItem.authorAvatar || '/img/user/default.png'} alt={newsItem.authorName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="block text-lg font-bold text-gray-900 leading-tight">{newsItem.authorName || 'Ban biên tập'}</span>
                    <div className="flex items-center gap-3 text-sm text-gray-400 font-medium mt-1">
                      <span>{newsItem.publishDate}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>👁️ {newsItem.view?.toLocaleString() || 0} lượt xem</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 text-blue-600 font-bold text-sm hover:bg-blue-600 hover:text-white transition-all">
                    <i className="fi flaticon-facebook"></i>
                    <span>Chia sẻ</span>
                  </button>
                  <button className="w-11 h-11 rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 flex items-center justify-center transition-all" title="Lưu bài viết">
                    🔖
                  </button>
                </div>
              </div>

              {/* Content Body */}
              <div className="article-content">
                {newsItem.desc && (
                  <div className="relative mb-12">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-full"></div>
                    <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed pl-8 italic bg-gray-50/50 py-4 rounded-r-2xl pr-6">
                      {newsItem.desc}
                    </p>
                  </div>
                )}

                <div className="w-full rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-gray-200 border-4 border-white">
                  <img src={newsItem.thumbnail || '/img/placeholder.png'} alt={newsItem.title} className="w-full h-auto object-cover" />
                  {/* <p className="text-center text-xs text-gray-400 mt-4 font-medium uppercase tracking-widest">{newsItem.title}</p> */}
                </div>

                <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed whitespace-pre-line font-medium text-lg">
                  {newsItem.content}
                </div>

                <div className="mt-16 p-8 bg-blue-50/50 rounded-3xl border border-blue-100/50 flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-lg shadow-blue-200">
                    💡
                  </div>
                  <div>
                    <h4 className="text-blue-900 font-bold text-lg mb-2">Tuyên bố miễn trừ trách nhiệm</h4>
                    <p className="text-sm text-blue-800/70 leading-relaxed m-0">
                      Nội dung trên MediHub chỉ mang tính chất tham khảo, không dùng để thay thế chẩn đoán hoặc điều trị y khoa.
                      Quý độc giả vui lòng tham khảo ý kiến chuyên gia y tế trước khi áp dụng bất kỳ thông tin nào.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Tags */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex items-center flex-wrap gap-3">
                  <span className="font-bold text-gray-900 mr-2 text-xs uppercase tracking-widest">Từ khóa bài viết:</span>
                  <Link href="#" className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all">#HEALTHCARE</Link>
                  <Link href="#" className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all">#YTE</Link>
                  <Link href="#" className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all">#MEDIHUB</Link>
                  <Link href="#" className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all">#SUKKHOE</Link>
                </div>
              </div>
            </div>

            {/* Related News & Comments */}
            <div className="mt-12 space-y-12">
              <RelatedNews />
              <CommentSection />
            </div>
          </div>

          {/* Sidebar - Right 25% on large screens */}
          <div className="w-full lg:w-3/12 px-4">
            <div className="sticky top-24 space-y-8">
              {/* Search Box */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h5 className="font-bold text-gray-900 mb-5 text-[10px] uppercase tracking-widest px-3 border-l-4 border-primary">Tìm kiếm</h5>
                <div className="relative">
                  <input type="text" placeholder="Nhập từ khóa..." className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-medium" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                    🔍
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h5 className="font-bold text-gray-900 mb-5 text-[10px] uppercase tracking-widest px-3 border-l-4 border-primary">Chủ đề HOT</h5>
                <TagList />
              </div>

              {/* Aside Component */}
              <Aside isFixed={fixed} />

              {/* Banner Ad */}
              <div className="w-full aspect-[300/500] bg-gray-900 rounded-[2rem] flex items-center justify-center text-white text-sm overflow-hidden relative group cursor-pointer shadow-xl shadow-gray-200">
                <img src="https://img.freepik.com/free-photo/medical-stethoscope-isolated-with-copyspace_23-2148281313.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition duration-1000" alt="Ad" />
                <div className="z-10 text-center p-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black mb-4 text-primary">TƯ VẤN MIỄN PHÍ</p>
                  <p className="text-2xl font-extrabold leading-tight mb-6">Bạn cần bác sĩ tư vấn ngay bây giờ?</p>
                  <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all">Kết nối ngay</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsDetailPage;