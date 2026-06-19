import React, { useState } from 'react';
import { X, ShieldAlert, Cpu, Sparkles, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (email: string, name: string) => void;
}

export default function LoginModal({ onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState('');

  const runGoogleSimulation = (selectedEmail: string, selectedName: string) => {
    if (!selectedEmail) {
      setError('이메일을 입력해 주시기 바랍니다.');
      return;
    }
    const currentMail = selectedEmail.trim();
    const currentName = selectedName.trim() || currentMail.split('@')[0];

    setError('');
    setLoading(true);

    const steps = [
      '구글 보안 인증 서버에 안전 연결 중...',
      'OAuth 구글 토큰 수신 및 대조 연동 중...',
      '스마트 계약 데이터 데이터베이스 맵 생성 중...',
      '인증 승인 완료! 어시스턴트 로딩 돌입...'
    ];

    let currentStepIdx = 0;
    setLoadingStep(steps[currentStepIdx]);

    const interval = setInterval(() => {
      currentStepIdx++;
      if (currentStepIdx < steps.length) {
        setLoadingStep(steps[currentStepIdx]);
      } else {
        clearInterval(interval);
        setLoading(false);
        onLoginSuccess(currentMail, currentName);
        onClose();
      }
    }, 450);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runGoogleSimulation(email, name);
  };

  const handleQuickAdmin = () => {
    runGoogleSimulation('admin@studio.com', '스튜디오 관리자');
  };

  const handleQuickUser = () => {
    runGoogleSimulation('25jeongsonglee@dgmeister.hs.kr', '정송이');
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-gray-100 flex flex-col justify-between">
        
        {/* Close trigger button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-5 right-5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {loading ? (
          /* Loading Animation State */
          <div className="py-12 flex flex-col items-center justify-center space-y-6 text-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
              <Cpu className="absolute inset-4 h-8 w-8 text-indigo-600 animate-pulse" />
            </div>
            <div className="space-y-1.5 px-4">
              <p className="text-sm font-bold text-gray-900">간편 Google 로그인이 안전하게 진행 중입니다</p>
              <p className="text-11px text-indigo-600 font-mono font-semibold animate-pulse">{loadingStep}</p>
            </div>
          </div>
        ) : (
          /* Active Interactive Input Form State */
          <div className="space-y-6">
            
            {/* Header Identity */}
            <div className="space-y-1 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-150 mb-3">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-gray-950 tracking-tight">수월한 간편 Google 로그인</h3>
              <p className="text-xs text-gray-400 font-medium">따로 가입할 필요 없이 가지고 계신 메일로 즉시 예약 명세 추적</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-xl border border-red-150 text-xs font-semibold flex gap-2 items-center">
                <AlertCircle className="h-4.5 w-4.5 text-red-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Direct Input Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-800">이메일 주소 <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-medium text-gray-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-800">고객명 (선택)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="성함 또는 기업/동아리명을 입력하세요"
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-medium text-gray-800"
                />
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm tracking-tight shadow-md hover:shadow-lg transition cursor-pointer"
              >
                Google 계정으로 로그인
              </button>
            </form>

            {/* Quick Demo Test Accounts - Extremely smart developer touch */}
            <div className="pt-4 border-t border-gray-100 space-y-2.5">
              <p className="text-[10px] sm:text-xs font-bold text-gray-400 text-center uppercase tracking-wider">
                💡 빠른 체험 계정 (롤 선택 로그인)
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* 1. Normal Tester user */}
                <button
                  type="button"
                  id="login-quick-client-btn"
                  onClick={handleQuickUser}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-indigo-100/40 hover:border-indigo-200 hover:bg-indigo-50/20 text-indigo-700 transition"
                >
                  <span className="font-extrabold text-xs">일반 고객 로그인</span>
                  <span className="text-[9px] text-gray-400 font-mono mt-0.5">정송이 (25jeong...)</span>
                </button>

                {/* 2. Admin manager account */}
                <button
                  type="button"
                  id="login-quick-admin-btn"
                  onClick={handleQuickAdmin}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-red-100/40 hover:border-red-200 hover:bg-red-50/20 text-red-700 transition"
                >
                  <span className="font-extrabold text-xs">관리자 로그인</span>
                  <span className="text-[9px] text-gray-400 font-mono mt-0.5">admin@studio.com</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
