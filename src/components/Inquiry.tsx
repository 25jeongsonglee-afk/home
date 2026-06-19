import React from 'react';
import { MessageSquare, Instagram, Mail, ChevronRight, Check } from 'lucide-react';

export default function Inquiry() {
  const contactMethods = [
    {
      id: 'kakao',
      name: '카카오톡 1:1 간편인입',
      sub: '@lci_studio',
      desc: '실시간 상담원과 직접 대화하여 5분 내 견적 피드백 수집 및 제작 일차 협의.',
      icon: <MessageSquare className="h-6 w-6 text-yellow-950" />,
      colorClass: 'bg-[#FEE500] hover:bg-[#FEE500]/95 text-yellow-950 border-[#F0D800]',
      link: 'https://pf.kakao.com'
    },
    {
      id: 'insta',
      name: '인스타그램 디엠 수집',
      sub: '@lci.webstudio',
      desc: '우리가 연계한 실제 SNS 카드들을 탐색하고 다이렉트 메시지로 비정형 질의 접수.',
      icon: <Instagram className="h-6 w-6 text-white" />,
      colorClass: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-95 text-white border-none shadow-sm',
      link: 'https://instagram.com'
    },
    {
      id: 'mail',
      name: '공식 비즈니스 메일 송출',
      sub: 'support@lci-studio.com',
      desc: '대형 법인 기획 명세서 공문 및 세금계산서, 정기 자문 조율서의 공식 서면 전달.',
      icon: <Mail className="h-6 w-6 text-white" />,
      colorClass: 'bg-gray-900 hover:bg-gray-800 text-white border-gray-950 shadow-sm',
      link: 'mailto:support@lci-studio.com'
    }
  ];

  return (
    <section id="inquiry-section" className="scroll-mt-12 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3.5 mb-14 md:mb-18">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            궁금한 점이 있다면 언제든 문의하세요
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
            상담 비용은 0원입니다. 아직 기획서가 구체화되지 않았어도, 가가호호 비즈니스 방향만 알려주시면 무상으로 설계 방향을 제시합니다.
          </p>
        </div>

        {/* Contact Grid Card List */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-6xl mx-auto">
          {contactMethods.map((met) => (
            <a
              key={met.id}
              href={met.link}
              target="_blank"
              rel="noopener noreferrer"
              id={`inquiry-btn-${met.id}`}
              className={`group flex flex-col justify-between rounded-3xl p-6.5 border text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${met.colorClass}`}
            >
              <div className="space-y-4">
                {/* Brand icon container */}
                <div className="inline-flex p-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/10 shadow-sm">
                  {met.icon}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold tracking-tight">{met.name}</h3>
                  <p className="font-mono text-xs font-semibold opacity-80">{met.sub}</p>
                </div>

                <p className="text-xs leading-relaxed opacity-90 font-medium">
                  {met.desc}
                </p>
              </div>

              {/* Action bar indicators */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold">
                <span>즉시 연결하여 대화하기</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>

        {/* Brand FAQ footer bar */}
        <div className="mt-16 rounded-3xl border border-gray-150 p-6 sm:p-8 max-w-4xl mx-auto bg-gray-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-left">
          <div className="space-y-1.5 max-w-xl">
            <h4 className="text-sm font-extrabold text-gray-900">💡 자주 묻는 질문: 카드 결제 및 할부가 가능한가요?</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-semibold">
              네, 정식 안전 샌드박스를 연동한 KG이니시스 간편 기프트 카드 결제가 전액 지원됩니다. 원하시는 경우 현금영수증 및 정식 세금계산서 공급 발행 역시 지체 없이 무료 배출해 드립니다.
            </p>
          </div>
          <div className="flex items-center space-x-1.5 bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold text-gray-700 shrink-0 shadow-sm">
            <Check className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>부가세 별도 영세율 발행 완료</span>
          </div>
        </div>

      </div>
    </section>
  );
}
