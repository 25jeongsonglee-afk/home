import React from 'react';
import { Sparkles, Code, Monitor, Smartphone, CheckCircle, ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: 'home' | 'mypage' | 'admin' | 'request' | 'editor') => void;
  onViewPortfolioClick: () => void;
}

export default function Hero({ onNavigate, onViewPortfolioClick }: HeroProps) {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-indigo-50/40 via-white to-white py-16 sm:py-24 lg:py-28">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/10 left-1/10 -z-10 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl"></div>
      <div className="absolute top-1/4 right-1/10 -z-10 h-80 w-80 rounded-full bg-purple-100/40 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 mx-auto lg:mx-0">
              <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '3s' }} />
              <span>SNS 화제의 웹제작 스튜디오</span>
            </div>

            {/* Main Captivating Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.15]">
              실감 나는 홈페이지가<br />
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                단 3일 만에
              </span> 완성됩니다.
            </h1>

            {/* Subtexts */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
              비싼 외주 비용과 오랜 기다림에 지치셨나요? 
              마케팅 기획부터 모바일 최적화까지 완벽 설계된 고퀄리티 반응형 웹사이트를 10만원대 프리미엄 퀄리티로 경험하세요.
            </p>

            {/* Highlighted Categories */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-sm font-semibold text-gray-500">
              <span className="flex items-center space-x-1 text-gray-800">
                <CheckCircle className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                <span>기업 브랜드</span>
              </span>
              <span className="flex items-center space-x-1 text-gray-800">
                <CheckCircle className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                <span>대학/연합 동아리</span>
              </span>
              <span className="flex items-center space-x-1 text-gray-800">
                <CheckCircle className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                <span>행사 · 축제 홍보</span>
              </span>
              <span className="flex items-center space-x-1 text-gray-800">
                <CheckCircle className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                <span>개인 포트폴리오</span>
              </span>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                id="hero-request-now-btn"
                onClick={() => onNavigate('request')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-bold text-white hover:bg-gray-900 shadow-xl transition-all hover:-translate-y-0.5"
              >
                <span>지금 제작 신청하기</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                id="hero-editor-sandbox-btn"
                onClick={() => onNavigate('editor')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 px-5 py-3.5 text-sm font-bold text-indigo-700 transition-all shadow-md shadow-indigo-50 hover:-translate-y-0.5"
              >
                <Sparkles className="h-4.5 w-4.5 text-indigo-600 shrink-0" />
                <span>체험 시안 편집기 구동</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              </button>

              <button
                id="hero-portfolio-scroll-btn"
                onClick={onViewPortfolioClick}
                className="w-full sm:w-auto flex items-center justify-center space-x-1 rounded-xl bg-white border border-gray-200 px-5 py-3.5 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                <span>포트폴리오</span>
              </button>
            </div>
          </div>

          {/* Hero Right Visuals: Interactive Mockup Site Generator Preview */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 max-w-md mx-auto w-full">
            <div className="relative rounded-2xl border border-gray-200/80 bg-white p-2.5 shadow-2xl shadow-indigo-100/50">
              
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 px-1">
                <div className="flex space-x-1.5 align-middle">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="rounded-md bg-gray-50 px-8 py-0.5 text-9px font-mono text-gray-400 border border-gray-100 truncate max-w-[180px]">
                  lci-studio.com/sandbox-preview
                </div>
                <div className="flex space-x-1">
                  <Monitor className="h-3 w-3 text-indigo-500" />
                  <Smartphone className="h-3 w-3 text-gray-300" />
                </div>
              </div>

              {/* Inside Interactive Design Screen */}
              <div className="mt-2.5 rounded-xl bg-gray-950 p-4.5 text-white font-sans overflow-hidden min-h-[290px] relative flex flex-col justify-between">
                
                {/* AI Design Floating Box */}
                <div className="absolute top-2.5 right-2.5 scale-90 xs:scale-100 rounded-lg bg-white/10 backdrop-blur-md px-3 py-1.5 border border-white/10 text-9px font-mono space-y-0.5">
                  <span className="text-purple-300 flex items-center gap-1 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping"></span>
                    AI Engine Analyzing...
                  </span>
                  <div className="text-white/60">Layout: Dynamic Bento</div>
                  <div className="text-white/60">Palette: Emerald-Mint</div>
                </div>

                {/* Simulated Homepage UI */}
                <div className="space-y-4 pt-4">
                  <div className="h-3 w-16 rounded-full bg-emerald-500/20 text-emerald-400 text-8px font-bold px-1.5 py-0.5 text-center">
                    GARDENING
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs text-white/50 font-semibold tracking-wider">소소한 가드닝 샵</p>
                    <p className="text-sm font-bold tracking-tight">바쁜 일상 속 나만의 초록 쉼터</p>
                  </div>
                  
                  {/* Grid layout sample preview inside browser mock */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded bg-white/5 border border-white/5 space-y-1">
                      <div className="h-1.5 w-3/4 rounded bg-white/20"></div>
                      <div className="h-1.2 w-full rounded bg-white/10"></div>
                      <div className="h-1.2 w-1/2 rounded bg-white/10"></div>
                    </div>
                    <div className="p-2 rounded bg-emerald-500/15 border border-emerald-500/10 space-y-1">
                      <div className="h-1.5 w-1/2 rounded bg-emerald-400/30"></div>
                      <div className="h-1.2 w-full rounded bg-emerald-400/10"></div>
                      <div className="h-3 w-8 rounded bg-emerald-500 mt-1"></div>
                    </div>
                  </div>
                </div>

                {/* Loading Status Tracking Bar simulating direct build */}
                <div className="border-t border-white/15 pt-3 mt-4 space-y-2">
                  <div className="flex justify-between text-9px text-white/60">
                    <span>실시간 3D 제작 진척도</span>
                    <span className="font-mono text-emerald-400 font-semibold">68% Done</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full animate-pulse" style={{ width: '68%' }}></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Static Review Pop */}
            <div className="absolute -bottom-5 -left-4 xs:left-3 rounded-xl bg-white p-3 shadow-xl border border-gray-100 flex items-center space-x-2.5 max-w-[200px] scale-90 xs:scale-100">
              <span className="text-xl">🌟</span>
              <div>
                <p className="text-10px font-extrabold text-gray-900">"진짜 딱 3일 걸렸어요!"</p>
                <div className="flex text-8px text-amber-500 mt-0.5">⭐⭐⭐⭐⭐ <span className="text-gray-400 ml-1">카페 대표 이*원</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
