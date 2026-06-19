import React from 'react';
import { Send, PhoneCall, Code, Sparkles, Orbit, Rocket } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: '제작 신청 (AI 기획)',
      desc: '신청서 양식을 작성 완료하면, LCI의 스마트 AI 모델이 귀사 목적에 적합한 가도 시안 및 섹션 구성 기획서를 즉시 설계(1분 이내)합니다.',
      icon: <Send className="h-5 w-5" />,
      colorClass: 'bg-blue-50 text-blue-600 border-blue-100',
      lineClass: 'border-blue-500'
    },
    {
      num: '02',
      title: '1:1 정밀 유선 상담',
      desc: '기록된 명세 및 참고 사이트를 기조로 전문 총괄 디자이너가 1대1 통화하여 색감, 무드, 필요 기능을 10분 내외로 속 시원하게 확정합니다.',
      icon: <PhoneCall className="h-5 w-5" />,
      colorClass: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      lineClass: 'border-indigo-500'
    },
    {
      num: '03',
      title: '디자인 및 1차 코딩',
      desc: 'Vite 6 최신 기술 템플릿과 Tailwind v4 특유의 고감도 레이아웃 코드로 3일의 약속 기간 동안 집중 공정 돌입하여 시범 도메인에 조기 가동합니다.',
      icon: <Code className="h-5 w-5" />,
      colorClass: 'bg-purple-50 text-purple-600 border-purple-100',
      lineClass: 'border-purple-500'
    },
    {
      num: '04',
      title: '정밀 피드백 & 수정',
      desc: '고객님 마이페이지에서 완성 과정을 눈으로 주시하며 배치, 문안, 링크 교체를 피드백합니다. 신속하게 의견을 밀착 반영하여 개정합니다.',
      icon: <Sparkles className="h-5 w-5" />,
      colorClass: 'bg-pink-50 text-pink-600 border-pink-100',
      lineClass: 'border-pink-500'
    },
    {
      num: '05',
      title: '정식 도메인 배포',
      desc: '보안 최적 접속망(SSL) 및 모바일 반응형 검수를 최종 필터링한 후, 단독 도메인을 탑재하여 전 세계 인터넷 망에 영구 배포 완료합니다!',
      icon: <Rocket className="h-5 w-5" />,
      colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      lineClass: 'border-emerald-500'
    }
  ];

  return (
    <section id="process-section" className="scroll-mt-12 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3.5 mb-16 md:mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Speedy Steps
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            투명하고 체계적인 5단계 제작 과정
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
            복잡한 대행사의 가림막 계약은 거절합니다. 기획안 작성부터 도메인 무료 배포까지 신속 명백하게 이루어지는 프로세스입니다.
          </p>
        </div>

        {/* Timeline Path Representation */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Center Line Decoration */}
          <div className="absolute left-6.5 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-emerald-200 -translate-x-1/2 hidden sm:block" />
          <div className="absolute left-6.5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-emerald-200 sm:hidden" />

          {/* Steps List */}
          <div className="space-y-12 sm:space-y-16">
            {steps.map((st, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={st.num}
                  id={`process-step-${st.num}`}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-12 w-full ${isEven ? 'sm:flex-row-reverse' : ''}`}
                >
                  {/* Step Visual Bubble Indicator */}
                  <div className="absolute left-6.5 sm:left-1/2 rounded-full border-4 border-white bg-white shadow-md z-10 -translate-x-1/2 p-1">
                    <div className={`p-2.5 rounded-full border shrink-0 ${st.colorClass}`}>
                      {st.icon}
                    </div>
                  </div>

                  {/* Left half placeholder */}
                  <div className="hidden sm:block w-1/2" />

                  {/* Right half/Content block */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-6">
                    <div className="p-6 rounded-2xl bg-gray-50/60 border border-gray-100 hover:border-indigo-100/60 shadow-sm transition-all text-left">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-indigo-600 tracking-wider">
                          STEP {st.num}
                        </span>
                        <span className="h-5 w-5 rounded-full bg-indigo-50/60 text-indigo-700 text-9px font-bold flex items-center justify-center border border-indigo-100">
                          ✔
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                        {st.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-semibold">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
