import { User, Project, PortfolioItem, Review, Announcement, ProjectSpecs, AIProposal } from './types';
import { INITIAL_PORTFOLIO, INITIAL_REVIEWS, INITIAL_ANNOUNCEMENTS, MOCK_PROJECTS } from './data';

// Reactive Store using simple listener pattern
type Listener = () => void;
let listeners: Listener[] = [];

// Helper to notify all component subscribers
const notify = () => {
  listeners.forEach(l => l());
};

// Initial state helpers
const getStored = <T>(key: string, fb: T): T => {
  const val = localStorage.getItem(key);
  if (!val) return fb;
  try {
    return JSON.parse(val) as T;
  } catch (e) {
    return fb;
  }
};

const setStored = <T>(key: string, val: T): void => {
  localStorage.setItem(key, JSON.stringify(val));
};

// Global Store State
let currentUser: User | null = getStored<User | null>('studio_user', null);
let projects: Project[] = getStored<Project[]>('studio_projects', MOCK_PROJECTS);
let portfolios: PortfolioItem[] = getStored<PortfolioItem[]>('studio_portfolios', INITIAL_PORTFOLIO);
let reviews: Review[] = getStored<Review[]>('studio_reviews', INITIAL_REVIEWS);
let announcements: Announcement[] = getStored<Announcement[]>('studio_announcements', INITIAL_ANNOUNCEMENTS);

