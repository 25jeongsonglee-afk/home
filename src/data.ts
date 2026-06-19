import { PortfolioItem, Review, Announcement, Project } from './types';

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p-1',
    title: '사람책(Human Book) 프로젝트',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    description: '서로의 경험과 지식을 대화로 나누는 매칭 플랫폼. 강연 매칭, 사용자 예약, 다중 리뷰 시스템 내장.',
    category: '포트폴리오',
    link: '#',
    details: ['예약 및 매칭 캘린더', '실시간 채팅 지원', '경험 카드 공유 템플릿']
  },
  {
    id: 'p-2',
    title: '카페 루이비 & 베이커리',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
    description: '감성적인 카페의 브랜드 가치를 극대화한 예약 및 시그니처 굿즈 스토어 연동 반응형 웹사이트.',
    category: '예약 사이트',
    link: '#',
    details: ['모바일 최적화 메뉴판', '좌석 예약 시스템', '브랜드 굿즈 간이 결제']
  },
  {
    id: 'p-3',
    title: '테크 얼라이언스 동아리',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    description: 'IT 연합 개발 동아리의 활동 아카이브, 멤버 매니지먼트, 간편 지원 폼을 결합한 반응형 랜딩페이지.',
    category: '동아리 홈페이지',
    link: '#',
    details: ['동적 기수별 멤버 그리드', '대형 아카이브 슬라이더', '실시간 지원 마일스톤']
  },
  {
    id: 'p-4',
    title: '어반시크 에센셜즈 쇼핑몰',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    description: '미니멀리즘 의류 브랜드의 고감도 랜딩 아웃룩 및 주력 상품 모션 카드 갤러리 리디자인.',
    category: '쇼핑몰 랜딩페이지',
    link: '#',
    details: ['스크롤 유도 패럴랙스', '컬러 변형 실시간 미리보기', '신속 쇼핑 카트 서브모달']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r-1',
    author: '김하민 (민스카페 대표)',
    rating: 5,
    content: '인스타그램 광고를 보고 반신반의하며 제작 신청을 했는데, 딱 3일 만에 상상 이상으로 감각적인 카페 홈페이지를 만들어 주셨습니다! 마이페이지에서 상담 후 제작 progress Bar가 쭉쭉 차는 걸 실시간으로 확인하는 재미도 쏠쏠했어요. 강추합니다.',
    projectType: '카페 홈페이지',
    date: '2026-05-12'
  },
  {
    id: 'r-2',
    author: '박성은 (넥스트루프 동아리 회장)',
    rating: 5,
    content: '매년 동아리 홍보 홈피 제작을 위해 밤새기 일쑤였는데, 모바일에 딱 맞춘 레이아웃과 감동적인 인트로 효과 덕분에 이번 기수 경쟁률이 최고를 찍었습니다! 파일 제출이랑 색상 조율을 Admin에서 실시간으로 대화하듯 조율해 준 점이 최고네요.',
    projectType: '동아리 홈페이지',
    date: '2026-06-02'
  },
  {
    id: 'r-3',
    author: '이정원 (코어솔루션 마케팅 팀장)',
    rating: 5,
    content: '기존 홈페이지가 모바일에서 다 깨져서 BASIC 요금제로 1페이지 반응형 랜딩페이지를 의뢰했는데, 기대를 훌쩍 뛰어넘는 모던한 스위스 하이테크 풍 결과물이 나왔습니다. 정직한 가격과 신속함에 엄지척하고 갑니다.',
    projectType: '기업 홈페이지',
    date: '2026-06-15'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a-1',
    title: '✨ 론칭 기념 얼리버드 프로모션 진행 중!',
    content: '홈페이지 제작 신청 시 AI 브랜딩 가이드북 및 로고 일러스트 무료 디자인 혜택을 선착순 20분께 선물해 드립니다! (현재 14명 신청 완료)',
    date: '2026-06-10',
    isEvent: true
  },
  {
    id: 'a-2',
    title: '💻 기술 및 프레임워크 업데이트 공지',
    content: '스튜디오의 모든 빌드 템플릿이 Vite 6 및 Tailwind v4 엔진으로 전면 강화되어 로딩 성능과 시각적 인터랙션이 약 40% 향상되었습니다.',
    date: '2026-06-18',
    isEvent: false
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    projectName: '소소한 가드닝 샵',
    clientUid: 'user-001',
    clientEmail: '25jeongsonglee@dgmeister.hs.kr',
    clientName: '정송이',
    clientPhone: '010-1234-5678',
    status: '제작중',
    price: 200000,
    requestDate: '2026-06-17',
    specs: {
      type: '예약 사이트',
      referenceUrl: 'https://garden-example.com',
      colorScheme: '초록색 & 편안한 무드',
      features: ['실시간 클래스 예약', '이메일 뉴스레터 신청', '간이 갤러리'],
      businessName: '소소한 가드닝'
    },
    aiProposal: {
      slogan: "바쁜 일상 속 나만의 초록 쉼터, 소소한 가드닝",
      concept: "내추럴 빈티지 감성과 그리너리 컬러 테마를 적용해 치유와 마음 챙김의 분위기를 강조함. 둥근 폰트와 넓은 여백으로 편안함을 표현.",
      colorPalette: {
        primary: "#1e3f20",
        secondary: "#6e8e72",
        background: "#f7f9f6",
        accent: "#d4a373"
      },
      recommendedSections: [
        { title: "비주얼 오프너", description: "따뜻한 가드닝 매장 내부 전경 사진과 로고.", suggestedLayout: "대형 여백 레이아웃" },
        { title: "원데이 예약 모듈", description: "간단 일자 선택 및 인원 조율 폼.", suggestedLayout: "카드형 대시보드" }
      ],
      marketingAdvice: "네이버 스마트 플레이스 지도 연동 및 인스타그램 식물 식재 팁 릴스를 활성화해 홈페이지로 유입을 추천합니다."
    }
  },
  {
    id: 'proj-2',
    projectName: '올댓 러닝클럽',
    clientUid: 'user-112',
    clientEmail: 'runner@example.com',
    clientName: '최러너',
    clientPhone: '010-9876-5432',
    status: '완료',
    price: 100000,
    requestDate: '2026-06-10',
    specs: {
      type: '동아리 홈페이지',
      referenceUrl: 'https://nike.com',
      colorScheme: '모노톤 & 네온옐로우 포인트',
      features: ['가입 신청서 폼', '오픈카카오 링크', '활동 일차 갤러리'],
      businessName: '올댓러닝'
    }
  }
];
