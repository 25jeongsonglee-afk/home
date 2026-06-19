import React, { useState, useEffect } from 'react';
import { store } from './store';
import { User, Project, PortfolioItem, Announcement } from './types';

// Importing built sub-modules
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Process from './components/Process';
import Reviews from './components/Reviews';
import Inquiry from './components/Inquiry';
import LoginModal from './components/LoginModal';
import MyPage from './components/MyPage';
import RequestForm from './components/RequestForm';
import AdminPanel from './components/AdminPanel';
import PreviewEditor from './components/PreviewEditor';

import { Sparkles, Megaphone, ArrowUpRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function App() {
  // Navigation Router state
  const [view, setView] = useState<'home' | 'mypage' | 'admin' | 'request' | 'editor'>('home');
  const [selectedPricingTier, setSelectedPricingTier] = useState<'BASIC' | 'STANDARD' | 'PREMIUM' | undefined>(undefined);
  const [selectedProjectForPreview, setSelectedProjectForPreview] = useState<Project | null>(null);
  const [customSessionSpecs, setCustomSessionSpecs] = useState<any>(null);
  
  // Modals state
  const [showLogin, setShowLogin] = useState(false);

  // Store lists states (kept synced via store subscription)
  const [user, setUser] = useState<User | null>(store.getCurrentUser());
  const [projects, setProjects] = useState<Project[]>(store.getProjects());
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(store.getPortfolios());
  const [reviews, setReviews] = useState(store.getReviews());
  const [announcements, setAnnouncements] = useState<Announcement[]>(store.getAnnouncements());

  // Setup reactive subscription with global store
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setUser(store.getCurrentUser());
      setProjects(store.getProjects());
      setPortfolios(store.getPortfolios());
      setReviews(store.getReviews());
      setAnnouncements(store.getAnnouncements());
    });
    return unsubscribe;
  }, []);

  const handleLoginSuccess = (email: string, name: string) => {
    const newUser = store.loginSimulated(email, name);
    if (newUser.isAdmin) {
      setView('admin');
    } else {
      setView('mypage');
    }
  };

  const handleLogout = () => {
    store.logout();
    setView('home');
  };

  const handleSelectTier = (tier: 'BASIC' | 'STANDARD' | 'PREMIUM') => {
    setSelectedPricingTier(tier);
    setView('request');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const activePromoEvent = announcements.find(a => a.isEvent);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      
      {/* Top Promos Notice Announcement Banner */}
      {activePromoEvent && (
        <div className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 py-2.5 text-center text-xs text-white font-extrabold flex items-center justify-center gap-2 px-4 shadow-sm relative z-50">
          <Sparkles className="h-4 w-4 text-amber-300 shrink-0" />
          <span>{activePromoEvent.title}</span>
          <span className="hidden leading-none md:inline-block font-medium opacity-85">
            - {activePromoEvent.content}
          </span>
          <button 
            onClick={() => setView('request')} 
            className="bg-white/20 hover:bg-white/30 px-2 rounded font-black text-10px tracking-tight flex items-center gap-0.5 ml-2 transition-colors shrink-0"
          >
            <span>의뢰하기</span>
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        currentUser={user}
        currentView={view}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={handleLogout}
        onNavigate={(newView) => {
          setView(newView);
          // Scroll page to top on view changes
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Mainframes rendering block with simple views router */}
      <main className="flex-1 bg-white">
        {view === 'home' && (
          <div className="animate-fade-in divide-y divide-gray-100">
            {/* 1. Hero visual opener */}
            <Hero 
              onNavigate={(nv) => {
                setView(nv);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewPortfolioClick={() => {
                const el = document.getElementById('portfolio-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. Intro category outlines */}
            <Intro />

            {/* 3. Portfolios capture grids */}
            <Portfolio 
              items={portfolios} 
            />

            {/* 4. Custom transparent pricing tiers */}
            <Pricing 
              onSelectTier={handleSelectTier} 
            />

            {/* 5. Production milestones Timeline */}
            <Process />

            {/* 6. Honest testimonials carousel */}
            <Reviews 
              reviews={reviews} 
            />

            {/* 7. Communications channels inquiries */}
            <Inquiry />
          </div>
        )}

        {view === 'mypage' && (
          <div className="animate-fade-in py-6 sm:py-10 bg-gray-50/50 min-h-[75vh]">
            <MyPage 
              currentUser={user} 
              projects={projects}
              onNavigate={(nv) => {
                setView(nv);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectProjectForPreview={(p) => setSelectedProjectForPreview(p)}
            />
          </div>
        )}

        {view === 'admin' && (
          <div className="animate-fade-in py-6 sm:py-10 bg-gray-50/50 min-h-[75vh]">
            <AdminPanel 
              currentUser={user}
              projects={projects}
              portfolios={portfolios}
              announcements={announcements}
              onNavigate={(nv) => {
                setView(nv);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectProjectForPreview={(p) => setSelectedProjectForPreview(p)}
            />
          </div>
        )}

        {view === 'request' && (
          <div className="animate-fade-in py-6 sm:py-10 bg-white">
            <RequestForm 
              currentUser={user}
              onLoginClick={() => setShowLogin(true)}
              selectedTier={selectedPricingTier}
              customSessionSpecs={customSessionSpecs}
              onSubmitSuccess={() => {
                setSelectedPricingTier(undefined);
                setCustomSessionSpecs(null);
                setSelectedProjectForPreview(null);
                setView('mypage');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {view === 'editor' && (
          <div className="animate-fade-in bg-white min-h-[80vh]">
            <PreviewEditor 
              currentUser={user}
              activeProject={selectedProjectForPreview}
              onNavigate={(nv) => {
                setView(nv);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onApplyToRequestForm={(customSpecs) => {
                setCustomSessionSpecs(customSpecs);
                setView('request');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}
      </main>

      {/* Footer Details */}
      <footer className="bg-gray-950 text-gray-400 py-12 px-4 border-t border-gray-900 mt-auto">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left text-xs sm:text-sm">
          
          {/* Identity column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-md">
                <span className="text-white text-base font-black">LCI</span>
              </div>
              <span className="text-white text-base font-bold tracking-tight">LCI WebStudio</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              3일 만에 완성되는 반응형 웹 제작 전문 혁신 연구소. <br />
              Vite 6, Tailwind v4 및 최첨단 Gemini AI 결합 기획서 통합.
            </p>
          </div>

          {/* Links column */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">주문 및 계약 보증</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>공식 상호: (주)엘씨아이 웹스튜디오</li>
              <li>대표 번호: 1544-3120 (평일 10:00 - 18:00)</li>
              <li>사업 등록인 정보: 제 312-85-45120 호</li>
              <li>통신 판매 허가: 제 2026-서울강남-1205 호</li>
            </ul>
          </div>

          {/* Guarantee stamp card */}
          <div className="space-y-4 border-t border-gray-900 pt-6 md:border-t-0 md:pt-0">
            <div className="bg-gray-900 rounded-2xl p-4.5 space-y-1.5 border border-gray-850">
              <p className="font-extrabold text-emerald-400 flex items-center gap-1.5 text-xs">
                <ShieldCheck className="h-4 w-4" />
                <span>100% 에스크로 고객 보호제</span>
              </p>
              <p className="text-11px text-gray-500 leading-normal">
                LCI 자체 에스크로 계약제를 통해, 홈페이지 3일 내 가동 실패 시 전액 보증 환급 및 유선 보상을 제공합니다.
              </p>
            </div>
            <p className="text-[10px] text-gray-600">copyhold 2026 LCI WebStudio. all rights reserved.</p>
          </div>

        </div>
      </footer>

      {/* Google Login Pop-up Modal Container */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={(email, name) => handleLoginSuccess(email, name)}
        />
      )}

    </div>
  );
}
