import React from 'react';
import { Check, Info, BadgeAlert, Sparkles } from 'lucide-react';

interface PricingProps {
  onSelectTier: (tier: 'BASIC' | 'STANDARD' | 'PREMIUM') => void;
}

export default function Pricing({ onSelectTier }: PricingProps) {
  const tiers = [
    {
      id: 'BASIC',
      name: 'BASIC',
      price: '10만원',
      subtitle: '단기 홍보 및 모바일 명함용',
      pages: '1 페이지 (원페이지 랜딩)',
      features: [
        '모바일 최적화 최상급 반응형 설계',
        '맞춤형 1:1 카카오톡 채널 상담',
        '수정 횟수 총 2회 무상 지원',
        '네이버/구글 검색엔진 최적화 등록',
        '초고속 경량 코드 경량화 세팅',
      ],
      notIncluded: [
        '다중 페이지 구성',
        '소셜 회원가입 & DB 통합 구동',
        '개성 커스텀 도메인 매핑 세팅',
      ],
      colorClass: 'border-gray-200 hover:border-indigo-200',
      tagClass: 'bg-gray-100 text-gray-700',
      btnClass: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
    },
    {
      id: 'STANDARD',
      name: 'STANDARD',
      price: '20만원',
      subtitle: '비즈니스 실속형 추천 요금',
      pages: '3 ~ 5 페이지 내외 구성',
      features: [
        '기본 베이직 혜택 전체 포함',
        '회사소개 + 서비스소개 + 소통 게시판',
        '게시판 및 이미지 갤러리 등록 툴 연계',
        '수정 횟수 총 4회 무상 혜택',
        '관리자를 위한 커스텀 정식 대시보드',
        '커스텀 로고 일러스트 디자인 지원'
      ],
      notIncluded: [
        '소셜 회원가입 & 자체 마이페이지',
      ],
      popular: true,
      colorClass: 'border-indigo-500 ring-2 ring-indigo-500 bg-indigo-50/5/10',
      tagClass: 'bg-indigo-600 text-white',
      btnClass: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-indigo-100'
    },
    {
      id: 'PREMIUM',
      name: 'PREMIUM',
      price: '30만원 +',
      subtitle: '커뮤니티 및 고도화 엔터프라이즈',
      pages: '제한 없음 (동적 라우팅 지원)',
      features: [
        '스탠다드 전반 구성 및 혜택 완벽 상속',
        'Google, Kakao 간편 로그인 시스템 탑재',
        '고객 진행상황 실시간 마이페이지 통합',
        '예약, 매칭, 결제 샌드박스 라이브 지원',
        '스토리 및 공지사항 무한정 기획 연출',
        '무상 수리 및 수정 보증 1개월 혜택',
        '평생 무료 SSL 보안 인증서 등록 매핑'
      ],
      notIncluded: [],
      colorClass: 'border-purple-200 hover:border-purple-300',
      tagClass: 'bg-purple-100 text-purple-800',
      btnClass: 'bg-gray-950 text-white hover:bg-gray-900 shadow-lg'
    }
  ];

  return (
    <section id="pricing-section" className="scroll-mt-12 bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center space-y-3.5 mb-14 md:mb-18">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Fair Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            합리적이고 투명한 제작 가격
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
            거품은 빼고 완성도는 높였습니다. 도메인 및 호스팅 세팅 비용 무료 혜택까지 포함된 LCI만의 심플한 3종 가격 정책입니다.
          </p>
        </div>

        {/* Pricing Grids */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              id={`pricing-tier-${tier.id}`}
              className={`relative rounded-3xl border p-8 bg-white flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl ${tier.colorClass}`}
            >
              {/* Popular Badge indicator on Standard tier */}
              {tier.popular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 text-xs font-extrabold text-white flex items-center gap-1 shadow-md">
                  <Sparkles className="h-3.5 w-3.5 animate-bounce" />
                  <span>가장 많이 찾는 요금제</span>
                </div>
              )}

              {/* Tier Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold px-3 py-1.5 rounded-lg tracking-wider ${tier.tagClass}`}>
                    {tier.name}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 font-mono italic">
                    {tier.pages}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-3xl font-black text-gray-950 tracking-tight">{tier.price}</p>
                  <p className="text-xs text-gray-400 font-semibold">{tier.subtitle}</p>
                </div>

                <div className="h-1px w-full bg-gray-100 my-4" />

                {/* Features List */}
                <div className="space-y-3.5 text-xs sm:text-sm">
                  <p className="font-extrabold text-gray-800 text-xs">포함 핵심 서포트</p>
                  <ul className="space-y-2.5">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="h-4.5 w-4.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span className="text-gray-500 font-semibold leading-normal">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Exclusions items representing transparency */}
                  {tier.notIncluded.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-dashed border-gray-100">
                      <p className="font-extrabold text-gray-400 text-[10px]">미지원 기능 사양</p>
                      <ul className="space-y-1">
                        {tier.notIncluded.map((not, idx) => (
                          <li key={idx} className="flex items-start space-x-2 opacity-50">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-300 mt-1.5 ml-1 shrink-0"></span>
                            <span className="text-gray-400 font-semibold text-[11px] leading-tight">{not}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Call to action direct triggers */}
              <div className="mt-8 pt-4 border-t border-gray-50">
                <button
                  id={`pricing-submit-btn-${tier.id}`}
                  onClick={() => onSelectTier(tier.id as any)}
                  className={`w-full py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-tight transition-all cursor-pointer ${tier.btnClass}`}
                >
                  {tier.name} 요금으로 신청하기
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Pricing Note */}
        <div className="mt-12 text-center max-w-xl mx-auto rounded-2xl bg-indigo-50/40 border border-indigo-100/60 p-4.5 flex gap-3 text-left">
          <Info className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
          <p className="text-xs text-indigo-950 font-semibold leading-relaxed">
            * 모든 요금제는 기획안 및 콘텐츠가 준비된 경우 3일 내 제작을 보장합니다. 로그인 연동이 필요한 <span className="text-purple-600 underline">PREMIUM</span> 요금의 경우 클라이언트와의 유선 소통 마일스톤에 따라 2~3일의 추가 조율이 발생할 수 있습니다.
          </p>
        </div>

      </div>
    </section>
  );
}
