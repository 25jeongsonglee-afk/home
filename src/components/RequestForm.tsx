import React, { useState, useEffect } from 'react';
import { ProjectSpecs, User, AIProposal } from '../types';
import { store } from '../store';
import { Upload, Sparkles, Send, Check, ShieldCheck, Cpu, Play, AlertCircle, Trash2 } from 'lucide-react';

interface RequestFormProps {
  currentUser: User | null;
  onLoginClick: () => void;
  onSubmitSuccess: () => void;
  selectedTier?: 'BASIC' | 'STANDARD' | 'PREMIUM';
  customSessionSpecs?: any;
}

export default function RequestForm({ currentUser, onLoginClick, onSubmitSuccess, selectedTier, customSessionSpecs }: RequestFormProps) {
  // Contact details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Project specs
  const [businessName, setBusinessName] = useState('');
  const [type, setType] = useState<ProjectSpecs['type']>('기업 홈페이지');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [colorScheme, setColorScheme] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [customFeature, setCustomFeature] = useState('');

  // Upload simulation
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoFileName, setLogoFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // AI loading and proposal states
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiProposal, setAiProposal] = useState<AIProposal | null>(null);
  const [success, setSuccess] = useState(false);

  // Pre-populate fields when user is logged in
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);

  // Handle selected pre-filled tier from Pricing
  useEffect(() => {
    if (selectedTier) {
      if (selectedTier === 'BASIC') {
        setType('기업 홈페이지');
      } else if (selectedTier === 'STANDARD') {
        setType('예약 사이트');
      } else {
        setType('쇼핑몰 랜딩페이지');
      }
    }
  }, [selectedTier]);

  // Handle custom session specs passed from PreviewEditor
  useEffect(() => {
    if (customSessionSpecs) {
      if (customSessionSpecs.businessName) setBusinessName(customSessionSpecs.businessName);
      if (customSessionSpecs.type) setType(customSessionSpecs.type);
      if (customSessionSpecs.colorScheme) setColorScheme(customSessionSpecs.colorScheme);
      if (customSessionSpecs.features) setFeatures(customSessionSpecs.features);
      if (customSessionSpecs.logoFileName) setLogoFileName(customSessionSpecs.logoFileName);
      // Pre-set preview as AI proposal if they edited it
      if (customSessionSpecs.slogan) {
        setAiProposal({
          slogan: customSessionSpecs.slogan,
          concept: customSessionSpecs.concept || '',
          colorPalette: {
            primary: '#0F172A',
            secondary: '#1E3A8A',
            accent: '#3B82F6',
            background: '#F8FAFC'
          },
          recommendedSections: (customSessionSpecs.features || []).map((feat: string, idx: number) => ({
            title: feat,
            description: '실시간 편집기에서 특별 설계해 보정 편집한 필수 모듈 세트 사안입니다.',
            suggestedLayout: '반응형 와이드 레이아웃'
          })),
          marketingAdvice: '사용자 직접 실감 에디터를 거쳐 특화 설계가 마쳤습니다! 정식 검수 후 지체 없이 바로 착공됩니다.'
        });
      }
    }
  }, [customSessionSpecs]);

  const defaultFeaturePresets = [
    '메인 이메일 문의폼',
    '이용자 예약 달력',
    '카카오 비즈톡 상담 링크',
    '게시판/공지 아카이브',
    '네이버 스마트플레이스 연동',
    '인스타그램 미디어 피드 파싱'
  ];

  const handleFeatureToggle = (feat: string) => {
    if (features.includes(feat)) {
      setFeatures(features.filter(f => f !== feat));
    } else {
      setFeatures([...features, feat]);
    }
  };

  const handleAddCustomFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (customFeature.trim() && !features.includes(customFeature.trim())) {
      setFeatures([...features, customFeature.trim()]);
      setCustomFeature('');
    }
  };

  // Mock upload logic supporting drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setLogoFile(file);
      setLogoFileName(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoFileName(file.name);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoFileName('');
  };

  // Generate real or fallback AI Blueprint live
  const handleGenerateAIProposal = async () => {
    if (!businessName) {
      alert('AI 기획 분석을 하려면 먼저 브랜드 이름(비즈니스 이름)을 입력해 주시기 바랍니다.');
      return;
    }

    setAiGenerating(true);
    setAiProposal(null);

    const specs: ProjectSpecs = {
      type,
      referenceUrl,
      colorScheme,
      features,
      logoFileName,
      businessName
    };

    try {
      // Call store-level API helper
      const proposal = await store.generateAIProposalServer(specs);
      setAiProposal(proposal);
    } catch (err) {
      console.error(err);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onLoginClick();
      return;
    }

    const specs: ProjectSpecs = {
      type,
      referenceUrl,
      colorScheme,
      features,
      logoFileName,
      businessName
    };

    // Save project request to localStorage store
    const newProj = store.addRequest(specs, email, name, phone);

    // If AI proposal was generated during session, bind it to project as well!
    if (aiProposal) {
      store.setProjectAIProposal(newProj.id, aiProposal);
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onSubmitSuccess();
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      
      {/* Page Title */}
      <div className="text-center space-y-3.5 pb-8 border-b border-gray-100">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Instant Order
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">구체적인 홈페이지 제작 의뢰</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          몇 가지 양식을 작성해 전송하시면 전속 담당 디자이너 배정 후 즉시 시범 개발 서버 구축 전 공정에 돌입합니다.
        </p>
      </div>

      {!currentUser && (
        <div className="rounded-3xl bg-indigo-50/50 border border-indigo-150 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1.5 max-w-xl">
            <h4 className="text-sm font-extrabold text-indigo-950 flex items-center gap-1.5">
              <Cpu className="h-4.5 w-4.5 text-indigo-600 animate-pulse" />
              <span>로그인 후 간지나게 마이페이지 연계하기</span>
            </h4>
            <p className="text-xs text-indigo-900 leading-relaxed font-semibold">
              지금 구글 간편 연계 로그인을 진행하면 본 신청 명세가 실시간 귀사 정식 마이페이지에 매핑되어 조율 일람과 progress Bar를 3일 내내 가시적으로 추적할 수 있게 됩니다.
            </p>
          </div>
          <button
            onClick={onLoginClick}
            id="form-login-now-btn"
            className="rounded-xl px-5 py-2.5 text-xs font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md cursor-pointer shrink-0"
          >
            지금 로그인하기
          </button>
        </div>
      )}

      {success ? (
        /* Success screen sequence */
        <div className="rounded-3xl border border-emerald-150 bg-emerald-50/20 p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-150 text-emerald-600 border border-emerald-250 animate-bounce">
            <Check className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900">제작 의뢰서 전송 성공!</h3>
            <p className="text-xs text-gray-500 font-semibold leading-relaxed">
              성공적으로 시스템 조율 데이터베이스에 접수 완료되었으며 마이페이지가 자동으로 업데이트됩니다. 잠시 후 안내 창으로 복귀합니다!
            </p>
          </div>
        </div>
      ) : (
        /* Main Submission Form Layout */
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Left panel logic forms */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Contact detail forms */}
            <div className="space-y-4 border-b pb-6">
              <p className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
                <span className="h-5 w-5 rounded-full bg-indigo-600 text-white font-mono text-[10px] flex items-center justify-center">1</span>
                <span>기본 정보 (신청인)</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">이름 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full border rounded-xl p-3 text-xs sm:text-sm text-gray-800 font-semibold focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">이메일 주소 <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="customer@example.com"
                    className="w-full border rounded-xl p-3 text-xs sm:text-sm text-gray-800 font-semibold focus:border-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-800">연락처 <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-1234-5678"
                  className="w-full border rounded-xl p-3 text-xs sm:text-sm text-gray-800 font-semibold focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </div>
            </div>

            {/* Step 2: Site details forms */}
            <div className="space-y-4 border-b pb-6">
              <p className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
                <span className="h-5 w-5 rounded-full bg-indigo-600 text-white font-mono text-[10px] flex items-center justify-center">2</span>
                <span>홈페이지 명세 정보</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">홈페이지 브랜드 이름 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="예: 소소한 가드닝 샵"
                    className="w-full border rounded-xl p-3 text-xs sm:text-sm text-gray-800 font-semibold focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">홈페이지 종류 <span className="text-red-500">*</span></label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full border bg-white rounded-xl p-3 text-xs sm:text-sm text-gray-800 font-bold focus:border-indigo-600 focus:outline-none"
                  >
                    <option value="기업 홈페이지">기업 홈페이지 (10만원~)</option>
                    <option value="행사 홈페이지">행사 홈페이지 (15만원~)</option>
                    <option value="포트폴리오 사이트">포트폴리오 사이트 (10만원~)</option>
                    <option value="예약 사이트">예약 사이트 (20만원~)</option>
                    <option value="쇼핑몰 랜딩페이지">쇼핑몰 랜딩페이지 (30만원~)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">원동하는 참고 웹페이지 주소</label>
                  <input
                    type="url"
                    value={referenceUrl}
                    onChange={(e) => setReferenceUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full border rounded-xl p-3 text-xs sm:text-sm text-indigo-900 font-semibold focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">원하는 브랜드 색상 및 무드</label>
                  <input
                    type="text"
                    value={colorScheme}
                    onChange={(e) => setColorScheme(e.target.value)}
                    placeholder="예: 스위스 가구 풍의 올리브에 블랙"
                    className="w-full border rounded-xl p-3 text-xs sm:text-sm text-gray-800 font-semibold focus:border-indigo-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Required specs preset / customized addons selection */}
            <div className="space-y-4 border-b pb-6">
              <p className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
                <span className="h-5 w-5 rounded-full bg-indigo-600 text-white font-mono text-[10px] flex items-center justify-center">3</span>
                <span>원하는 필수 탑재 기능 선택</span>
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {defaultFeaturePresets.map((preset) => {
                  const active = features.includes(preset);
                  return (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => handleFeatureToggle(preset)}
                      className={`p-3 rounded-xl border text-xs font-bold text-left flex justify-between items-center transition-all ${
                        active 
                          ? 'border-indigo-600 bg-indigo-50/40 text-indigo-950 shadow-sm' 
                          : 'border-gray-150 hover:border-gray-300 text-gray-500'
                      }`}
                    >
                      <span>{preset}</span>
                      <span className={`h-4.5 w-4.5 rounded-full flex items-center justify-center text-9px border ${
                        active ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 text-transparent'
                      }`}>
                        ✔
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Addon item */}
              <div className="flex gap-2.5 pt-1.5">
                <input
                  type="text"
                  value={customFeature}
                  onChange={(e) => setCustomFeature(e.target.value)}
                  placeholder="추가하실 맞춤 개성 기능을 수집하세요"
                  className="flex-1 text-xs sm:text-sm border rounded-xl p-3 focus:outline-none focus:border-indigo-600 font-semibold"
                />
                <button
                  type="button"
                  onClick={handleAddCustomFeature}
                  className="rounded-xl px-4 bg-gray-950 hover:bg-gray-900 text-xs text-white font-bold cursor-pointer"
                >
                  기능 추가
                </button>
              </div>
            </div>

            {/* Step 4: Logo file upload drag & drop selector */}
            <div className="space-y-4">
              <p className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
                <span className="h-5 w-5 rounded-full bg-indigo-600 text-white font-mono text-[10px] flex items-center justify-center">4</span>
                <span>로고 및 참고 원물 파일 업로드</span>
              </p>

              {/* Drag drop area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload-input')?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-2.5 select-none ${
                  isDragging 
                    ? 'border-indigo-600 bg-indigo-50/20' 
                    : (logoFileName ? 'border-indigo-300 bg-indigo-50/5' : 'border-gray-250 bg-gray-50/70 hover:bg-gray-100/50')
                }`}
              >
                <input
                  type="file"
                  id="file-upload-input"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.zip"
                />

                {logoFileName ? (
                  <>
                    <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center border border-indigo-200">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-extrabold text-gray-900 truncate max-w-[200px]">{logoFileName}</p>
                      <p className="text-[10px] text-emerald-500 font-bold">성공적으로 로컬 임시 마운트 세팅 완료</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLogo();
                      }}
                      className="inline-flex items-center gap-1 text-[10px] text-red-505 font-extrabold hover:underline"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>파일 제거</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="text-xs font-bold text-gray-800">로고 이미지 드래그&드롭 하거나 클릭하여 찾아보기</p>
                    <p className="text-10px text-gray-400 leading-none">PNG, JPG, SVG 등 최대 20MB 지원</p>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Right panel logic (Interactive AI Blueprint) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-indigo-100 rounded-3xl bg-indigo-50/5 p-6 space-y-5 shadow-sm text-left sticky top-24">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <p className="text-xs font-extrabold text-indigo-600 tracking-wider flex items-center gap-1.5 uppercase">
                  <Cpu className="h-4 w-4 animate-pulse" />
                  <span>Real-time AI Blueprint</span>
                </p>
                <span className="text-[10px] rounded bg-purple-100 text-purple-700 border border-purple-200 font-mono font-bold px-1.5 py-0.5">
                  VITE-GEMINI
                </span>
              </div>

              {/* Guidance context */}
              <div className="space-y-1 text-xs">
                <h4 className="font-extrabold text-gray-900">제작 전 AI 홈페이지 기획 분석</h4>
                <p className="text-gray-500 leading-normal font-semibold">
                  브랜드 이름을 입력하신 후 아래 단추를 클릭해 보세요! LCI 고유의 Gemini 3.5 모델이 제작 착수 전에 맞춤형 브랜드 슬라임, 최상급 배색 조합, 추천 컴포넌트 목록을 실시간 추출해 드립니다.
                </p>
              </div>

              {/* Main AI Generation view card */}
              <div className="border rounded-2xl bg-white p-4.5 min-h-[160px] flex flex-col justify-between shadow-inner">
                {aiGenerating ? (
                  <div className="flex-1 py-8 flex flex-col items-center justify-center space-y-3.5 text-center">
                    <div className="h-10 w-10 rounded-full border-2 border-indigo-100 border-t-indigo-600 animate-spin" />
                    <p className="text-[11px] font-bold text-indigo-500 font-mono animate-pulse">LCI Gemini 엔진 기획서 도안하는 중...</p>
                  </div>
                ) : aiProposal ? (
                  /* Display AI proposal output beautifully */
                  <div className="space-y-4 text-xs">
                    <div>
                      <p className="text-[9px] uppercase font-mono font-bold text-indigo-500">AI 추천 슬로건</p>
                      <p className="text-sm font-black text-gray-950 mt-0.5 italic">"{aiProposal.slogan}"</p>
                    </div>

                    <div>
                      <p className="text-[9px] uppercase font-mono font-bold text-indigo-500">브랜드 컨셉</p>
                      <p className="text-[11px] text-gray-600 font-semibold leading-relaxed mt-0.5">{aiProposal.concept}</p>
                    </div>

                    {/* Palette inline nodes */}
                    <div className="grid grid-cols-4 gap-1.5 pt-1 text-center font-mono text-[9px] font-bold text-gray-500">
                      <div className="space-y-1">
                        <div className="h-6 w-full rounded border shadow-inner" style={{ backgroundColor: aiProposal.colorPalette.primary }} />
                        <p className="truncate">{aiProposal.colorPalette.primary}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-6 w-full rounded border shadow-inner" style={{ backgroundColor: aiProposal.colorPalette.secondary }} />
                        <p className="truncate">{aiProposal.colorPalette.secondary}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-6 w-full rounded border shadow-inner" style={{ backgroundColor: aiProposal.colorPalette.background }} />
                        <p className="truncate">{aiProposal.colorPalette.background}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-6 w-full rounded border shadow-inner" style={{ backgroundColor: aiProposal.colorPalette.accent }} />
                        <p className="truncate text-indigo-600 font-black">{aiProposal.colorPalette.accent}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg border text-[10px] space-y-1">
                      <p className="font-extrabold text-indigo-950">💡 추천 전략:</p>
                      <p className="text-gray-500 font-semibold leading-tight">{aiProposal.marketingAdvice}</p>
                    </div>
                  </div>
                ) : (
                  /* Initial ungenerated placeholder */
                  <div className="flex-1 py-8 flex flex-col items-center justify-center space-y-2 text-center text-gray-400">
                    <Sparkles className="h-8 w-8 text-indigo-300 animate-bounce" style={{ animationDuration: '4s' }} />
                    <p className="text-xs font-bold font-sans">브랜드 전송 분석 준비 완료</p>
                    <p className="text-[10px]">왼측 요건을 채운 후 아래 기획서 버튼을 구동하세요.</p>
                  </div>
                )}
              </div>

              {/* Trigger button for Gemini API proposal */}
              <button
                type="button"
                onClick={handleGenerateAIProposal}
                disabled={aiGenerating}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 text-xs text-white font-black tracking-tight shadow-md flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                <span>AI 초안 기획서 즉시 받기</span>
              </button>

              <div className="h-1px w-full bg-indigo-100 my-2" />

              {/* Submitting button containing direct request forms */}
              <button
                type="submit"
                id="form-submit-project-btn"
                className="w-full py-4 rounded-2xl bg-gray-950 hover:bg-gray-900 text-xs sm:text-sm font-black text-white shadow-xl flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>정식 홈페이지 제작 신청서 전송</span>
              </button>

              <div className="flex items-center justify-center space-x-1 text-[10px] text-gray-400 font-bold">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                <span>안전 보증 통신 및 3일 제작 에스크로 시스템 발령</span>
              </div>

            </div>
          </div>

        </form>
      )}

    </div>
  );
}
