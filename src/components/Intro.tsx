import React, { useState } from 'react';
import { Layers, Calendar, Briefcase, CalendarCheck, Check, Sparkles, X } from 'lucide-react';

interface WebsiteTypeCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  icon: React.ReactNode;
  colorClass: string;
  features: string[];
  recommendedFor: string[];
}

export default function Intro() {
  const [selectedCard, setSelectedCard] = useState<WebsiteTypeCard | null>(null);

  const cards: WebsiteTypeCard[] = [
    {
      id: 'corp',
      title: '기업/브랜드 홈페이지',
      subtitle: 'Corporate Website',
      description: '회사의 가치를 증명하는 미니멀하고 고급스러운 비즈니스용 다중 페이지 웹사이트.',
      detailedDescription: '정돈된 그리드와 여백 디자인을 활용해 비즈니스의 신뢰도와 아이덴티티를 극대화합니다. 회사 소식, 실시간 견적 접수 기능, 구글 샌드박스 메일 최적화 연동, 관리형 공지 게시판 설계까지 함께 탑재되어 있습니다.',
      icon: <Layers className="h-6 w-6" />,
      colorClass: 'from-blue-500 to-indigo-600',
      features: ['회사 비전 소개 패널', '상단 다중 드롭다운 메뉴', '실시간 이메일 문의폼', 'SEO 검색 포털 자동 등록'],
      recommendedFor: ['소기업 및 개인 법인', '스타트업', '전문직(세무/노무 등) 자문사']
    },
    {
      id: 'event',
      title: '행사/축제 홈페이지',
      subtitle: 'Festival & Event Page',
      description: '참가자 접수와 일정을 완벽히 홍보하는 고감도 페스티벌 전용 원페이지 랜딩.',
      detailedDescription: '짧은 기간 동안 최고의 시각 효과로 신청을 유치해야 하는 행사의 특성에 맞추어, 화려한 오프닝 페이드 효과 및 실시간 D-Day 카운트다운을 기본 구성합니다. 참가 접수 후 카카오톡 친구 연동 링크까지 유연하게 기획합니다.',
      icon: <Calendar className="h-6 w-6" />,
      colorClass: 'from-amber-500 to-red-500',
      features: ['실시간 디데이 카운팅 토그', '행사 연혁 & 연사 세션 타임테이블', '온라인 참가 신청 접수 폼', '오시는 길 로컬 맵 연동'],
      recommendedFor: ['대학 및 연합 동아리 축제', '박람회, 컨퍼런스, 포럼', '원데이 워크숍 및 세미나']
    },
    {
      id: 'port',
      title: '개인 포트폴리오 사이트',
      subtitle: 'Personal Portfolio',
      description: '나만의 개성과 이력을 강렬하게 아카이빙하는 크리에이터/개발자 전용 쇼케이스.',
      detailedDescription: '글자 지독도와 작품을 한눈에 감상하는 그리드 레이아웃을 통해 채용 및 외주 의뢰 확률을 극대화합니다. 모바일에서 터치하기 편한 이력서 다운로드 버튼 및 SNS 연계 리액션을 내장하여 제작합니다.',
      icon: <Briefcase className="h-6 w-6" />,
      colorClass: 'from-purple-500 to-pink-600',
      features: ['초고해상도 다이내믹 작품 그리드', '인게이지 타임라인 이력 패널', '노션(Notion) 이력서 간편 임베딩', '다운로드 가능한 PDF 이력 카드'],
      recommendedFor: ['디자이너, 개발자, 아티스트', '취업 준비생 및 이직 후보자', '프리랜서 크리에이터']
    },
    {
      id: 'book',
      title: '예약 및 커뮤니티 사이트',
      subtitle: 'Smart Reservation Platform',
      description: '실시간 예약 달력과 이용자 커뮤니티 소통망을 탑재한 반응형 풀셋 플랫폼.',
      detailedDescription: '카페 좌석 예약, 공간 대여, 소셜 모임 및 원데이 클래스를 수용할 수 있는 고기능 웹사이트입니다. 관리자의 스마트폰 알림 유도 연동, 리뷰 빌더, 유선 조율을 줄이는 달력식 예약 엔진이 포함됩니다.',
      icon: <CalendarCheck className="h-6 w-6" />,
      colorClass: 'from-emerald-500 to-teal-600',
      features: ['달력 기반 예약 플래너', '메뉴 및 서비스 슬라이더', '사용자 리얼 리뷰 피드백 시스템', '카카오 비즈톡 관리 알림 수신'],
      recommendedFor: ['쿠킹, 요가 등 원데이 클래스', '스터디 카페 및 공간 대여', '이색 카페 및 베이커리']
    }
  ];

  return (
    <section id="intro-section" className="scroll-mt-12 bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Headers */}
        <div className="text-center space-y-3.5 mb-14 md:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Tailored Types
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            당신의 사업 분야에 딱 맞추어 제작합니다
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            어떤 업종이든 상관없습니다. LCI WebStudio가 선사하는 4종의 최적화 레이아웃으로, 업계 평균 40% 이상 유입 집중 효과를 만들어 냅니다.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.id}
              id={`intro-card-${card.id}`}
              onClick={() => setSelectedCard(card)}
              className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-gray-100/70 hover:shadow-xl hover:border-indigo-100 cursor-pointer transition-all hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Icon Container with gradient boundary */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-tr ${card.colorClass} text-white shadow-md shadow-indigo-100`}>
                  {card.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="font-mono text-11px text-gray-400 uppercase font-semibold">
                    {card.subtitle}
                  </p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  {card.description}
                </p>
              </div>

              {/* Action Trigger Link */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                <span>자세히 보기</span>
                <span className="text-sm font-semibold transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal Popup Drawer */}
        {selectedCard && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header Box */}
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${selectedCard.colorClass} text-white`}>
                  {selectedCard.icon}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900">{selectedCard.title}</h3>
                  <p className="text-xs font-mono text-gray-400 font-semibold">{selectedCard.subtitle}</p>
                </div>
              </div>

              {/* Detailed Contexts */}
              <div className="mt-5 space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">🔍 제작 컨셉 설명</h4>
                  <p>{selectedCard.detailedDescription}</p>
                </div>

                {/* Core built-in functions list */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">⭐ 수록 핵심 주요 기능</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedCard.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-1.5 bg-gray-50 px-2.5 py-1.5 rounded border border-gray-100">
                        <Check className="h-4 w-4 text-indigo-500 shrink-0" />
                        <span className="font-medium text-gray-700">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations target */}
                <div className="pt-2">
                  <h4 className="font-semibold text-gray-900 mb-1.5">💡 이런 고객님께 강력 추천해 드립니다!</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCard.recommendedFor.map((rec, idx) => (
                      <span key={idx} className="bg-indigo-50 text-indigo-700 font-semibold text-xs px-2.5 py-1 rounded border border-indigo-100">
                        # {rec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Confirm Bottom Action */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="px-5 py-2 rounded-xl bg-gray-950 hover:bg-gray-900 text-xs text-white font-bold transition-all"
                >
                  확인 완료
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
