import React, { useState, useEffect } from 'react';
import { User, Project, ProjectSpecs, AIProposal } from '../types';
import { store } from '../store';
import { 
  Monitor, Tablet, Smartphone, Sparkles, Check, Save, Image, Palette, 
  RefreshCw, Layout, ArrowRight, Heart, Edit3, Plus, Sliders, Play, X, Download, HelpCircle
} from 'lucide-react';

interface PreviewEditorProps {
  currentUser: User | null;
  activeProject: Project | null;
  onNavigate: (view: 'home' | 'mypage' | 'admin' | 'request' | 'editor') => void;
  onApplyToRequestForm?: (customSpecs: any) => void;
}

// Pre-curated high-quality Unsplash image configurations for beautiful placeholders
const LCI_IMAGE_COLLECTIONS = {
  기업: [
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1203', title: '컨퍼런스 미팅룸' },
    { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200', title: '미니멀 모던 오피스' },
    { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200', title: '고급 도심 랜드마크 빌딩' },
    { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200', title: '비즈니스 크루 가치 창출' }
  ],
  예약: [
    { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200', title: '감성 브런치 카페 일상' },
    { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200', title: '포근한 디자이너 하우스 객실' },
    { url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200', title: '미니멀 원목 공유 정원' },
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200', title: '감각적인 비스포크 스튜디오' }
  ],
  포트폴리오: [
    { url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200', title: '아트 디자이너 홈 랩' },
    { url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=1200', title: '감도 높은 미니멀 오큘러스' },
    { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200', title: '창의적인 웹 코딩 공간' },
    { url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200', title: '모바일 UX 와이어프레임 설계' }
  ],
  쇼핑: [
    { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200', title: '오브제 미니멀 스마트 스피커' },
    { url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1200', title: '홈퍼니싱 감동 가구 및 조명' },
    { url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=1200', title: '에센셜 비건 케어 세트' },
    { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200', title: '부티크 매장 의류 전경' }
  ],
  동아리: [
    { url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200', title: '젊은 크루 연합 기획 해커톤' },
    { url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200', title: '대학생 연합 음악 밴드' },
    { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200', title: '친환경 가드닝 프로젝트 소모임' },
    { url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200', title: '동아리 네트워킹 맥주 토크 파티' }
  ]
};

// Preset Design Themes
const PALETTE_PRESETS = [
  { name: '스위스 차콜(Corporate)', primary: '#0F172A', secondary: '#1E3A8A', accent: '#3B82F6', background: '#F8FAFC' },
  { name: '코지 오가닉(Cafe/Booking)', primary: '#1E2F23', secondary: '#7C9082', accent: '#D4A373', background: '#FDFBF7' },
  { name: '트렌디 라임(IT/Club)', primary: '#030712', secondary: '#374151', accent: '#84CC16', background: '#FAFAFA' },
  { name: '센스 무드(Serif/Luxury)', primary: '#1A1A1A', secondary: '#6B7280', accent: '#C3A68F', background: '#FAFAF9' },
  { name: '코스믹 볼드(Visual)', primary: '#4F46E5', secondary: '#7C3AED', accent: '#F43F5E', background: '#FAF5FF' },
];

export default function PreviewEditor({ currentUser, activeProject, onNavigate, onApplyToRequestForm }: PreviewEditorProps) {
  // 1. Core Selection state
  const [siteType, setSiteType] = useState<'기업' | '예약' | '포트폴리오' | '쇼핑' | '동아리'>('기업');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // 2. Mutable Theme Color States
  const [primaryColor, setPrimaryColor] = useState('#0F172A');
  const [secondaryColor, setSecondaryColor] = useState('#1E3A8A');
  const [accentColor, setAccentColor] = useState('#3B82F6');
  const [backgroundColor, setBackgroundColor] = useState('#F8FAFC');

  // 3. Mutable Website Copy States
  const [businessName, setBusinessName] = useState('가든앤코 스튜디오');
  const [heroSlogan, setHeroSlogan] = useState('바쁜 일상 속, 나만의 푸르른 정원 솔루션');
  const [heroSub, setHeroSub] = useState('LCI만의 프리미엄 식물 큐레이션 서비스부터 도심 가드닝 공유 패키지까지 한 번에.');
  const [btnText, setBtnText] = useState('지금 무료 상담 받기');
  const [descHeading, setDescHeading] = useState('우리가 가꾸는 친자연 가치');
  const [descBody, setDescBody] = useState('조경 디자이너와 원예 작가들이 엄선해 안전 배송해 드리는 식물부터 공간 맞춤 조경 컨설팅까지, 가장 빠르고 탄탄하게 귀사의 쉼을 조성해 드립니다.');
  
  // Custom features
  const [featureList, setFeatureList] = useState<string[]>([
    '실시간 1:1 디자이너 배정 상담 시스템',
    '네이버 예약 연동 무료 세팅 패키지',
    '모바일 반응형 완벽 레이아웃 자동 지원',
    '보안 SSL 인증서 및 평생 안전 호스팅 무상 수리'
  ]);
  const [newFeature, setNewFeature] = useState('');

  // 4. Photos Settings
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200');
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [targetImageField, setTargetImageField] = useState<'hero'>('hero');
  const [customImageUrl, setCustomImageUrl] = useState('');

  // 5. Active Editing Overlay Trigger for extra UI friendliness
  const [lastEditedField, setLastEditedField] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Synchronize when project changes or loaded
  useEffect(() => {
    if (activeProject) {
      setBusinessName(activeProject.projectName || activeProject.specs.businessName);
      if (activeProject.aiProposal) {
        setHeroSlogan(activeProject.aiProposal.slogan);
        setHeroSub(activeProject.aiProposal.concept);
        setPrimaryColor(activeProject.aiProposal.colorPalette.primary);
        setSecondaryColor(activeProject.aiProposal.colorPalette.secondary);
        setAccentColor(activeProject.aiProposal.colorPalette.accent);
        setBackgroundColor(activeProject.aiProposal.colorPalette.background || '#F8FAFC');
      }

      // Sync features list if exists
      if (activeProject.specs.features && activeProject.specs.features.length > 0) {
        setFeatureList(activeProject.specs.features);
      }

      // Map Type
      const typeMap: Record<string, '기업' | '예약' | '포트폴리오' | '쇼핑' | '동아리'> = {
        '기업 홈페이지': '기업',
        '예약 사이트': '예약',
        '포트폴리오 사이트': '포트폴리오',
        '쇼핑몰 랜딩페이지': '쇼핑',
        '동아리 홈페이지': '동아리'
      };
      const mapped = typeMap[activeProject.specs.type];
      if (mapped) {
        setSiteType(mapped);
        const images = LCI_IMAGE_COLLECTIONS[mapped];
        if (activeProject.aiProposal?.bgImage) {
          setHeroImage(activeProject.aiProposal.bgImage);
        } else if (images && images.length > 0) {
          setHeroImage(images[0].url);
        }
      }
    }
  }, [activeProject]);

  // Handle template type changes
  const handleSiteTypeChange = (type: '기업' | '예약' | '포트폴리오' | '쇼핑' | '동아리') => {
    setSiteType(type);
    
    // Automatically swap in matching Unsplash background image
    const images = LCI_IMAGE_COLLECTIONS[type];
    if (images && images[0]) {
      setHeroImage(images[0].url);
    }

    // Adapt copywriting slogans dynamically
    const sampleCopy = {
      기업: {
        bName: '디렉토리 테크 솔루션',
        slogan: '안전하고 견고한 성장을 증진하는 차세대 비즈니스 파트너',
        sub: 'Vite6과 모던 Tailwind 기반의 초고속 속도로 제작되어, 귀사의 글로벌 명예와 브랜딩 신뢰도를 극대화합니다.',
        descHead: '기업 아이덴티티 시현',
        descBody: '정확한 마일스톤 데이터, 투명한 포트폴리오 관리, 모바일 유저들이 감동하는 직관적이고 편안한 UX 환경을 선물해 드립니다.'
      },
      예약: {
        bName: '릴렉스 살롱 & 아뜰리에',
        slogan: '클릭 세 번 만에 예약 완료하는 힐링 스페이스',
        sub: '카카오톡 비즈봇 자동 실시간 매핑 및 간편 샌드박스 결제로 노쇼(No-Show)를 완벽 차단해 매출을 올립니다.',
        descHead: '아늑하고 든든한 공간 소개',
        descBody: '원하시는 시간대를 터치하는 캘린더 인터벌 시스템과, 사계절 무드를 그대로 살려내는 디자이너 정밀 촬영 포토 갤러리.'
      },
      포트폴리오: {
        bName: '아티스트 주원 오퍼스',
        slogan: '나만의 오리지널리티를 세상에 가장 직관적으로 설파하다',
        sub: '미니멀리즘 산세리프 서체, 3차원 트랜지션 애니메이션이 조화롭게 밴딩된 나만의 오리지널 쇼케이스 플랫홈.',
        descHead: '아키텍트 오브 콜라보레이션',
        descBody: '대기업 프론트엔드 실전 개발진들과 SNS 전문 브랜딩 디자이너가 연동하여 기획서 및 인스타그램 피드 파싱을 즉각 수립해 드립니다.'
      },
      쇼핑: {
        bName: '에센셜 가구 랩',
        slogan: '일상의 격을 감각적으로 승화시키는 비스포크 하우스 오브제',
        sub: 'KG 이니시스 프리미엄 정식 에스크로 전액 연동. 감동적인 고해상도 상세 단락과 미디어 로딩 속도 최적화 패키지.',
        descHead: '명장의 고유한 미학 철학',
        descBody: '엄격하게 가공된 자재들로 지속 가능한 홈 인테리어와 가치를 영속적으로 소유해 드리기 위한 에센셜 라인업을 제공합니다.'
      },
      동아리: {
        bName: '메이스터 연합 코딩크루',
        slogan: '코드 한 줄로 세상을 구동시키는 청년 시너지',
        sub: '실시간 멤버 명부 및 공모 아카이브 가로 슬라이더 구축. 간편 기수 가입 양식과 SNS 인입 디엠 연동 최적 완료.',
        descHead: '우리가 함께 지어올리는 미래',
        descBody: '어디에도 얽매이지 않고 오직 개성과 성장을 목표로 뭉친 전국 유수의 프로젝트 연합이며 정기 네트워킹과 세미나를 개막합니다.'
      }
    };

    const targetCopy = sampleCopy[type];
    setBusinessName(targetCopy.bName);
    setHeroSlogan(targetCopy.slogan);
    setHeroSub(targetCopy.sub);
    setDescHeading(targetCopy.descHead);
    setDescBody(targetCopy.descBody);

    // Swap preset colors to match
    if (type === '기업') {
      setPrimaryColor('#0F172A'); setSecondaryColor('#1E3A8A'); setAccentColor('#3B82F6');
    } else if (type === '예약') {
      setPrimaryColor('#1E2F23'); setSecondaryColor('#7C9082'); setAccentColor('#D4A373');
    } else if (type === '동아리') {
      setPrimaryColor('#030712'); setSecondaryColor('#374151'); setAccentColor('#84CC16');
    } else if (type === '쇼핑') {
      setPrimaryColor('#1A1A1A'); setSecondaryColor('#6B7280'); setAccentColor('#C3A68F');
    } else {
      setPrimaryColor('#4F46E5'); setSecondaryColor('#7C3AED'); setAccentColor('#F43F5E');
    }
    setBackgroundColor('#FAFAFA');
  };

  const handleApplyPreset = (pst: typeof PALETTE_PRESETS[0]) => {
    setPrimaryColor(pst.primary);
    setSecondaryColor(pst.secondary);
    setAccentColor(pst.accent);
    setBackgroundColor(pst.background);
    triggerFieldIndicator('Palette Preset: ' + pst.name);
  };

  const triggerFieldIndicator = (fieldName: string) => {
    setLastEditedField(fieldName);
    setTimeout(() => {
      setLastEditedField(null);
    }, 1500);
  };

  // Add customized features to list
  const addFeatureItem = () => {
    if (newFeature.trim() && !featureList.includes(newFeature.trim())) {
      setFeatureList([...featureList, newFeature.trim()]);
      setNewFeature('');
      triggerFieldIndicator('새 특화 기능 추가');
    }
  };

  const removeFeatureItem = (itemToDelete: string) => {
    setFeatureList(featureList.filter(f => f !== itemToDelete));
    triggerFieldIndicator('특화 기능 제거');
  };

  // Handle image updates from picker
  const handleSelectPredefinedImage = (url: string) => {
    if (targetImageField === 'hero') {
      setHeroImage(url);
    }
    setShowImagePicker(false);
    triggerFieldIndicator('대표 백그라운드 이미지 교체');
  };

  const handleCustomImageUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customImageUrl.trim()) {
      if (targetImageField === 'hero') {
        setHeroImage(customImageUrl.trim());
      }
      setCustomImageUrl('');
      setShowImagePicker(false);
      triggerFieldIndicator('사용자 맞춤 URL 사진 교체');
    }
  };

  // Save current modifications directly back to the active project in the database/store
  const handleSaveToActiveProject = () => {
    if (!activeProject) return;

    const mappedType = siteType === '기업' ? '기업 홈페이지' : 
                       (siteType === '예약' ? '예약 사이트' : 
                       (siteType === '포트폴리오' ? '포트폴리오 사이트' : 
                       (siteType === '쇼핑' ? '쇼핑몰 랜딩페이지' : '동아리 홈페이지')));

    store.updateProjectWebsite(activeProject.id, {
      projectName: businessName,
      type: mappedType,
      features: featureList,
      slogan: heroSlogan,
      concept: heroSub,
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      accentColor: accentColor,
      backgroundColor: backgroundColor,
      bgImage: heroImage
    });

    alert(`🎉 성공적으로 '${businessName}' 웹사이트 변경 사안이 클라우드/로컬 데이터베이스에 직접 정식 반영되었습니다!\n(원본 홈페이지 글자, 테마 컬러, 대표 사진이 모두 저장되었습니다.)`);

    if (currentUser?.isAdmin) {
      onNavigate('admin');
    } else {
      onNavigate('mypage');
    }
  };

  // Compile final specs to order
  const handleOrderWithCustomSpecs = () => {
    const customSpecs = {
      businessName,
      type: siteType === '기업' ? '기업 홈페이지' : (siteType === '예약' ? '예약 사이트' : (siteType === '포트폴리오' ? '포트폴리오 사이트' : (siteType === '쇼핑' ? '쇼핑몰 랜딩페이지' : '동아리 홈페이지'))),
      colorScheme: `주조색: ${primaryColor}, 보조색: ${secondaryColor}, 포인트액센트: ${accentColor}`,
      features: featureList,
      logoFileName: '시안 편집기 가선택 로고',
      slogan: heroSlogan,
      concept: heroSub,
      bgImage: heroImage
    };

    if (onApplyToRequestForm) {
      onApplyToRequestForm(customSpecs);
    } else {
      // Navigate to request and alert
      onNavigate('request');
      alert(`[시안 임시 매핑] ${businessName} 제작 시안 양식이 안전하게 로컬 버퍼에 세팅되었습니다! 주문 양식 작성이 계속 수월하게 진행됩니다.`);
    }
  };

  // Render mock desktop/tablet/mobile outer frames
  const containerWidthClass = {
    desktop: 'w-full max-w-5xl shadow-2xl transition-all duration-300',
    tablet: 'w-full max-w-2xl border-x-[12px] border-t-[34px] border-b-[34px] border-gray-900 rounded-[32px] shadow-2xl transition-all duration-300 min-h-[750px]',
    mobile: 'w-full max-w-xs border-x-[10px] border-t-[48px] border-b-[48px] border-gray-900 rounded-[40px] shadow-2xl transition-all duration-300 min-h-[580px]'
  };

  const isFullEditable = !!(currentUser?.isAdmin && isEditMode);
  const editableClass = isFullEditable 
    ? 'outline-none ring-2 ring-indigo-505/70 ring-dashed bg-indigo-50/15 p-1 rounded transition duration-150 cursor-text hover:bg-slate-50/20'
    : 'outline-none border-transparent p-1 rounded transition duration-150';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* 1. Dashboard Top Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100 text-left">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1 text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 font-bold">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>Premium Interactive Web-Studio Experience Zone</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            실시간 시각 미리보기 & 즉각 기사 조율 편집기
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm font-semibold">
            귀사를 위한 가상의 결과물을 3초 만에 렌더링하고, **텍스트와 이미지, 테마 컬러**를 직접 클릭해 자유롭게 변경한 뒤 의뢰해 보세요!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {currentUser?.isAdmin && (
            <button
              onClick={() => {
                setIsEditMode(!isEditMode);
                if (!isEditMode) {
                  alert('⚙️ 관리자 직접 수정 기능이 활성화되었습니다! 이제 화면 시안 속의 글자를 바로 클릭/터치하여 실시간 타이핑 편집하거나 배경 사진을 교체할 수 있습니다.');
                }
              }}
              className={`rounded-xl border px-5 py-3 text-xs font-black flex items-center space-x-1.5 transition ${
                isEditMode
                  ? 'bg-amber-500 border-amber-600 text-white hover:bg-amber-600 shadow-md animate-pulse'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 shadow-sm'
              } cursor-pointer`}
            >
              <Edit3 className="h-4 w-4" />
              <span>{isEditMode ? '🛠️ 수정 완료 (수정모드 끄기)' : '🛠️ 홈페이지 글자/사진 수정하기'}</span>
            </button>
          )}

          <button
            onClick={() => {
              alert('현재 시안 구성 상태에 완벽한 CSS 소스코드가 실시간 연동 빌드되었습니다. LCI 수석 프로그래머가 에스크로 작업에 연동 수리합니다.');
            }}
            className="rounded-xl border border-gray-200 hover:bg-gray-50 bg-white px-4 py-3 text-xs font-bold text-gray-750 flex items-center space-x-1"
          >
            <Download className="h-3.5 w-3.5" />
            <span>최종 시안 덤프 받기</span>
          </button>

          {activeProject && (
            <button
              onClick={handleSaveToActiveProject}
              id="editor-save-active-project-btn"
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 hover:scale-101 hover:shadow-lg transition px-5 py-3 text-xs font-bold text-white flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>수정사항 영구 저장</span>
            </button>
          )}

          <button
            onClick={handleOrderWithCustomSpecs}
            id="editor-apply-request-btn"
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700 hover:scale-101 hover:shadow-lg transition px-5 py-3 text-xs font-bold text-white flex items-center space-x-1.5 shadow-md"
          >
            <Check className="h-4 w-4" />
            <span>{activeProject ? '이 시안을 양식으로 별도 문의' : '이 편집 시안으로 정식 의뢰서 제출'}</span>
          </button>
        </div>
      </div>

      {/* 2. Top layout bar mapping: Site Categories & Device Mode Toggles */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gray-50 p-4.5 rounded-2xl border border-gray-150">
        
        {/* Template selector tab bar */}
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-xs font-extrabold text-gray-400 mr-2 uppercase tracking-wide flex items-center gap-1.5">
            <Layout className="h-4 w-4" />
            <span>시안 종류 전환:</span>
          </span>
          {(['기업', '예약', '포트폴리오', '쇼핑', '동아리'] as const).map((type) => {
            const active = siteType === type;
            return (
              <button
                key={type}
                onClick={() => handleSiteTypeChange(type)}
                className={`px-4 py-2 border rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center space-x-1 ${
                  active 
                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm' 
                    : 'bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <span>{type} 홈페이지</span>
                {active && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>}
              </button>
            );
          })}
        </div>

        {/* Viewport device responsive previewer switcher */}
        <div className="flex items-center space-x-1.5 self-start lg:self-auto">
          <span className="text-xs font-bold text-gray-405 mr-1 bg-white border border-gray-200 p-1.5 rounded-lg select-none">
            반응형 화면비 가설검증:
          </span>
          <button
            onClick={() => setDevice('desktop')}
            title="모니터 화면"
            className={`p-2.5 rounded-xl border transition ${
              device === 'desktop' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white text-gray-400 hover:bg-gray-50'
            }`}
          >
            <Monitor className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => setDevice('tablet')}
            title="태블릿 화면"
            className={`p-2.5 rounded-xl border transition ${
              device === 'tablet' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white text-gray-400 hover:bg-gray-50'
            }`}
          >
            <Tablet className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            title="스마트폰 화면"
            className={`p-2.5 rounded-xl border transition ${
              device === 'mobile' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white text-gray-400 hover:bg-gray-50'
            }`}
          >
            <Smartphone className="h-4.5 w-4.5" />
          </button>
        </div>

      </div>

      {/* 3. Main Editor Work Zone split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Editor Left Sidebar Control Panel - 1/3 width */}
        <div className="lg:col-span-4 space-y-6 text-left">
          
          {/* Section A: Live Design Theme Palette Controls */}
          <div className="border border-gray-150 rounded-2xl bg-white p-5.5 space-y-4 shadow-sm">
            <h3 className="text-sm font-black text-gray-950 tracking-tight flex items-center gap-1.5">
              <Palette className="h-4.5 w-4.5 text-indigo-505" />
              <span>디자인 컬러 스키마 및 가테마</span>
            </h3>

            {/* Ready Palettes Selection Carousel */}
            <div className="space-y-2">
              <p className="text-[10px] text-gray-400 font-extrabold uppercase">전문 배색 프리셋 원클릭 적용</p>
              <div className="grid grid-cols-2 gap-2">
                {PALETTE_PRESETS.map((pst, pidx) => (
                  <button
                    type="button"
                    key={pidx}
                    onClick={() => handleApplyPreset(pst)}
                    className="p-2 border rounded-xl bg-white hover:bg-gray-50 text-left transition text-11px flex flex-col justify-between"
                  >
                    <span className="font-bold text-gray-800 tracking-tight text-10px truncate leading-normal">{pst.name}</span>
                    <div className="flex gap-1 mt-1.5">
                      <div className="h-3 w-5 rounded-sm border" style={{ backgroundColor: pst.primary }} />
                      <div className="h-3 w-5 rounded-sm border" style={{ backgroundColor: pst.secondary }} />
                      <div className="h-3 w-5 rounded-sm border" style={{ backgroundColor: pst.accent }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Color Pickers */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t">
              <div className="space-y-1">
                <label className="font-extrabold text-gray-800">주조색 (Primary)</label>
                <div className="flex items-center gap-1.5 border p-1 rounded-lg bg-gray-50">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => {
                      setPrimaryColor(e.target.value);
                      triggerFieldIndicator('Primary Color');
                    }}
                    className="h-7 w-7 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase">{primaryColor}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-gray-800">액센트색 (Accent)</label>
                <div className="flex items-center gap-1.5 border p-1 rounded-lg bg-gray-50">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => {
                      setAccentColor(e.target.value);
                      triggerFieldIndicator('Accent Color');
                    }}
                    className="h-7 w-7 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase">{accentColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Text Copywriter Editor */}
          <div className="border border-gray-150 rounded-2xl bg-white p-5.5 space-y-4 shadow-sm">
            <h3 className="text-sm font-black text-gray-950 tracking-tight flex items-center gap-1.5">
              <Edit3 className="h-4.5 w-4.5 text-indigo-505" />
              <span>텍스트 실시간 디테일 수정인자</span>
            </h3>

            <div className="space-y-3 text-xs">
              
              <div className="space-y-1.5">
                <label className="font-extrabold text-gray-800">대표 상호 / 비즈니스명</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    triggerFieldIndicator('상호명');
                  }}
                  className="w-full border rounded-xl p-3 bg-gray-50 focus:bg-white focus:border-indigo-600 focus:outline-none font-semibold text-gray-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-gray-800">헤어로 메인 슬로건</label>
                <textarea
                  rows={2}
                  value={heroSlogan}
                  onChange={(e) => {
                    setHeroSlogan(e.target.value);
                    triggerFieldIndicator('슬로건');
                  }}
                  className="w-full border rounded-xl p-3 bg-gray-50 focus:bg-white focus:border-indigo-600 focus:outline-none font-bold text-gray-805 leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-gray-800">보조 설명 문단</label>
                <textarea
                  rows={2}
                  value={heroSub}
                  onChange={(e) => {
                    setHeroSub(e.target.value);
                    triggerFieldIndicator('보조 설명');
                  }}
                  className="w-full border rounded-xl p-2.5 bg-gray-50 focus:bg-white focus:border-indigo-600 focus:outline-none font-medium text-gray-500 leading-normal"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pb-1.5">
                <div className="space-y-1">
                  <label className="font-extrabold text-gray-800">버튼 문구</label>
                  <input
                    type="text"
                    value={btnText}
                    onChange={(e) => {
                      setBtnText(e.target.value);
                      triggerFieldIndicator('버튼 문구');
                    }}
                    className="w-full border rounded-xl p-2.5 text-11px bg-gray-50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-extrabold text-gray-800">디테일 소제목</label>
                  <input
                    type="text"
                    value={descHeading}
                    onChange={(e) => {
                      setDescHeading(e.target.value);
                      triggerFieldIndicator('소제목 명세');
                    }}
                    className="w-full border rounded-xl p-2.5 text-11px bg-gray-50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Section C: Project Features Modulator List */}
          <div className="border border-gray-150 rounded-2xl bg-white p-5.5 space-y-4 shadow-sm">
            <h3 className="text-sm font-black text-gray-950 tracking-tight flex items-center gap-1.5">
              <Sliders className="h-4.5 w-4.5 text-indigo-505" />
              <span>핵심 탑재 기능 조절</span>
            </h3>

            <div className="space-y-3.5">
              {/* Added items and delete buttons */}
              <div className="space-y-1.5">
                {featureList.map((feat, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-xl text-xs font-semibold gap-2 border">
                    <span className="text-gray-700 leading-tight flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                      <span>{feat}</span>
                    </span>
                    <button
                      onClick={() => removeFeatureItem(feat)}
                      type="button"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-1 rounded transition"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Custom addon inline */}
              <div className="flex gap-2 text-xs">
                <input
                  type="text"
                  placeholder="추가 개성 기능 기입..."
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 border rounded-lg px-2.5 py-2 font-medium focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addFeatureItem}
                  className="bg-gray-950 text-white rounded-lg px-3.5 py-2 font-bold hover:bg-gray-800"
                >
                  기록
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Live Preview Display Sandbox Canvas - 2/3 width */}
        <div className="lg:col-span-8 flex flex-col items-center">
          
          {/* Interactive Status Notice Alert */}
          <div className="w-full mb-3 flex items-center justify-between py-2.5 px-4 bg-slate-900 text-white text-xs rounded-xl shadow-lg border border-slate-950 relative overflow-hidden select-none">
            {/* Subtle light effect */}
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse pointer-events-none"></div>

            <span className="flex items-center gap-1.5 font-bold text-[11px]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LCI Direct Inline Web Editor Active</span>
            </span>

            {lastEditedField ? (
              <span className="text-emerald-300 font-mono text-[10px] bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded font-black uppercase tracking-wider animate-bounce">
                ✔ {lastEditedField} 실시간 업데이트됨
              </span>
            ) : !currentUser?.isAdmin ? (
              <span className="text-indigo-200 text-[10px] font-extrabold hidden xs:inline">
                💡 관리자 데모로 로그인(admin@lci.com)하시면 홈페이지 글자 및 사진 실시간 직접 수정 단추가 생성됩니다!
              </span>
            ) : !isEditMode ? (
              <span className="text-amber-300 text-[10px] font-extrabold hidden xs:inline animate-pulse">
                💡 상단의란 [🛠️ 홈페이지 글자/사진 수정하기] 단추를 누르면 아래 글자를 클릭 편집할 수 있습니다!
              </span>
            ) : (
              <span className="text-emerald-300 text-[10px] font-extrabold hidden xs:inline animate-bounce">
                ⚙️ 직접 수정 활성화! 각 문장을 클릭해 직접 백그라운드 타이핑 수정하거나 사진을 고치세요.
              </span>
            )}
          </div>

          {/* Core Device Mock Frame Container */}
          <div className="w-full py-8 bg-gray-100 border border-gray-200 rounded-[32px] flex items-center justify-center min-h-[600px] overflow-hidden relative">
            
            {/* Design Watermark grids as layout decorations */}
            <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.03] text-gray-900 select-none font-mono text-[10px]">
              {[...Array(144)].map((_, i) => (
                <div key={i} className="border-r border-b p-1 flex items-start justify-start select-none">LCI</div>
              ))}
            </div>

            {/* Outer framework depends on device selection */}
            <div className={containerWidthClass[device]}>
              
              {/* Virtual Top Browser bar */}
              <div className="bg-white border-b border-gray-200/80 p-3 px-4 flex items-center justify-between text-left select-none relative z-10-wrapper">
                <div className="flex space-x-1.5 align-middle">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="rounded-lg bg-gray-50 border border-gray-150 px-8 py-1 text-xs text-gray-500 font-mono truncate max-w-[280px]">
                  https://www.{businessName.toLowerCase().replace(/[^a-zA-Z]/g, '')}.com
                </div>
                <div className="text-[10px] bg-indigo-50 font-mono text-indigo-600 border border-indigo-150 font-bold px-2 py-0.5 rounded select-none">
                  {device.toUpperCase()} MODE
                </div>
              </div>

              {/* Actual customizable preview sheet layout inside */}
              <div 
                className="bg-white text-gray-900 transition-colors duration-200 flex flex-col justify-between overflow-y-auto max-h-[620px] scroll-smooth"
                style={{ backgroundColor: backgroundColor }}
              >
                
                {/* 1. Preview Header */}
                <header className="px-5 py-4 flex items-center justify-between border-b shadow-xs relative z-10 text-left" style={{ borderBottomColor: secondaryColor + '20' }}>
                  <div className="flex items-center space-x-1.5">
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ backgroundColor: primaryColor }}>
                      <span className="font-black text-xs">{businessName.substring(0,2)}</span>
                    </div>
                    <span
                      contentEditable={isFullEditable}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        setBusinessName(e.currentTarget.textContent || '');
                        triggerFieldIndicator('상호명');
                      }}
                      title={isFullEditable ? "✍️ 클릭하여 로고 상호명을 직접 수정해보세요" : undefined}
                      className={`font-extrabold text-sm tracking-tight min-w-[60px] ${editableClass}`}
                      style={{ color: primaryColor }}
                    >
                      {businessName}
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center space-x-4 text-xs font-bold text-gray-500">
                    <span className="text-gray-800">소개</span>
                    <span>서비스</span>
                    <span>상담신청</span>
                  </div>
                </header>

                {/* 2. Awesome Hero Visual Screen */}
                <div className="relative py-16 px-6 text-center sm:text-left overflow-hidden bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.65)), url(${heroImage})` }}>
                  
                  {/* Image swap floating badge */}
                  {isFullEditable && (
                    <button
                      onClick={() => {
                        setTargetImageField('hero');
                        setShowImagePicker(true);
                      }}
                      className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/25 rounded-xl px-3 py-1.5 text-10px font-extrabold flex items-center space-x-1 transition cursor-pointer"
                    >
                      <Image className="h-3.5 w-3.5" />
                      <span>배경 사진 교체하기</span>
                    </button>
                  )}

                  <div className="max-w-xl space-y-5 text-white text-left">
                    <span className="inline-flex py-1 px-3 text-10px font-extrabold uppercase rounded-full tracking-widest bg-white/10 border border-white/20 text-indigo-300" style={{ color: accentColor }}>
                      🔥 {siteType} 추천 웹 디자인
                    </span>
                    
                    {/* Slogan Title */}
                    <div className="relative group/slogan">
                      {isFullEditable && (
                        <div className="absolute -top-5 left-1 text-[8px] font-black bg-indigo-650 text-indigo-100 px-1 py-0.2 rounded opacity-0 group-hover/slogan:opacity-100 transition pointer-events-none select-none z-10">
                          ✍️ 메인 슬로건 (클릭하여 직접 텍스트 수정 가능)
                        </div>
                      )}
                      <h2 
                        contentEditable={isFullEditable}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          setHeroSlogan(e.currentTarget.textContent || '');
                          triggerFieldIndicator('슬로건');
                        }}
                        title={isFullEditable ? "✍️ 클릭하여 메인 슬로건 문구를 마음껏 고쳐보세요" : undefined}
                        className={`text-2xl sm:text-4xl font-black tracking-tight leading-tight min-h-[40px] focus:bg-white focus:text-slate-950 focus:ring-0 focus:outline-none ${editableClass}`}
                      >
                        {heroSlogan}
                      </h2>
                    </div>

                    {/* Subtext description */}
                    <div className="relative group/sub">
                      {isFullEditable && (
                        <div className="absolute -top-5 left-1 text-[8px] font-black bg-indigo-650 text-indigo-100 px-1 py-0.2 rounded opacity-0 group-hover/sub:opacity-100 transition pointer-events-none select-none z-10">
                          ✍️ 보조 설명 글귀 (클릭하여 직접 글자 수정 가능)
                        </div>
                      )}
                      <p 
                        contentEditable={isFullEditable}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          setHeroSub(e.currentTarget.textContent || '');
                          triggerFieldIndicator('보조 설명');
                        }}
                        title={isFullEditable ? "✍️ 클릭하여 보조 본문 구절을 마음대로 타이핑해 보세요" : undefined}
                        className={`text-xs sm:text-sm text-gray-300 leading-relaxed min-h-[30px] focus:bg-white focus:text-slate-800 focus:ring-0 focus:outline-none ${editableClass}`}
                      >
                        {heroSub}
                      </p>
                    </div>

                    {/* CTA button custom styled live */}
                    <div className="pt-2">
                      <div className="inline-block relative group/btn text-left">
                        {isFullEditable && (
                          <div className="absolute -top-5 left-1 text-[8px] font-black bg-indigo-650 text-white px-1 py-0.2 rounded opacity-0 group-hover/btn:opacity-100 transition pointer-events-none select-none z-10">
                            ✍️ 버튼 문구 실시간 변경 가능
                          </div>
                        )}
                        <div
                          className="rounded-xl px-5 py-3 text-xs font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 flex items-center space-x-1.5"
                          style={{ backgroundColor: accentColor }}
                        >
                          <span
                            contentEditable={isFullEditable}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              setBtnText(e.currentTarget.textContent || '');
                              triggerFieldIndicator('버튼 문구');
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-block focus:outline-none focus:bg-white focus:text-slate-900 ${isFullEditable ? 'ring-1 ring-white/50 bg-white/10 p-0.5 px-1 rounded cursor-text cursor-pointer hover:bg-white/20' : ''}`}
                          >
                            {btnText}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Specs List / Features layout visualization */}
                <div className="py-12 px-6 sm:px-10 space-y-8 text-left">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentColor }}>Core Strengths</span>
                    
                    <div className="relative group/desch">
                      {isFullEditable && (
                        <div className="absolute -top-5 left-1 text-[8px] font-black bg-indigo-600 text-white px-1 py-0.2 rounded opacity-0 group-hover/desch:opacity-100 transition pointer-events-none select-none z-10">
                          ✍️ 섹션 소제목 명세 (클릭 수정 가능)
                        </div>
                      )}
                      <h3 
                        contentEditable={isFullEditable}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          setDescHeading(e.currentTarget.textContent || '');
                          triggerFieldIndicator('소제목 명세');
                        }}
                        className={`text-xl sm:text-2xl font-black tracking-tight min-h-[28px] focus:bg-white focus:text-slate-950 focus:outline-none ${editableClass}`} 
                        style={{ color: primaryColor }}
                      >
                        {descHeading}
                      </h3>
                    </div>

                    <div className="relative group/descb">
                      {isFullEditable && (
                        <div className="absolute -top-5 left-1 text-[8px] font-black bg-indigo-600 text-white px-1 py-0.2 rounded opacity-0 group-hover/descb:opacity-100 transition pointer-events-none select-none z-10">
                          ✍️ 상세 소개글 본문 전체 (클릭 수정 가능)
                        </div>
                      )}
                      <p 
                        contentEditable={isFullEditable}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          setDescBody(e.currentTarget.textContent || '');
                          triggerFieldIndicator('상세 소개글');
                        }}
                        className={`text-xs sm:text-sm text-gray-500 leading-relaxed font-semibold min-h-[36px] focus:bg-white focus:text-slate-800 focus:outline-none ${editableClass}`}
                      >
                        {descBody}
                      </p>
                    </div>
                  </div>

                  {/* Curated list grids */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {featureList.map((feat, idx) => (
                      <div 
                        key={idx} 
                        className="p-4 rounded-xl border border-gray-150 bg-white shadow-xs flex items-start space-x-2.5 transition hover:shadow-sm"
                        style={{ borderLeftWidth: '4px', borderLeftColor: accentColor }}
                      >
                        <div className="h-5 w-5 rounded-full flex items-center justify-center text-white mt-0.5 shrink-0" style={{ backgroundColor: accentColor }}>
                           <Check className="h-3 w-3" />
                        </div>
                        <div className="space-y-0.5 flex-1 text-left">
                          <div className="relative group/featitem">
                            {isFullEditable && (
                              <span className="absolute -top-4 right-1 text-[7px] font-bold bg-indigo-550 text-white px-1 py-0.2 rounded opacity-0 group-hover/featitem:opacity-100 transition pointer-events-none select-none">
                                ✍️ 수정 가능
                              </span>
                            )}
                            <p 
                              contentEditable={isFullEditable}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const updatedFeatures = [...featureList];
                                updatedFeatures[idx] = e.currentTarget.textContent || '';
                                setFeatureList(updatedFeatures);
                                triggerFieldIndicator('탑재기능 명칭 수정');
                              }}
                              className={`text-xs font-extrabold text-gray-900 min-w-[50px] outline-none block ${editableClass}`}
                            >
                              {feat}
                            </p>
                          </div>
                          <p className="text-[10px] text-gray-400 font-medium select-none">LCI WebStudio에서 직접 코이닝하는 전속 보증 사양입니다.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Action Inquiry banner simulated */}
                <div className="p-8 text-center text-white space-y-4" style={{ backgroundColor: primaryColor }}>
                  <div className="space-y-1">
                    <h4 className="text-lg font-black tracking-tight">당신의 멋진 {siteType} 홈페이지를 함께 지을게요.</h4>
                    <p className="text-[11px] text-white/75 font-semibold">복잡한 기획안이 없어도 가브랜드만 있으면 저희 AI와 전속 작가가 즉시 시범 개발합니다.</p>
                  </div>
                  <button 
                    onClick={handleOrderWithCustomSpecs}
                    className="rounded-xl bg-white text-gray-950 font-extrabold text-xs px-5 py-3 border hover:bg-gray-100 transition-colors pointer-events-none"
                    style={{ color: primaryColor }}
                  >
                    이 시안 그대로 3일 제작 의뢰하기
                  </button>
                </div>

                {/* Preview footer */}
                <footer className="py-6 px-6 text-center text-[10px] text-gray-400 border-t" style={{ borderTopColor: secondaryColor + '10' }}>
                  <p className="font-bold">© 2026 {businessName}. Powered by LCI WebStudio.</p>
                </footer>

              </div>
            </div>

          </div>

          {/* Extra informational guidelines bottom card */}
          <div className="mt-4 rounded-2xl border bg-indigo-50/20 border-indigo-100 p-4 text-left text-xs text-indigo-950 leading-relaxed font-semibold max-w-2xl mx-auto flex gap-3">
            <HelpCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
            <p>
              💡 <strong>디자이너 팁:</strong> 화면 시안 속의 상호명, 슬로건, 설명, 탑재 기능 단어들을 마우스로 <strong>직접 클릭하여 백그라운드 타이핑 수정</strong>해 보세요! 다 수정하신 뒤 우측 상단 <strong>[수정사항 영구 저장]</strong> 단추를 누르면 의뢰 데이터베이스에 즉시 동기화 보전됩니다.
            </p>
          </div>

        </div>

      </div>

      {/* 4. Unsplash curated images picker modal dialogue pop-up */}
      {showImagePicker && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-bg-gray-950/60 p-4 bg-gray-950/60 backdrop-blur-xs animate-fade-in text-left">
          <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 flex flex-col justify-between">
            
            {/* Close button */}
            <button
              onClick={() => setShowImagePicker(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-gray-400 hover:text-gray-650 hover:bg-gray-50 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal contents */}
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-indigo-600 font-mono uppercase">Image Portfolio Picker</span>
                <h3 className="text-xl font-black text-gray-950 tracking-tight">대표 배경 이미지 프리셋 연동</h3>
                <p className="text-xs text-gray-400">선택하신 카테고리에 최적화 배정된 고화질 Unsplash 프로필 원물 사진 리스트입니다.</p>
              </div>

              {/* Photos lists render */}
              <div className="grid grid-cols-2 gap-3.5">
                {Object.entries(LCI_IMAGE_COLLECTIONS).map(([categoryName, imageGroup]) => (
                  <div key={categoryName} className="space-y-1.5">
                    <p className="text-[10px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-widest inline-block">{categoryName} 카테고리</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {imageGroup.map((img, iidx) => (
                        <div
                          key={iidx}
                          onClick={() => handleSelectPredefinedImage(img.url)}
                          className="group relative h-16 rounded-xl overflow-hidden border cursor-pointer hover:border-indigo-600 transition"
                          title={img.title}
                        >
                          <img src={img.url} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-110" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-black/40 flex items-end justify-start p-1 pointer-events-none">
                            <span className="text-[8px] text-white font-semibold truncate w-full">{img.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct url input section */}
              <form onSubmit={handleCustomImageUrlSubmit} className="pt-4 border-t space-y-2">
                <label className="text-xs font-bold text-gray-800">원하는 다른 Unsplash 또는 사용자 사진 URL 주소 직접 입력</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/photo-..."
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="flex-1 border rounded-xl px-3 py-2 text-xs font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-gray-950 text-white rounded-xl px-4 py-2 text-xs font-bold hover:bg-gray-805"
                  >
                    연동 적용
                  </button>
                </div>
              </form>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
