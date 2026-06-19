import React, { useState } from 'react';
import { Project, User, PortfolioItem, Announcement } from '../types';
import { store } from '../store';
import { 
  ShieldAlert, Settings, Briefcase, Users, LayoutGrid, Megaphone, 
  Trash2, Check, UserCheck, RefreshCw, Plus, Clock, FileText, CheckCircle2 
} from 'lucide-react';

interface AdminPanelProps {
  currentUser: User | null;
  projects: Project[];
  portfolios: PortfolioItem[];
  announcements: Announcement[];
  onNavigate?: (view: 'home' | 'mypage' | 'admin' | 'request' | 'editor') => void;
  onSelectProjectForPreview?: (project: Project) => void;
}

export default function AdminPanel({ 
  currentUser, 
  projects, 
  portfolios, 
  announcements,
  onNavigate,
  onSelectProjectForPreview
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'clients' | 'portfolio' | 'notices'>('projects');
  
  // States for adding portfolio
  const [pTitle, setPTitle] = useState('');
  const [pCategory, setPCategory] = useState('기업 홈페이지');
  const [pDescription, setPDescription] = useState('');
  const [pImage, setPImage] = useState('');
  const [pDetailText, setPDetailText] = useState('');

  // States for adding announcements
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annIsEvent, setAnnIsEvent] = useState(false);

  if (!currentUser || !currentUser.isAdmin) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center space-y-6">
        <ShieldAlert className="mx-auto h-12 w-12 text-red-500 animate-bounce" />
        <h3 className="text-xl font-bold text-gray-900">관리자 전용 페이지입니다</h3>
        <p className="text-sm text-gray-500">인증되지 않은 접근입니다. 로그인 창에서 빠른 체험전용 관리자 계정(admin@studio.com)을 이용하여 주입해 주세요.</p>
      </div>
    );
  }

  // Handle status update
  const handleUpdateStatus = (projectId: string, activeStatus: Project['status']) => {
    store.updateProjectStatus(projectId, activeStatus);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('이 신청 내역을 기각/삭제하시겠습니까?')) {
      store.deleteProject(id);
    }
  };

  // Handle adding portfolio
  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pTitle || !pDescription) {
      alert('제목과 설명을 명세해 주시기 바랍니다.');
      return;
    }
    const details = pDetailText ? pDetailText.split(',').map(d => d.trim()) : ['기본 반응형 구성', '모바일 최적화 탑재'];
    store.addPortfolioItem(pTitle, pCategory, pDescription, pImage, details);

    // Reset fields
    setPTitle('');
    setPDescription('');
    setPImage('');
    setPDetailText('');
    alert('새로운 포트폴리오가 정상 기입되었습니다. 메인 하단에서 즉각 연동을 조회가능합니다!');
  };

  const handleDeletePortfolio = (id: string) => {
    store.deletePortfolioItem(id);
  };

  // Handle adding announcement
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) {
      alert('제목과 내용을 명세해 주시기 바랍니다.');
      return;
    }
    store.addAnnouncement(annTitle, annContent, annIsEvent);

    // Reset fields
    setAnnTitle('');
    setAnnContent('');
    setAnnIsEvent(false);
    alert('새로운 공지 사안이 공식 기입되었습니다!');
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (confirm('공무 공지를 영구 삭제하시겠습니까?')) {
      store.deleteAnnouncement(id);
    }
  };

  // Deduplicate client list for 고객 관리 tab
  const uniqueClients = Array.from(new Set(projects.map(p => p.clientEmail))).map(email => {
    const proj = projects.find(p => p.clientEmail === email);
    return {
      email,
      name: proj?.clientName || '고객님',
      phone: proj?.clientPhone || '',
      projectsCount: projects.filter(p => p.clientEmail === email).length,
      uid: proj?.clientUid || ''
    };
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Title Header */}
      <div className="flex items-center space-x-3 pb-6 border-b border-gray-100 text-left">
        <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-150 shadow-md">
          <ShieldAlert className="h-6 w-6 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">스튜디오 총괄 어드민 대시보드</h2>
            <span className="text-9px px-1.5 py-0.5 rounded-full bg-red-100 font-bold font-mono text-red-800 tracking-wider">
              ADMIN CONTROL
            </span>
          </div>
          <p className="text-xs text-gray-400 font-semibold">최고 영수자 권한으로 신청서 검토, 상태 변경, 포트폴리오 수리 및 공문을 실시간 단독 작가 배포 가능합니다.</p>
        </div>
      </div>

      {/* Tabs list navigation */}
      <div className="flex border-b border-gray-150 overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-1.5 px-4.5 py-3.5 text-xs sm:text-sm font-bold border-b-2 shrink-0 transition-all cursor-pointer ${
            activeTab === 'projects'
              ? 'border-indigo-600 text-indigo-700 font-black bg-indigo-50/10'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Briefcase className="h-4.5 w-4.5" />
          <span>신청 및 진행 관리 ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('clients')}
          className={`flex items-center gap-1.5 px-4.5 py-3.5 text-xs sm:text-sm font-bold border-b-2 shrink-0 transition-all cursor-pointer ${
            activeTab === 'clients'
              ? 'border-indigo-600 text-indigo-700 font-black bg-indigo-50/10'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Users className="h-4.5 w-4.5" />
          <span>고객 명단 조회 ({uniqueClients.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`flex items-center gap-1.5 px-4.5 py-3.5 text-xs sm:text-sm font-bold border-b-2 shrink-0 transition-all cursor-pointer ${
            activeTab === 'portfolio'
              ? 'border-indigo-600 text-indigo-700 font-black bg-indigo-50/10'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <LayoutGrid className="h-4.5 w-4.5" />
          <span>포트폴리오 생성/삭제 ({portfolios.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`flex items-center gap-1.5 px-4.5 py-3.5 text-xs sm:text-sm font-bold border-b-2 shrink-0 transition-all cursor-pointer ${
            activeTab === 'notices'
              ? 'border-indigo-600 text-indigo-700 font-black bg-indigo-50/10'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Megaphone className="h-4.5 w-4.5" />
          <span>공지 및 이벤트 등록 ({announcements.length})</span>
        </button>
      </div>

      {/* Tab Contents Panels */}
      <div className="pt-2">
        {/* Tab 1: Submissions Management list */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-50 p-4.5 rounded-2xl border text-xs">
              <span className="font-bold text-gray-500 text-left">LCI 에스크로 정식 접수 신청 목록</span>
              <span className="font-mono text-[10px] text-indigo-600 font-bold">전체 접수: {projects.length} 건</span>
            </div>

            {projects.length === 0 ? (
              <div className="p-12 text-center text-gray-400 font-bold text-xs border rounded-2xl">
                신청된 홈페이지 이력이 전무합니다.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="p-6 rounded-2xl border border-gray-150 bg-white shadow-sm hover:shadow-md transition text-left space-y-4"
                  >
                    {/* Basic details */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3.5">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-10px font-extrabold text-indigo-600 uppercase font-mono tracking-wider">PROJECT ID: {p.id}</span>
                          <span className="text-9px px-1.5 py-0.5 rounded bg-indigo-50 font-bold text-indigo-700 font-sans">{p.specs.type}</span>
                        </div>
                        <h4 className="text-lg font-black text-gray-900">{p.projectName}</h4>
                      </div>

                      {/* Pricing tags */}
                      <div className="text-right flex items-center gap-3">
                        <div className="text-xs">
                          <p className="text-gray-400 font-bold">청구 예정액</p>
                          <p className="font-mono font-black text-indigo-600">{p.price.toLocaleString()} 원</p>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          title="신청 기각 및 삭제"
                          className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>

                    {/* Metadata block */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <p className="text-gray-400 font-semibold mb-0.5">고객명 / 이메일</p>
                        <p className="font-bold text-gray-800">{p.clientName} ({p.clientEmail})</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-semibold mb-0.5">연락처</p>
                        <p className="font-mono font-bold text-gray-800">{p.clientPhone || '정보 미등록'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-semibold mb-0.5">참고 URL / 희망 색상</p>
                        <p className="font-bold text-gray-800 truncate" title={p.specs.referenceUrl || '없음'}>
                          {p.specs.referenceUrl ? <a href={p.specs.referenceUrl} target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-700">링크</a> : '참고사이트 없음'} / {p.specs.colorScheme || '알아서'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-semibold mb-0.5">신청 일차</p>
                        <p className="font-bold text-gray-805 font-mono">{p.requestDate}</p>
                      </div>
                    </div>

                    {/* Features checklist inside details */}
                    {p.specs.features && p.specs.features.length > 0 && (
                      <div className="bg-gray-50/50 p-3.5 rounded-xl border text-xs">
                        <p className="font-bold text-gray-400 mb-1.5">요청한 주요 탑재 컴포넌트 목록</p>
                        <div className="flex flex-wrap gap-1.5">
                          {p.specs.features.map((feat, fidx) => (
                            <span key={fidx} className="rounded bg-white border font-bold text-gray-600 text-10px px-2.5 py-1">
                              ✔ {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Admin Live Web Editing Row */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-0.5 text-left">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5 font-sans">
                          <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                          <span>관리자 전용 실시간 웹 수정 및 사안 빌드</span>
                        </span>
                        <p className="text-[10px] text-gray-400 font-semibold leading-none">이 홈페이지의 글자, 사진, 컬러를 직접 수정하고 의뢰 고객 홈페이지로 즉각 동기화시킵니다.</p>
                      </div>
                      <button
                        onClick={() => {
                          if (onSelectProjectForPreview) {
                            onSelectProjectForPreview(p);
                          }
                          if (onNavigate) {
                            onNavigate('editor');
                          }
                        }}
                        className="inline-flex items-center space-x-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-xs font-bold transition shadow-sm cursor-pointer"
                      >
                        <Settings className="h-3.5 w-3.5 shrink-0" />
                        <span>홈페이지 글자/사진 실시간 수리 편집</span>
                      </button>
                    </div>

                    {/* Interactive state updating toggler */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-dashed">
                      <span className="text-xs font-bold text-gray-405 flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>공정 상태 실시간 전송 변경: </span>
                        <strong className="text-indigo-600 underline">현재 {p.status}</strong>
                      </span>

                      <div className="flex flex-wrap items-center gap-1">
                        {(['상담대기', '제작중', '수정중', '완료'] as Project['status'][]).map((st) => {
                          const active = p.status === st;
                          return (
                            <button
                              key={st}
                              onClick={() => handleUpdateStatus(p.id, st)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                                active
                                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                                  : 'border-gray-200 hover:border-gray-300 text-gray-500 bg-white'
                              }`}
                            >
                              {st}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Client roster list */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-50 p-4.5 rounded-2xl border text-xs">
              <span className="font-bold text-gray-500 text-left">회원 등록 및 이력서 기반 고객 명부</span>
              <span className="font-mono text-[10px] text-gray-450">고객 수: {uniqueClients.length} 명</span>
            </div>

            <div className="rounded-2xl border overflow-hidden">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-gray-50 font-bold border-b text-gray-500">
                  <tr>
                    <th className="p-4">가고객 명칭</th>
                    <th className="p-4">클라이언트 이메일</th>
                    <th className="p-4">휴대전화 연락처</th>
                    <th className="p-4 text-center">신청 횟수 건</th>
                    <th className="p-4 text-right">상담 권한</th>
                  </tr>
                </thead>
                <tbody className="divide-y font-medium text-gray-750">
                  {uniqueClients.map((cli) => (
                    <tr key={cli.email} className="hover:bg-gray-50/50">
                      <td className="p-4 font-bold text-gray-900">{cli.name}</td>
                      <td className="p-4 font-mono">{cli.email}</td>
                      <td className="p-4 font-mono">{cli.phone || '연락처 미기입'}</td>
                      <td className="p-4 text-center font-bold text-indigo-600 font-mono">{cli.projectsCount} 건</td>
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded text-10px font-extrabold border border-green-150 uppercase">
                          <UserCheck className="h-3 w-3" />
                          <span>VIP</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                  {uniqueClients.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-400 font-bold text-xs">
                        가입된 가입고객 이력이 존재하지 않습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Portfolios Creator */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {/* Creator form */}
            <div className="lg:col-span-5">
              <form onSubmit={handleAddPortfolio} className="border rounded-3xl bg-gray-50/80 p-6 space-y-4 shadow-sm">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-indigo-600 font-mono uppercase">Add Portfolio</span>
                  <h4 className="text-base font-black text-gray-900">새 포트폴리오 가등록</h4>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">제목/작품명</label>
                  <input
                    type="text"
                    required
                    value={pTitle}
                    onChange={(e) => setPTitle(e.target.value)}
                    placeholder="예: 사람책 프로젝트 시즌2"
                    className="w-full text-xs sm:text-sm border rounded-xl p-3 bg-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">홈페이지 업종 카테고리</label>
                  <select
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                    className="w-full text-xs sm:text-sm border rounded-xl p-3 bg-white focus:outline-none font-bold"
                  >
                    <option value="기업 홈페이지">기업 홈페이지</option>
                    <option value="행사 홈페이지">행사 홈페이지</option>
                    <option value="포트폴리오 사이트">포트폴리오 사이트</option>
                    <option value="예약 사이트">예약 사이트</option>
                    <option value="쇼핑몰 랜딩페이지">쇼핑몰 랜딩페이지</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">설명문 작성</label>
                  <textarea
                    required
                    rows={3}
                    value={pDescription}
                    onChange={(e) => setPDescription(e.target.value)}
                    placeholder="프로젝트의 기획 의도 및 모바일 반응형 이점을 상세 기입하세요."
                    className="w-full text-xs border rounded-xl p-3 bg-white focus:outline-none font-semibold leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">배경 이미지 주소 [Unsplash 추천]</label>
                  <input
                    type="url"
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full text-xs border rounded-xl p-3 bg-white focus:outline-none font-mono"
                  />
                  <p className="text-[10px] text-gray-400 leading-none">빈칸일 시 고화질 코딩 랩 가도 배너가 자동 매핑됩니다.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">수록 컴포넌트 기능들 (쉼표로 분할)</label>
                  <input
                    type="text"
                    value={pDetailText}
                    onChange={(e) => setPDetailText(e.target.value)}
                    placeholder="결제 샌드박스, 카카오 매핑 달력, 미디어 피드"
                    className="w-full text-xs border rounded-xl p-3 bg-white focus:outline-none font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl bg-gray-950 hover:bg-gray-905 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="h-4.5 w-4.5" />
                  <span>새 포트폴리오 정식 발령 배포</span>
                </button>
              </form>
            </div>

            {/* Existing list */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-extrabold text-gray-400 uppercase">현재 운영 배포 중인 포트폴리오 일자</p>

              <div className="grid grid-cols-1 gap-4">
                {portfolios.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border bg-white flex justify-between gap-4 items-center text-left"
                  >
                    <div className="flex gap-4 items-center overflow-hidden">
                      <div className="h-14 w-14 rounded-lg bg-gray-50 border overflow-hidden shrink-0">
                        <img src={item.image} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 font-bold text-gray-600">{item.category}</span>
                          <span className="font-mono text-[9px] text-gray-400">ID: {item.id}</span>
                        </div>
                        <h5 className="font-black text-gray-900 truncate">{item.title}</h5>
                        <p className="text-11px text-gray-400 truncate max-w-[280px] font-semibold">{item.description}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeletePortfolio(item.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition shrink-0 border"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Notice Creator */}
        {activeTab === 'notices' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {/* Form writer */}
            <div className="lg:col-span-5">
              <form onSubmit={handleAddAnnouncement} className="border rounded-3xl bg-gray-50/80 p-6 space-y-4 shadow-sm">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-indigo-600 font-mono uppercase font-semibold">Broadcaster</span>
                  <h4 className="text-base font-black text-gray-900">공지사항 및 프로모션 송출</h4>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">공지 제목</label>
                  <input
                    type="text"
                    required
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    placeholder="예: 여름 얼리버드 10% 장악 할인 개막!"
                    className="w-full text-xs sm:text-sm border rounded-xl p-3 bg-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1 font-semibold">
                  <label className="text-xs font-bold text-gray-800">구체적 명세 문단 내용</label>
                  <textarea
                    required
                    rows={4}
                    value={annContent}
                    onChange={(e) => setAnnContent(e.target.value)}
                    placeholder="홈페이지 상단 또는 대시보드에 긴요하게 송출할 공지 세부사항입니다."
                    className="w-full text-xs border rounded-xl p-3 bg-white focus:outline-none font-semibold leading-relaxed"
                  />
                </div>

                <div className="flex items-center space-x-2.5 py-1 text-xs font-bold text-gray-700">
                  <input
                    type="checkbox"
                    id="ann-isevent"
                    checked={annIsEvent}
                    onChange={(e) => setAnnIsEvent(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="ann-isevent">중요 프로모션/이벤트성 여부 (노랑 라인 배너 발령)</label>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl bg-gray-950 hover:bg-gray-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="h-4.5 w-4.5" />
                  <span>새 공식 공문 작성 완료</span>
                </button>
              </form>
            </div>

            {/* Announcements List */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-extrabold text-gray-400 uppercase">현재 배출 운영 중인 공무 공지사항 목록</p>

              <div className="grid grid-cols-1 gap-4">
                {announcements.map((item) => (
                  <div
                    key={item.id}
                    className={`p-5 rounded-2xl border flex justify-between gap-4 items-start text-left ${
                      item.isEvent ? 'bg-amber-50/40 border-amber-100' : 'bg-white border-gray-150'
                    }`}
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold font-sans uppercase ${
                          item.isEvent ? 'bg-amber-150 text-amber-800' : 'bg-gray-100 text-gray-650'
                        }`}>
                          {item.isEvent ? '이벤트' : '구조공지'}
                        </span>
                        <span className="font-mono text-[9px] text-gray-400">{item.date}</span>
                      </div>
                      <h5 className="font-black text-gray-955 text-sm sm:text-base">{item.title}</h5>
                      <p className="text-xs text-gray-500 font-semibold leading-relaxed">{item.content}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteAnnouncement(item.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition shrink-0 border bg-white"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
