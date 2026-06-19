import React, { useState } from 'react';
import { Project, User, AIProposal } from '../types';
import { 
  Briefcase, CheckCircle2, Clock, RotateCcw, Sparkles, Download, 
  ExternalLink, Palette, FileText, Smartphone, LayoutGrid, Zap, HelpCircle, X
} from 'lucide-react';

interface MyPageProps {
  currentUser: User | null;
  projects: Project[];
  onNavigate: (view: 'home' | 'mypage' | 'admin' | 'request' | 'editor') => void;
  onSelectProjectForPreview?: (project: Project) => void;
}

export default function MyPage({ currentUser, projects, onNavigate, onSelectProjectForPreview }: MyPageProps) {
  const [activeProposal, setActiveProposal] = useState<AIProposal | null>(null);
  const [activeProposalTitle, setActiveProposalTitle] = useState('');
  const [generatingForProjectId, setGeneratingForProjectId] = useState<string | null>(null);
  const [invoiceProject, setInvoiceProject] = useState<Project | null>(null);

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center space-y-6">
        <HelpCircle className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="text-xl font-bold text-gray-900">로그인이 필요한 페이지입니다</h3>
        <p className="text-sm text-gray-500">우물쭈물하실 것 없이 상단 로그인 카드를 눌러 3초 만에 연결하세요.</p>
      </div>
    );
  }

  // Filter projects owned by the currently logged-in user
  const userProjects = projects.filter(p => p.clientEmail === currentUser.email);

  // Status mapping to color keys
  const statusConfig = {
    '상담대기': { color: 'bg-amber-50 text-amber-700 border-amber-150', icon: <Clock className="h-4 w-4" />, progress: 15 },
    '제작중': { color: 'bg-blue-50 text-blue-700 border-blue-150', icon: <Briefcase className="h-4 w-4" />, progress: 50 },
    '수정중': { color: 'bg-purple-50 text-purple-700 border-purple-150', icon: <RotateCcw className="h-4 w-4" />, progress: 75 },
    '완료': { color: 'bg-emerald-50 text-emerald-700 border-emerald-150', icon: <CheckCircle2 className="h-4 w-4" />, progress: 100 }
  };

  const statusList: Project['status'][] = ['상담대기', '제작중', '수정중', '완료'];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      
      {/* Client Headline block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="text-left space-y-1">
          <div className="inline-flex items-center space-x-1 text-xs text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 font-bold">
            <Zap className="h-3 w-3 animate-pulse" />
            <span>VIP Client Dashboard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
            {currentUser.name} 님의 프로젝트
          </h2>
          <p className="text-gray-400 font-mono text-11px font-semibold italic">{currentUser.email}</p>
        </div>

        <button
          onClick={() => onNavigate('request')}
          className="rounded-xl bg-gray-950 hover:bg-gray-900 border border-gray-950 px-5 py-3 text-xs font-bold text-white shadow-xl flex items-center justify-center space-x-2"
        >
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>새 홈페이지 제작 의뢰하기</span>
        </button>
      </div>

      {userProjects.length === 0 ? (
        /* Empty project states */
        <div className="rounded-3xl border border-dashed border-gray-150 p-12 text-center space-y-4 max-w-lg mx-auto bg-gray-50/50">
          <span className="text-4xl">🪴</span>
          <div className="space-y-1">
            <p className="text-base font-bold text-gray-800">아직 접수된 제작 신청서가 없습니다</p>
            <p className="text-xs text-gray-400 font-medium">LCI WebStudio와 함께 3일 만에 멋진 브랜드 사이트를 지어올릴 준비를 해 보아요.</p>
          </div>
          <button
            onClick={() => onNavigate('request')}
            className="inline-flex items-center space-x-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4.5 py-2.5 shadow-sm"
          >
            <span>첫 홈페이지 작성 양식 열기</span>
          </button>
        </div>
      ) : (
        /* Active Projects List rendering */
        <div className="space-y-8">
          {userProjects.map((p) => {
            const cfg = statusConfig[p.status] || statusConfig['상담대기'];
            return (
              <div
                key={p.id}
                className="rounded-3xl border border-gray-150/80 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-left hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* Project identification header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-10px font-extrabold text-indigo-600 uppercase font-mono tracking-wider">
                      PROJECT ID: {p.id}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">
                      {p.projectName}
                    </h3>
                  </div>

                  {/* Actions bar for estimates and PDF invoices */}
                  <div className="flex flex-wrap items-center gap-2">
                    {p.aiProposal ? (
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            setActiveProposal(p.aiProposal!);
                            setActiveProposalTitle(p.projectName);
                          }}
                          className="inline-flex items-center space-x-1.5 rounded-xl bg-emerald-50 text-emerald-700 px-4 py-2 text-xs font-bold border border-emerald-200 transition-colors hover:bg-emerald-100"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>AI 기획서 조회</span>
                        </button>
                        <button
                          onClick={() => {
                            if (onSelectProjectForPreview) {
                              onSelectProjectForPreview(p);
                            }
                            onNavigate('editor');
                          }}
                          className="inline-flex items-center space-x-1.5 rounded-xl bg-indigo-50 text-indigo-700 px-4 py-2 text-xs font-bold border border-indigo-200 transition-colors hover:bg-indigo-100"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                          <span>실시간 시안 편집</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (onSelectProjectForPreview) {
                              onSelectProjectForPreview(p);
                            }
                            onNavigate('editor');
                          }}
                          className="inline-flex items-center space-x-1.5 rounded-xl bg-indigo-50 text-indigo-700 px-4 py-2 text-xs font-bold border border-indigo-200 transition-colors hover:bg-indigo-100"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                          <span>실시간 시안 편집</span>
                        </button>
                        <span className="text-xs text-gray-400 font-medium italic select-none">AI 제안 준비중</span>
                      </div>
                    )}

                    <button
                      onClick={() => setInvoiceProject(p)}
                      className="inline-flex items-center space-x-1 rounded-xl bg-gray-50 text-gray-700 px-4 py-2 text-xs font-bold border border-gray-200 hover:bg-gray-100 transition"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>견적서 확인</span>
                    </button>
                  </div>
                </div>

                {/* Grid summarizing client specific requests */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 bg-gray-50/60 p-4 rounded-2xl border border-gray-100 text-xs text-left">
                  <div className="space-y-0.5">
                    <p className="text-gray-400 font-bold">홈페이지 종류</p>
                    <p className="font-extrabold text-gray-800">{p.specs.type}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-gray-400 font-bold">원하는 가브랜드 컬러</p>
                    <p className="font-extrabold text-gray-800">{p.specs.colorScheme}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-gray-400 font-bold">의뢰 단가 및 기금</p>
                    <p className="font-extrabold text-gray-800">{p.price.toLocaleString()} 원</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-gray-400 font-bold">신청일</p>
                    <p className="font-extrabold text-gray-800 font-mono">{p.requestDate}</p>
                  </div>
                </div>

                {/* Progress Visual Tracker - Milestone timeline */}
                <div className="space-y-5 pt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center text-gray-400 font-semibold">
                      공정 단계 진행 상태: 
                      <span className={`ml-2 inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cfg.color}`}>
                        {cfg.icon}
                        <span>{p.status}</span>
                      </span>
                    </span>
                    <span className="font-mono text-xs font-bold text-indigo-600">{cfg.progress}% Completed</span>
                  </div>

                  {/* Horizontal progress bar container */}
                  <div className="relative">
                    <div className="h-2 w-full rounded-full bg-gray-150 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out" style={{ width: `${cfg.progress}%` }}></div>
                    </div>

                    {/* Nodes represent different steps on timeline */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between select-none pointer-events-none px-1">
                      {statusList.map((step, idx) => {
                        const stepConfig = statusConfig[step];
                        const checked = statusList.indexOf(p.status) >= idx;
                        return (
                          <div 
                            key={step} 
                            className={`h-4.5 w-4.5 rounded-full border-2 bg-white flex items-center justify-center transition ${
                              checked ? 'border-indigo-600' : 'border-gray-200'
                            }`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${checked ? 'bg-indigo-600' : 'bg-gray-200'}`}></span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Nodes text legend */}
                  <div className="flex justify-between text-[11px] font-extrabold text-gray-400 px-0.5 select-none font-sans">
                    <span>원격 접수</span>
                    <span>상담 확정</span>
                    <span>1차 코딩</span>
                    <span>최종 배포</span>
                  </div>
                </div>

                {/* Dynamic warning states inside project card block */}
                {p.status === '상담대기' && (
                  <div className="bg-amber-50/60 p-4.5 rounded-2xl border border-amber-100 flex gap-2.5 text-xs text-amber-900 leading-normal">
                    <Clock className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '4s' }} />
                    <p className="font-semibold">
                      * 현재 1:1 디자이너 검수 중입니다. 등록하신 연락처 (<strong>{p.clientPhone || '정보 없음'}</strong>)로 곧 담당자 대면 유선 컨택을 드립니다. 잠시만 기다려 주시기 바랍니다!
                    </p>
                  </div>
                )}

                {p.status === '제작중' && (
                  <div className="bg-blue-50/60 p-4.5 rounded-2xl border border-blue-100 flex gap-2.5 text-xs text-blue-900 leading-normal">
                    <Briefcase className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
                    <p className="font-semibold">
                      * 제작 작업이 집중 공정에 착수했습니다. Vite 6와 Tailwind v4 기반의 프리미엄 맞춤형 프로그래밍 코이닝이 지워지는 중이며, 완성 시 수정 요청 검토란이 활성화됩니다.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Estimations PDF-like modal simulator */}
      {invoiceProject && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-150 flex flex-col justify-between max-h-[95vh] overflow-y-auto">
            
            {/* Close trigger button */}
            <button
              onClick={() => setInvoiceProject(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-gray-400 hover:text-gray-650 hover:bg-gray-50 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Print Layout structure */}
            <div className="space-y-6 text-left">
              {/* Header Box */}
              <div className="flex justify-between items-start pb-4 border-b">
                <div>
                  <h3 className="text-lg font-black tracking-tight text-gray-950">공식 홈페이지 주문 견적서</h3>
                  <p className="text-[10px] text-gray-400 font-mono font-semibold">INVOICE NO: INV-LCI-{invoiceProject.id.toUpperCase()}</p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-bold text-indigo-600">LCI WebStudio</p>
                  <p className="text-[10px] text-gray-450">서울 강남구 테헤란로 152</p>
                </div>
              </div>

              {/* Stakeholders summary */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <p className="font-bold text-gray-400">의뢰사 정보 (클라이언트)</p>
                  <p className="font-extrabold text-gray-900">{invoiceProject.clientName}</p>
                  <p className="text-gray-500">{invoiceProject.clientPhone}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="font-bold text-gray-400">공급사 정보 (수임인)</p>
                  <p className="font-extrabold text-gray-900">엘씨아이 웹스튜디오</p>
                  <p className="text-gray-500">사업자: 312-85-45120</p>
                </div>
              </div>

              {/* Invoice lines and prices table */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-405">명세 조율 품목 내역</p>
                <div className="border rounded-xl overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-gray-50 font-bold border-b text-gray-500">
                      <tr>
                        <th className="p-3">서비스 내역</th>
                        <th className="p-3 text-right">단가</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y font-medium text-gray-700">
                      <tr>
                        <td className="p-3">
                          <p className="font-bold text-gray-900">{invoiceProject.specs.type} 홈페이지 제작 플랜</p>
                          <p className="text-10px text-gray-400">모바일 반응형 완벽 디자인 및 레이아웃 설계 공정 포함</p>
                        </td>
                        <td className="p-3 text-right font-mono font-bold">{(invoiceProject.price * 0.9).toLocaleString()} 원</td>
                      </tr>
                      <tr>
                        <td className="p-3">
                          <p className="font-bold text-gray-900">도메인 등록 대행 및 호스팅 패키지</p>
                          <p className="text-10px text-gray-400">1년 단독 사용료 무상 서비스 보증 임대 세팅</p>
                        </td>
                        <td className="p-3 text-right text-indigo-600 font-mono font-bold">무료 (0원)</td>
                      </tr>
                      <tr>
                        <td className="p-3">
                          <p className="font-bold text-gray-900">기본 보안 SSL 접속 암호화 등록</p>
                          <p className="text-10px text-gray-400">네이버/구글 색인 노출 전속 탑재</p>
                        </td>
                        <td className="p-3 text-right text-indigo-600 font-mono font-bold">무료 (0원)</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-gray-500 font-bold">공급 부가가치세 (VAT 10%)</td>
                        <td className="p-3 text-right font-mono font-semibold">{(invoiceProject.price * 0.1).toLocaleString()} 원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary total section */}
              <div className="bg-gray-950 p-4 rounded-xl text-white flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400">최종 청구 총 합계액</span>
                <span className="text-lg font-black font-mono text-emerald-400">{invoiceProject.price.toLocaleString()} 원</span>
              </div>

              {/* Footer stamps */}
              <div className="pt-2 text-center text-10px text-gray-400 leading-normal">
                본 견적물은 조율 즉시 효력을 수취하는 자사 정식 공문으로, 안전 자산 매칭 하에 계약을 체결합니다. LCI WebStudio의 낙인 하에 발급 완료되었습니다.
              </div>
            </div>

            {/* Print action and Close triggers */}
            <div className="mt-6 pt-4 border-t flex justify-end space-x-2">
              <button
                onClick={() => {
                  alert('기기 프린팅 환경이 준비되지 않았습니다. PDF 사본 파일 다운로드 저장을 추진합니다.');
                }}
                className="inline-flex items-center space-x-1 border rounded-xl px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 bg-white"
              >
                <Download className="h-3.5 w-3.5" />
                <span>PDF 다운로드</span>
              </button>
              <button
                onClick={() => setInvoiceProject(null)}
                className="rounded-xl px-5 py-2.5 text-xs font-semibold bg-gray-900 text-white hover:bg-gray-800"
              >
                확인
              </button>
            </div>

          </div>
        </div>
      )}

      {/* AI Proposal visual displayer popup board */}
      {activeProposal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-150 flex flex-col justify-between max-h-[90vh] overflow-y-auto">
            
            {/* Close button */}
            <button
              onClick={() => setActiveProposal(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-gray-400 hover:text-gray-650 hover:bg-gray-50 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* AI Proposal details mapping */}
            <div className="space-y-6 text-left">
              {/* Header block */}
              <div className="flex items-center space-x-2.5 pb-4 border-b">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-150">
                  <Sparkles className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-950">LCI AI 스마트 기획서 조회</h3>
                  <p className="text-xs text-gray-400 font-semibold italic">{activeProposalTitle} 브랜드 분석</p>
                </div>
              </div>

              {/* Slogan & Concepts */}
              <div className="space-y-2 bg-gradient-to-r from-emerald-50/50 to-indigo-50/30 p-5 rounded-2xl border border-emerald-100/60">
                <p className="text-[10px] uppercase font-mono font-bold text-indigo-600 tracking-wider">AI 추천 메인 카피</p>
                <h4 className="text-lg font-black text-gray-900">"{activeProposal.slogan}"</h4>
                <div className="h-1px w-full bg-emerald-100/40 my-2" />
                <p className="text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed">
                  <strong>기획 컨셉:</strong> {activeProposal.concept}
                </p>
              </div>

              {/* Color Palette visualization */}
              <div className="space-y-3">
                <p className="text-xs font-extrabold text-gray-800 flex items-center gap-1.5">
                  <Palette className="h-4.5 w-4.5 text-indigo-500" />
                  <span>AI 추천 브랜드 이미지 컬러 스키마</span>
                </p>
                <div className="grid grid-cols-4 gap-2.5 text-center font-mono">
                  <div className="space-y-1.5 p-2 rounded-xl bg-gray-50 border">
                    <div className="h-10 w-full rounded-lg shadow-inner" style={{ backgroundColor: activeProposal.colorPalette.primary }} />
                    <p className="text-9px font-bold text-gray-700">Primary</p>
                    <p className="text-10px font-semibold text-gray-400">{activeProposal.colorPalette.primary}</p>
                  </div>
                  <div className="space-y-1.5 p-2 rounded-xl bg-gray-50 border">
                    <div className="h-10 w-full rounded-lg shadow-inner" style={{ backgroundColor: activeProposal.colorPalette.secondary }} />
                    <p className="text-9px font-bold text-gray-700">Secondary</p>
                    <p className="text-10px font-semibold text-gray-400">{activeProposal.colorPalette.secondary}</p>
                  </div>
                  <div className="space-y-1.5 p-2 rounded-xl bg-gray-50 border">
                    <div className="h-10 w-full rounded-lg shadow-inner" style={{ backgroundColor: activeProposal.colorPalette.background }} />
                    <p className="text-9px font-bold text-gray-700">Background</p>
                    <p className="text-10px font-semibold text-gray-400">{activeProposal.colorPalette.background}</p>
                  </div>
                  <div className="space-y-1.5 p-2 rounded-xl bg-gray-50 border">
                    <div className="h-10 w-full rounded-lg shadow-inner animate-pulse" style={{ backgroundColor: activeProposal.colorPalette.accent }} />
                    <p className="text-9px font-bold text-gray-700">Accent</p>
                    <p className="text-10px font-semibold text-gray-450 font-bold">{activeProposal.colorPalette.accent}</p>
                  </div>
                </div>
              </div>

              {/* Recommended page Sections layout mapping */}
              <div className="space-y-3">
                <p className="text-xs font-extrabold text-gray-800 flex items-center gap-1.5">
                  <LayoutGrid className="h-4.5 w-4.5 text-indigo-500" />
                  <span>AI 추천 프레임 필수 레이아웃 설계 리스트</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeProposal.recommendedSections.map((sec, sidx) => (
                    <div key={sidx} className="p-4 rounded-xl border border-gray-150 bg-white shadow-sm space-y-1.5 text-xs text-left">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-indigo-950 font-sans">{sec.title}</span>
                        <span className="text-[9px] font-mono font-bold text-indigo-500 px-1.5 py-0.5 rounded bg-indigo-50 uppercase">{sec.suggestedLayout}</span>
                      </div>
                      <p className="text-gray-500 font-semibold font-sans leading-relaxed text-[11px]">{sec.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Internet marketing advice */}
              <div className="bg-gray-900 text-white rounded-2xl p-5 border border-gray-900 space-y-2 text-xs">
                <p className="font-black text-rose-300 uppercase tracking-widest text-[9px] font-mono">Growth Hack Brand Marketing Advice</p>
                <p className="leading-relaxed font-semibold text-gray-350">
                  {activeProposal.marketingAdvice}
                </p>
              </div>

            </div>

            {/* Confirm buttons */}
            <div className="mt-8 pt-4 border-t flex justify-end">
              <button
                onClick={() => setActiveProposal(null)}
                className="px-6 py-2.5 rounded-xl bg-gray-950 hover:bg-gray-900 text-white font-bold text-xs shadow-sm"
              >
                닫기 완료
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
