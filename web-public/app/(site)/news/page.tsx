"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';
import Aside from '@/components/layout/Aside';
import TagList from '@/components/common/TagList';
import contentService, { Post } from '@/services/content.service';

const NewsCategory = () => {
  const [allArticles, setAllArticles] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await contentService.getPosts();
        setAllArticles(data.filter(item => item.isActive));
      } catch (err: any) {
        setError(err.message || 'Failed to load news');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-20 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium tracking-wide">Đang cập nhật tin tức y tế...</p>
        </div>
      </div>
    );
  }

  if (error) return <div className="p-20 text-center text-red-500">Lỗi: {error}</div>;

  // Hero Section Data (Top 3)
  const heroMain = allArticles[0];
  const heroSub = allArticles.slice(1, 3);

  // Latest News Data (Next 6)
  const latestNewsItems = allArticles.slice(3, 9);

  // Group by category for SECTION 3
  const categoriesMap = allArticles.reduce((acc: any, article: any) => {
    // Determine category name (either direct string or derived)
    const catName = article.category || 'Tin tức chung';
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(article);
    return acc;
  }, {});

  const categoryEntries = Object.entries(categoriesMap);

  return (
    <>
      <Banner page="news" />
      <div className="bg-gray-50/50 py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">

            {/* Main Content (75%) */}
            <div className="w-full lg:w-9/12 px-4 mb-8 lg:mb-0">

              {/* SECTION 1: HERO NEWS */}
              {heroMain && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-primary pl-3 uppercase">Tiêu điểm</h2>
                    <div className="h-0.5 bg-gray-100 flex-1"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[450px]">
                    {/* Big Main Card */}
                    <div className="md:col-span-2 relative group overflow-hidden rounded-2xl shadow-sm cursor-pointer h-full">
                      <img src={heroMain.thumbnail || '/img/placeholder.png'} alt={heroMain.title} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                        <span className="inline-block bg-primary text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full mb-3 shadow-md">Nổi bật</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-primary transition-colors">
                          <Link href={`/news/${heroMain.id}`}>{heroMain.title}</Link>
                        </h3>
                        <div className="flex items-center text-gray-300 text-sm gap-4">
                          <span className="font-bold text-white">{heroMain.author}</span>
                          <span>• {heroMain.date}</span>
                          <span className="flex items-center gap-1">👁️ {heroMain.view || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Side Sub Cards */}
                    <div className="flex flex-col gap-6 h-full">
                      {heroSub.map((item: any, idx: number) => (
                        <div key={item.id || idx} className="flex-1 relative group overflow-hidden rounded-2xl shadow-sm cursor-pointer">
                          <img src={item.thumbnail || '/img/placeholder.png'} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                          <div className="absolute bottom-0 left-0 p-5 w-full">
                            <h4 className="text-lg font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              <Link href={`/news/${item.id}`}>{item.title}</Link>
                            </h4>
                            <span className="text-xs text-gray-300 block font-medium">{item.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 2: LATEST NEWS GRID */}
              {latestNewsItems.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-primary pl-3 uppercase">Mới nhất</h2>
                    <div className="h-0.5 bg-gray-100 flex-1"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {latestNewsItems.map((item: any, index: number) => (
                      <div key={item.id || index} className="flex flex-col group h-full bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-all border border-gray-100">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 relative flex-shrink-0">
                          <img src={item.thumbnail || '/img/placeholder.png'} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">Tin tức</span>
                            <span className="text-[10px] text-gray-400 font-medium">{item.date}</span>
                          </div>
                          <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 line-clamp-3 group-hover:text-primary transition-colors">
                            <Link href={`/news/${item.id}`}>{item.title}</Link>
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 3: CATEGORY STRIPS */}
              <div className="space-y-12">
                {categoryEntries.map(([categoryName, articles]: [string, any], catIndex: number) => (
                  <div key={catIndex}>
                    <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
                      <h2 className="text-xl font-bold text-gray-900 uppercase flex items-center gap-2">
                        <span className="w-2 h-8 bg-primary rounded-sm"></span>
                        {categoryName}
                      </h2>
                      <Link href="#" className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 transition-all uppercase tracking-wide">
                        Xem tất cả <i className="fi flaticon-next text-[10px]"></i>
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Large Featured Article for Category */}
                      {articles[0] && (
                        <div className="md:row-span-3 group cursor-pointer bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                          <div className="aspect-video rounded-xl overflow-hidden mb-4 relative shadow-sm">
                            <img src={articles[0].thumbnail || '/img/placeholder.png'} alt={articles[0].title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors">
                            <Link href={`/news/${articles[0].id}`}>{articles[0].title}</Link>
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed font-medium">{articles[0].desc}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-400 border-t border-gray-50 pt-4">
                            {articles[0].authorAvatar && (
                              <img src={articles[0].authorAvatar} className="w-6 h-6 rounded-full object-cover border border-gray-200" alt="" />
                            )}
                            <span className="font-bold text-gray-700">{articles[0].author}</span>
                            <span>• {articles[0].date}</span>
                          </div>
                        </div>
                      )}

                      {/* Side List */}
                      <div className="flex flex-col gap-6">
                        {articles.slice(1, 4).map((article: any, aIdx: number) => (
                          <div key={article.id || aIdx} className="flex gap-4 group cursor-pointer border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                            <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden relative border border-gray-100 shadow-sm">
                              <img src={article.thumbnail || '/img/placeholder.png'} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                            </div>
                            <div className="flex-1 py-1">
                              <h4 className="text-sm font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                <Link href={`/news/${article.id}`}>{article.title}</Link>
                              </h4>
                              <div className="flex items-center gap-3 text-[10px] text-gray-500 font-medium">
                                <span>{article.date}</span>
                                <span>• 👁️ {article.view}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar (25%) */}
            <div className="w-full lg:w-3/12 px-4 mt-8 lg:mt-0">
              <div className="sticky top-24 space-y-8">
                {/* Search Box */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h5 className="font-bold text-gray-900 mb-5 text-[10px] uppercase tracking-widest px-3 border-l-4 border-primary">Tìm kiếm tin tức</h5>
                  <div className="relative">
                    <input type="text" placeholder="Nhập nội dung..." className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-medium" />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                      🔍
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h5 className="font-bold text-gray-900 mb-5 text-[10px] uppercase tracking-widest px-3 border-l-4 border-primary">Từ khóa HOT</h5>
                  <TagList />
                </div>

                {/* Unified Aside Component */}
                <Aside isFixed={false} />

                {/* Ads */}
                <div className="w-full aspect-[300/400] bg-gray-900 rounded-3xl flex items-center justify-center text-white text-sm overflow-hidden relative group cursor-pointer shadow-xl shadow-gray-200">
                  <img src="https://img.freepik.com/free-vector/medical-doctor-presentation-template_23-2148156685.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition duration-1000" alt="Ad" />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
                  <div className="z-10 text-center p-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-white/70">Quảng cáo tài trợ</p>
                    <p className="text-xl font-bold leading-tight mb-4">Gói khám sức khỏe tổng quát Premium 2025</p>
                    <span className="bg-white text-primary px-5 py-2 rounded-full font-bold text-xs">Tìm hiểu ngay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCategory;