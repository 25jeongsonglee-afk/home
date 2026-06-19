import React from 'react';
import { User } from '../types';
import { Compass, Cpu, LogOut, Code, User as UserIcon, ShieldAlert, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onNavigate: (view: 'home' | 'mypage' | 'admin' | 'request' | 'editor') => void;
  currentView: 'home' | 'mypage' | 'admin' | 'request' | 'editor';
}

export default function Navbar({ currentUser, onLoginClick, onLogoutClick, onNavigate, currentView }: NavbarProps) {
  const scrollToId = (id: string) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header id="app-navbar" className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex cursor-pointer items-center space-x-2 transition-transform hover:scale-102"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-md shadow-indigo-100">
            <Cpu className="h-5.5 w-5.5 text-white animate-pulse" />
          </div>
          <div>
            <span className="bg-gradient-to-r from-gray-900 via-indigo-950 to-purple-900 bg-clip-text text-lg font-bold tracking-tight text-transparent">
              LCI WebStudio
            </span>
            <span className="hidden xs:inline-block ml-1 text-9px px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium border border-indigo-100">
              AI Powered
            </span>
          </div>
        </div>

        {/* Navigation Scroll Links */}
        <nav className="hidden md:flex items-center space-x-1">
          <button 
            id="nav-intro"
            onClick={() => scrollToId('intro-section')}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            소개
          </button>
          <button 
            id="nav-portfolio"
            onClick={() => scrollToId('portfolio-section')}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            포트폴리오
          </button>
          <button 
            id="nav-pricing"
            onClick={() => scrollToId('pricing-section')}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            가격 정책
          </button>
          <button 
            id="nav-process"
            onClick={() => scrollToId('process-section')}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            제작과정
          </button>
          <button 
            id="nav-reviews"
            onClick={() => scrollToId('reviews-section')}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            후기
          </button>
          <button 
            id="nav-inquiry"
            onClick={() => scrollToId('inquiry-section')}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            문의
          </button>
          
          {/* Real-time visual sandbox editor */}
          <button 
            id="nav-editor"
            onClick={() => onNavigate('editor')}
            className={`rounded-xl px-3.5 py-2 text-xs font-black transition-all flex items-center space-x-1 border cursor-pointer ${
              currentView === 'editor'
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-extrabold shadow-sm'
                : 'bg-indigo-50/20 hover:bg-indigo-50 border-dashed border-indigo-200 text-indigo-600 hover:text-indigo-800'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
            <span>실시간 시안 편집기</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          </button>
        </nav>

        {/* Auth Actions Group */}
        <div className="flex items-center space-x-2 sm:space-x-3.5">
          {currentUser ? (
            <>
              {/* If Admin */}
              {currentUser.isAdmin ? (
                <button
                  id="navbar-admin-btn"
                  onClick={() => onNavigate('admin')}
                  className={`flex items-center space-x-1 text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all ${
                    currentView === 'admin' 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : 'bg-gray-950 text-white hover:bg-gray-900 shadow-sm border border-gray-950'
                  }`}
                >
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>관리자 패널</span>
                  <span className="hidden xs:inline-block h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                </button>
              ) : (
                /* If Registered Client */
                <button
                  id="navbar-mypage-btn"
                  onClick={() => onNavigate('mypage')}
                  className={`flex items-center space-x-1.5 text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border transition-all ${
                    currentView === 'mypage'
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <UserIcon className="h-4 w-4 text-gray-400" />
                  <span>마이페이지</span>
                </button>
              )}

              {/* Common log-out and hello notification for desktop */}
              <div id="user-info-text" className="hidden lg:flex flex-col text-right">
                <span className="text-xs font-semibold text-gray-800">{currentUser.name} 님</span>
                <span className="text-9px text-gray-400 font-mono truncate max-w-[120px]">{currentUser.email}</span>
              </div>

              <button
                id="navbar-logout-btn"
                onClick={onLogoutClick}
                title="로그아웃"
                className="flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </>
          ) : (
            <>
              {/* If Unauthenticated Guest */}
              <button
                id="navbar-login-btn"
                onClick={onLoginClick}
                className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 px-3 py-1.5 sm:px-4.5 sm:py-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                로그인
              </button>
              <button
                id="navbar-request-btn"
                onClick={() => onNavigate('request')}
                className="relative text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-3 py-1.5 sm:px-4.5 sm:py-2 rounded-xl shadow-md hover:shadow-lg hover:shadow-indigo-100 transition-all cursor-pointer"
              >
                제작 신청
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
