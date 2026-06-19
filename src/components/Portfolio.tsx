import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { ExternalLink, Eye, Monitor, Compass, Sparkles, X, Heart } from 'lucide-react';

interface PortfolioProps {
  items: PortfolioItem[];
  isAdmin?: boolean;
  onDeleteItem?: (id: string) => void;
}

export default function Portfolio({ items, isAdmin = false, onDeleteItem }: PortfolioProps) {
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({
    'p-1': 142,
    'p-2': 98,
    'p-3': 185,
    'p-4': 76
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section id="portfolio-section" className="scroll-mt-12 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div className="space-y-3 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Live Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              우리가 제작한 실제 포트폴리오
            </h2>
            <p className="text-gray-500 max-w-lg text-sm sm:text-base">
              LCI WebStudio는 가짜 목업이 아닌, 실제 모바일 터치 및 검색 노출 최적화가 완벽 구현된 웹 브라우저 제품들만을 투명하게 공개합니다.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            <span>클릭 시 고해상도 디자인 상세 명세 및 템플릿 아웃룩 제공</span>
          </div>
        </div>

        {/* Portfolios Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-150/80 bg-white shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all cursor-pointer duration-300"
            >
              {/* Portfolio Wallpaper Wrapper */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                />
                
                {/* Visual Cover Sheet on Hover */}
                <div className="absolute inset-0 bg-gray-950/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                  <div className="rounded-full bg-white p-3 text-gray-900 shadow-lg hover:scale-110 transition-transform">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div className="rounded-full bg-indigo-600 p-3 text-white shadow-lg hover:scale-110 transition-transform">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                </div>

                {/* Domain Tag */}
                <span className="absolute top-4 left-4 rounded-full bg-gray-950/85 backdrop-blur-md px-3 py-1 font-mono text-9px font-bold uppercase tracking-wider text-white border border-white/10">
                  {item.category}
                </span>

                {/* Simulated Like Button */}
                <button 
                  onClick={(e) => handleLike(item.id, e)}
                  className="absolute top-4 right-4 rounded-full bg-white/95 shadow-sm p-1.5 flex items-center space-x-1 text-xs text-rose-500 font-bold transition-transform hover:scale-105"
                >
                  <Heart className="h-3.5 w-3.5 fill-rose-500 shrink-0" />
                  <span className="font-mono text-10px">{likes[item.id] || 0}</span>
                </button>
              </div>

              {/* Bottom Body context */}
              <div className="p-6 space-y-3.5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  {item.description}
                </p>

                {/* Features Pill row */}
                {item.details && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.details.map((det, index) => (
                      <span key={index} className="rounded-md bg-gray-50 text-gray-600 font-medium text-10px px-2.5 py-1 border border-gray-100">
                        {det}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Admin Deletion Action */}
              {isAdmin && onDeleteItem && (
                <div className="p-3 border-t bg-rose-50 flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('이 포트폴리오 항목을 삭제하시겠습니까?')) {
                        onDeleteItem(item.id);
                      }
                    }}
                    className="text-xs font-bold text-red-600 hover:text-red-700 bg-white px-3 py-1.5 rounded-lg border border-red-200"
                  >
                    삭제 기각
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detailed Modal Portfolio Viewer */}
        {activeItem && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden max-h-[95vh] flex flex-col">
              
              {/* Browser Simulation Top Header */}
              <div className="bg-gray-50 border-b border-gray-100 p-4.5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <span className="h-3 w-3 rounded-full bg-red-400"></span>
                    <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                    <span className="h-3 w-3 rounded-full bg-green-400"></span>
                  </div>
                  <span className="text-sm font-bold text-gray-700 ml-4">{activeItem.title}</span>
                </div>
                
                <button
                  onClick={() => setActiveItem(null)}
                  className="p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-sm border">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold text-xs px-3 py-1 uppercase">
                      {activeItem.category}
                    </span>
                    <span className="text-xs font-mono text-gray-400">ID: {activeItem.id}</span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">💡 프로젝트 기획 소개</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      {activeItem.description}
                    </p>
                  </div>

                  {activeItem.details && (
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-2.5">⭐ 탑재된 핵심 컴포넌트</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {activeItem.details.map((det, index) => (
                          <li key={index} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-150">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                            <span className="font-semibold text-gray-700">{det}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex items-center justify-between text-xs sm:text-sm">
                    <div className="space-y-1">
                      <p className="font-extrabold text-indigo-950">이와 유사한 프로젝트가 필요하신가요?</p>
                      <p className="text-gray-500 font-medium text-xs">정통 견적으로 지금 의뢰하면 3일 뒤 오픈합니다.</p>
                    </div>
                    
                    {/* Simulated instant redirection link */}
                    <a
                      href="https://google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl shadow-md transition"
                    >
                      <span>실제 사이트 보기</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Confirm Frame Action bar */}
              <div className="p-4 border-t bg-gray-50 flex justify-end">
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-6 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs shadow-sm"
                >
                  창 닫기
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