export const store = {
  subscribe(listener: Listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },

  getCurrentUser(): User | null {
    return currentUser;
  },

  getProjects(): Project[] {
    return projects;
  },

  getProjectsForUser(uid: string): Project[] {
    return projects.filter(p => p.clientUid === uid);
  },

  getPortfolios(): PortfolioItem[] {
    return portfolios;
  },

  getReviews(): Review[] {
    return reviews;
  },

  getAnnouncements(): Announcement[] {
    return announcements;
  },

  // Auth Operations
  loginSimulated(email: string, name: string): User {
    const isAdmin = email === 'admin@studio.com' || email.includes('admin');
    const newUser: User = {
      uid: isAdmin ? 'admin-uid' : `user-${Date.now()}`,
      name: isAdmin ? '총괄 관리자' : name || '고객님',
      email: email,
      isAdmin
    };
    currentUser = newUser;
    setStored('studio_user', currentUser);
    
    // Auto-create initial mock project for newly logged-in test user if not exists
    if (!isAdmin && !projects.some(p => p.clientEmail === email)) {
      // Just keep existing mock projects as is
    }

    notify();
    return newUser;
  },

  logout() {
    currentUser = null;
    localStorage.removeItem('studio_user');
    notify();
  },

  // Project Operations (제작 신청)
  addRequest(specs: ProjectSpecs, clientEmail: string, clientName: string, clientPhone: string): Project {
    const uuid = `proj-${Date.now()}`;
    const newProject: Project = {
      id: uuid,
      projectName: specs.businessName || `${clientName}님의 사이트`,
      clientUid: currentUser?.uid || `guest-${Date.now()}`,
      clientEmail,
      clientName,
      clientPhone,
      status: '상담대기',
      price: specs.type === 'BASIC' ? 100000 : (specs.type === 'STANDARD' ? 200000 : 350000),
      requestDate: new Date().toISOString().split('T')[0],
      specs,
    };

    projects = [newProject, ...projects];
    setStored('studio_projects', projects);
    notify();
    return newProject;
  },

  // Update Status (Admin)
  updateProjectStatus(projectId: string, status: Project['status']) {
    projects = projects.map(p => p.id === projectId ? { ...p, status } : p);
    setStored('studio_projects', projects);
    notify();
  },

  // Set AI Proposal for a project
  setProjectAIProposal(projectId: string, proposal: AIProposal) {
    projects = projects.map(p => p.id === projectId ? { ...p, aiProposal: proposal } : p);
    setStored('studio_projects', projects);
    notify();
  },

  // Save/Update full edited website details for a project (Admin/Developer/Owner editing)
  updateProjectWebsite(projectId: string, update: {
    projectName: string;
    type: string;
    features: string[];
    slogan: string;
    concept: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    bgImage: string;
  }) {
    projects = projects.map(p => {
      if (p.id === projectId) {
        const updatedProposal: AIProposal = {
          slogan: update.slogan,
          concept: update.concept,
          colorPalette: {
            primary: update.primaryColor,
            secondary: update.secondaryColor,
            accent: update.accentColor,
            background: update.backgroundColor,
          },
          bgImage: update.bgImage,
          recommendedSections: p.aiProposal?.recommendedSections || [],
          marketingAdvice: p.aiProposal?.marketingAdvice || '관리자/개발자 직접 맞춤 조율이 완료되었습니다.'
        };

        const updatedSpecs: ProjectSpecs = {
          ...p.specs,
          type: update.type,
          businessName: update.projectName,
          features: update.features,
          colorScheme: `주조색: ${update.primaryColor}, 보조색: ${update.secondaryColor}, 포인트액센트: ${update.accentColor}`
        };

        return {
          ...p,
          projectName: update.projectName,
          specs: updatedSpecs,
          aiProposal: updatedProposal
        };
      }
      return p;
    });
    setStored('studio_projects', projects);
    notify();
  },

  // Delete project
  deleteProject(projectId: string) {
    projects = projects.filter(p => p.id !== projectId);
    setStored('studio_projects', projects);
    notify();
  },

  // Portfolio Management (Admin)
  addPortfolioItem(title: string, category: string, description: string, image: string, details: string[]) {
    const newItem: PortfolioItem = {
      id: `p-${Date.now()}`,
      title,
      category,
      description,
      image: image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      details,
    };
    portfolios = [newItem, ...portfolios];
    setStored('studio_portfolios', portfolios);
    notify();
  },

  deletePortfolioItem(id: string) {
    portfolios = portfolios.filter(p => p.id !== id);
    setStored('studio_portfolios', portfolios);
    notify();
  },

  // Notice Admin Operations
  addAnnouncement(title: string, content: string, isEvent: boolean) {
    const newAnn: Announcement = {
      id: `a-${Date.now()}`,
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      isEvent
    };
    announcements = [newAnn, ...announcements];
    setStored('studio_announcements', announcements);
    notify();
  },

  deleteAnnouncement(id: string) {
    announcements = announcements.filter(a => a.id !== id);
    setStored('studio_announcements', announcements);
    notify();
  },

  // Generate Fallback AI Proposal if live server is unreachable or offline
  generateFallbackProposal(specs: ProjectSpecs): AIProposal {
    const categories: Record<string, { slogan: string; concept: string; primary: string; secondary: string; accent: string; sections: string[] }> = {
      '기업 홈페이지': {
        slogan: `신뢰와 성장을 지향하는 ${specs.businessName || '파트너'}의 디지털 거점`,
        concept: "신뢰감 높은 네이비와 깔끔한 화이트 스페이스를 바탕으로 전문성을 강조하는 스위스 모던 스타일.",
        primary: "#0F172A",
        secondary: "#1E3A8A",
        accent: "#3B82F6",
        sections: ["비주얼 인트로 히어로", "핵심 경쟁력 통계그리드", "서비스 디테일 카드", "고객사 로고 월", "간편 견적 문의폼"]
      },
      '예약 사이트': {
        slogan: `세상에서 가장 쉬운 실시간 스마트 예약, ${specs.businessName || '스페이스'}`,
        concept: "따뜻한 크림 배경에 세련된 베이지와 올리브 톤으로 편안하고 직관적인 여정을 완성하는 휴먼-센트릭 레이아웃.",
        primary: "#1E2F23",
        secondary: "#7C9082",
        accent: "#D4A373",
        sections: ["감성 공간 비주얼 오프너", "실시간 인터랙티브 예약 캘린더", "안내 사항 & 이용 규칙 아코디언", "리얼 현장 포토 슬라이더", "안전 결제 알림 모달"]
      },
      '동아리 홈페이지': {
        slogan: `함께 협력하며 새로운 내일을 개척하는 젊은 시너지, ${specs.businessName || '코쿤'}`,
        concept: "과감한 산세리프 서체와 네온 라임 컬러 포인트를 조합하여 에너제틱하고 트렌디한 감각 표출.",
        primary: "#030712",
        secondary: "#374151",
        accent: "#A3E635",
        sections: ["멤버 대형 크루 비주얼", "활동 아카이브 가로 스크롤 카드", "실시간 역대 프로젝트 모음", "가입 혜택 FAQ 코너", "모바일 특화 지원서 서식"]
      },
      '쇼핑몰 랜딩페이지': {
        slogan: `당신의 오디너리를 유니크하게 바꾸는 감성 브랜드, ${specs.businessName || '에센셜'}`,
        concept: "제품의 질감을 극대화하는 미니멀리즘 와이드 레이아웃과 감도 높은 세리프 폰트로 고급스러운 무드 자아냄.",
        primary: "#1A1A1A",
        secondary: "#7F7F7F",
        accent: "#C3A68F",
        sections: ["와이드 시네마틱 제품 오프너", "가치제안 스토리 매거진 단락", "고해상도 디테일 크롭 그리드", "리얼 리뷰 바이어 가이드", "신속 장바구니 유도 토글"]
      }
    };

    const template = categories[specs.type] || {
      slogan: `${specs.businessName || '스튜디오'}가 선사하는 차세대 디지털 인터페이스`,
      concept: "심플함과 다이내믹함을 균형 있게 배정하여 범용적이면서도 가시성이 훌륭한 다목적 반응형 레이아웃.",
      primary: "#1F2937",
      secondary: "#4B5563",
      accent: "#6366F1",
      sections: ["대화형 오프너", "기능 리스트 카드", "자주 묻는 질문 아코디언", "체험 신청 폼"]
    };

    return {
      slogan: template.slogan,
      concept: template.concept,
      colorPalette: {
        primary: template.primary,
        secondary: template.secondary,
        background: "#F9FAFB",
        accent: template.accent
      },
      recommendedSections: template.sections.map((title, idx) => ({
        title,
        description: `${specs.businessName || '비즈니스'} 최적화를 위해 AI 모델이 선정한 ${idx + 1}순위 필수 섹션 템플릿입니다.`,
        suggestedLayout: idx % 2 === 0 ? "2컬럼 와이트 이미지 배치" : "3카드 그리드 레이아웃"
      })),
      marketingAdvice: `${specs.type}의 특성에 맞서 로컬 비지니스 SEO 및 페이스북 픽셀 타겟 광고 연동 시 자사몰 전환율이 최대 240% 이상 상승될 것으로 예상됩니다.`
    };
  },

  // Call official server-side Gemini API
  async generateAIProposalServer(specs: ProjectSpecs): Promise<AIProposal> {
    try {
      const response = await fetch('/api/ai/proposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ specs })
      });
      if (!response.ok) {
        throw new Error('Server AI call failed, fallback used');
      }
      return await response.json() as AIProposal;
    } catch (err) {
      console.warn("AI Proposal API call failed; generating smart client-side fallback:", err);
      return this.generateFallbackProposal(specs);
    }
  }
};
