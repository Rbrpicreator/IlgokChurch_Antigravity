import React, { useState, useEffect } from 'react';
import newsData from './data/news.json';



// --- Header Component ---
function Header({ onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const today = new Date();
  const dateString = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { title: '교회소개', links: ['교회소개', '비전', '표어', '섬기는사람들', '교회연혁', '새가족안내'] },
    { title: '예배/모임', links: ['예배안내&모임안내', '예배다시보기', '새벽기도'] },
    { title: 'LIVE/소식', links: ['예배 LIVE', '주보', '교회소식', '교회앨범', '새가족앨범'] },
    { title: '다음세대', links: ['유치부', '유년부', '중고등부', '청년부'] },
    { title: '섬김/찬양', links: ['찬양팀', '성가대', '섬김과봉사', '수요예배', '금요예배'] }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-5 border-b border-navy-100/50'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center relative">
        <div className={`absolute -top-3 right-4 md:-top-4 md:right-8 transition-opacity duration-300 ${isScrolled ? 'opacity-0 invisible' : 'opacity-100 visible'} text-[11px] md:text-xs font-semibold text-navy-400/80 tracking-wide`}>
          오늘 {dateString}
        </div>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden border border-gray-200">
            <img src="/logo.jpg" alt="일곡교회 로고" className="w-full h-full object-contain p-1" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-navy-500 tracking-tight leading-none mb-0.5">
              대한예수교장로회
            </span>
            <span className="font-extrabold text-2xl tracking-tight text-navy-900 leading-none">
              일곡교회
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8">
          {menuItems.map((item, idx) => (
            <div key={idx} className="relative group">
              <button className="font-bold text-[15px] text-navy-800 hover:text-gold-600 py-2 flex items-center gap-1 transition-colors" onClick={() => onNavigate(item.title)}>
                {item.title}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-50"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-xl rounded-lg border border-navy-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top -translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="py-2">
                  {item.links.map((link, lIdx) => (
                    <button key={lIdx} onClick={(e) => { e.preventDefault(); onNavigate(link); }} className="w-full text-left block px-4 py-2.5 text-sm text-gray-700 hover:bg-gold-50 hover:text-gold-700 hover:font-bold transition-colors">
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-navy-800 focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 max-h-[80vh] overflow-y-auto">
          {menuItems.map((item, idx) => (
            <div key={idx} className="border-b border-gray-50 p-4">
              <div className="font-bold text-navy-800 mb-2">{item.title}</div>
              <div className="grid grid-cols-2 gap-2">
                {item.links.map((link, lIdx) => (
                  <button key={lIdx} onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate(link); }} className="w-full text-left text-sm text-gray-600 py-1 pl-2 border-l-2 border-transparent hover:border-gold-500 hover:text-gold-700 transition-colors">
                    {link}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

// --- Hero Section ---
function Hero({ onNavigate }) {
  return (
    <section className="relative h-[85vh] flex items-center justify-center pt-20 overflow-hidden bg-cover bg-[center_30%] bg-no-repeat" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
      {/* Updated overlay for better text contrast with the church background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-900/60 to-navy-900/80 z-0"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center text-white">
        <div className="inline-block mb-6 px-5 py-1.5 rounded-full bg-navy-800/50 backdrop-blur-md border border-navy-400/30 shadow-lg font-bold text-sm tracking-widest uppercase animate-fade-in-up">
          2026년 표어
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-xl text-white">
          용서 <br className="hidden md:block" />
          <span className="text-gold-400 drop-shadow-lg leading-tight block mt-2">사랑의 시작입니다</span>
        </h1>

        <p className="mt-4 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-light drop-shadow-md text-gray-100">
          대한예수교장로회 일곡교회에 오신 것을 환영합니다
        </p>

        {/* Quick Links Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-3xl">
          {[
            { name: '예배 LIVE', target: '예배 LIVE', href: 'https://www.youtube.com/@%EB%8C%80%ED%95%9C%EC%98%88%EC%88%98%EA%B5%90%EC%9E%A5%EB%A1%9C%ED%9A%8C%EC%9D%BC%EA%B3%A1', icon: 'M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v8.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z', highlight: true },
            { name: '주보보기', target: '주보', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
            { name: '새가족안내', target: '새가족안내', icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' },
            { name: '예배다시보기', target: '예배다시보기', href: 'https://www.youtube.com/@%EB%8C%80%ED%95%9C%EC%98%88%EC%88%98%EA%B5%90%EC%9E%A5%EB%A1%9C%ED%9A%8C%EC%9D%BC%EA%B3%A1', icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z' }
          ].map((btn, idx) => {
            if (btn.href) {
              return (
                <a key={idx} href={btn.href} target="_blank" rel="noopener noreferrer" className={`flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group ${btn.highlight ? 'bg-navy-600/90 border-navy-500 shadow-navy-900/50' : 'bg-white/10 border-white/20 hover:bg-navy-800/60 hover:border-navy-500/50 shadow-black/20'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8 sm:w-10 sm:h-10 mb-3 transition-transform group-hover:scale-110 ${btn.highlight ? 'text-white' : 'text-gold-300'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={btn.icon} />
                  </svg>
                  <span className={`text-sm sm:text-[15px] font-bold ${btn.highlight ? 'text-white' : 'text-gray-100 group-hover:text-gold-100'}`}>{btn.name}</span>
                </a>
              );
            }
            return (
              <button key={idx} onClick={() => onNavigate(btn.target)} className={`flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group ${btn.highlight ? 'bg-navy-600/90 border-navy-500 shadow-navy-900/50' : 'bg-white/10 border-white/20 hover:bg-navy-800/60 hover:border-navy-500/50 shadow-black/20'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8 sm:w-10 sm:h-10 mb-3 transition-transform group-hover:scale-110 ${btn.highlight ? 'text-white' : 'text-gold-300'}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={btn.icon} />
                </svg>
                <span className={`text-sm sm:text-[15px] font-bold ${btn.highlight ? 'text-white' : 'text-gray-100 group-hover:text-gold-100'}`}>{btn.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Absolute wave shape for transition */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
        <svg fill="#f9fafb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-12 md:h-16 transform rotate-180">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.06,130.83,120.24,192.39,106.94Z" />
        </svg>
      </div>
    </section>
  );
}

// --- Sermon & News Section ---
function ContentSections() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="bg-gray-50 py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* 설교영상 (유튜브 스타일 가로 스크롤) */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-end mb-6 border-b-2 border-navy-800 pb-2">
            <h2 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-gold-500 animate-pulse"></span>
              설교 영상
            </h2>
            <a href="https://www.youtube.com/@%EB%8C%80%ED%95%9C%EC%98%88%EC%88%98%EA%B5%90%EC%9E%A5%EB%A1%9C%ED%9A%8C%EC%9D%BC%EA%B3%A1" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-500 hover:text-navy-600 transition-colors">유튜브 바로가기 &gt;</a>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
            {[
              {
                title: '일곡교회 주일대예배(26.3.1) (신명기 24:17~22절 / 종 되었던 것을 기억하라) - 김예준 목사',
                views: '조회수 26회',
                time: '스트리밍 시간: 5일 전',
                duration: '2:56:54',
                videoId: 'l4ARwwG_10c', // <-- 실제 유튜브 영상 ID로 변경해주세요
                img: '/thumb-01.png'
              },
              {
                title: '일곡교회 주일대예배(26.2.22) (신명기 6:1~9절 / 이스라엘아 들으라) - 오상현 목사',
                views: '조회수 34회',
                time: '스트리밍 시간: 1주 전',
                duration: '1:26:17',
                videoId: 'yPFVLsfspSk', // <-- 실제 유튜브 영상 ID로 변경해주세요
                img: '/thumb-02.png'
              },
              {
                title: '일곡교회 주일대예배(26.2.15) (마태복음 5:1~12절 / 예수님의 산상수훈) - 이영진 목사',
                views: '조회수 39회',
                time: '스트리밍 시간: 2주 전',
                duration: '1:18:29',
                videoId: 'GgbPvxrBJI', // <-- 실제 유튜브 영상 ID로 변경해주세요
                img: '/thumb-03.png'
              },
              {
                title: '일곡교회 주일대예배(23.3.19) (로마서 2:1~11 / 남을 판단하는 사람아)',
                views: '조회수 44회',
                time: '2년 전',
                duration: '1:19:13',
                videoId: 'C7d4aU2d43E', // <-- 실제 유튜브 영상 ID로 변경해주세요
                img: '/thumb-04.png'
              }
            ].map((sermon, idx) => (
              <button key={idx} onClick={() => setActiveVideo(sermon.videoId)} className="block group cursor-pointer w-72 md:w-80 flex-none snap-start text-left focus:outline-none">
                <div className="relative aspect-video mb-3 bg-gray-200 rounded-xl overflow-hidden">
                  <img src={sermon.img} alt={sermon.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />

                  {/* Duration Badge */}
                  <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                    {sermon.duration}
                  </div>

                  {/* Hover Play IconOverlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <div className="flex gap-3 px-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[16px] text-[#0f0f0f] font-medium leading-tight mb-1 line-clamp-2 md:line-clamp-2 group-hover:text-navy-700 transition-colors">
                      {sermon.title}
                    </h3>
                    <div className="text-[13px] text-[#606060] flex items-center gap-1 mt-1">
                      <span>{sermon.views}</span>
                      <span className="text-[10px]">•</span>
                      <span>{sermon.time}</span>
                    </div>
                  </div>
                  <div className="pt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-navy-900"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" /></svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>

        {/* 교회소식 */}
        <div>
          <div className="flex justify-between items-end mb-6 border-b-2 border-navy-800 pb-2">
            <h2 className="text-2xl font-extrabold text-navy-900">교회소식</h2>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-navy-600 transition-colors">더보기 +</a>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <ul className="divide-y divide-gray-100">
              {newsData.map((news, idx) => (
                <li key={idx} className="py-3.5 first:pt-0 last:pb-0 group">
                  <a href="#" className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      {news.new && <span className="bg-gold-100 text-gold-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-gold-200">N</span>}
                      <span className="text-gray-800 font-medium truncate group-hover:text-navy-600 transition-colors">{news.title}</span>
                    </div>
                    <span className="text-xs text-gray-400">{news.date}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl transition-all duration-300 transform scale-100">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}

// --- New Members Section ---
function NewMembers() {
  const members = [
    { name: '양회용 집사', date: '02.01' },
    { name: '도혜선 성도', date: '02.01' },
    { name: '김복동 성도', date: '01.18' },
    { name: '박찬웅 성도', date: '12.28' },
    { name: '구희영 성도', date: '12.07' },
    { name: '신삼례 성도', date: '11.23' }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-navy-900 mb-3">새가족 등록</h2>
          <p className="text-gray-500">일곡교회의 새 가족이 되신 분들을 환영하고 축복합니다.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {members.map((member, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100 hover:border-navy-200 hover:shadow-md transition-all group cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-navy-50 text-navy-400 rounded-full flex items-center justify-center mb-4 group-hover:bg-navy-600 group-hover:text-white transition-colors border border-navy-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{member.name}</h4>
              <p className="text-xs text-gray-400">{member.date} 등록</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100 py-12 border-t-4 border-gold-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">

        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-inner border border-gray-200 overflow-hidden">
              <img src="/logo.jpg" alt="일곡교회 로고" className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-navy-300 mb-1">
                대한예수교장로회
              </span>
              <span className="font-extrabold text-3xl text-white tracking-tight leading-none">
                일곡교회
              </span>
            </div>
          </div>
          <div className="text-sm text-navy-300 text-center md:text-left leading-loose mt-2">
            <strong>광주 북구 일곡로49번길 1 일곡교회</strong><br />
            TEL. (062) 572-4271 &nbsp;|&nbsp; FAX. (062) 572-4273<br />
            E-mail. ilgoklife@naver.com
          </div>
        </div>

        <div className="flex gap-4">
          <button className="bg-navy-800 hover:bg-navy-700 border border-navy-700 hover:border-navy-600 transition-colors rounded-full px-6 py-3 font-semibold text-sm flex items-center gap-2 text-white shadow-sm">
            찾아오시는 길
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </button>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-10 pt-6 border-t border-navy-800 text-xs text-navy-500 text-center md:text-left">
        Copyright © ILGOK CHURCH. All Rights Reserved.
      </div>
    </footer>
  );
}

// --- Detail Page ---
function DetailPage({ page, onBack }) {
  const pageContent = {
    '교회소개': {
      title: '교회소개',
      subtitle: '일곡교회의 비전과 연혁을 소개합니다.',
      content: (
        <div className="space-y-8 text-neutral-800">
          <div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4 border-b-2 border-gold-500 inline-block pb-1">우리 교회는</h3>
            <p className="leading-relaxed">
              대한예수교장로회 일곡교회는 1990년 창립 이래 <strong>"말씀과 기도로 거룩해지는 공동체"</strong>를 지향하며 지역사회와 열방을 섬기고 있습니다. 하나님을 기쁘시게, 사람을 행복하게 하는 교회가 되기 위해 오늘도 온 성도가 한 마음으로 달려가고 있습니다.
            </p>
          </div>
          <div className="bg-navy-50 p-6 rounded-xl border border-navy-100">
            <h3 className="text-xl font-bold text-navy-800 mb-4">핵심 가치</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start"><span className="text-gold-600 font-bold">1.</span> <strong>영감 넘치는 예배:</strong> 신령과 진정으로 드려지는 생명력 있는 예배</li>
              <li className="flex gap-3 items-start"><span className="text-gold-600 font-bold">2.</span> <strong>체계적인 양육:</strong> 영적 어린아이에서 그리스도의 장성한 분량까지 자라나는 훈련</li>
              <li className="flex gap-3 items-start"><span className="text-gold-600 font-bold">3.</span> <strong>뜨거운 선교:</strong> 땅끝까지 복음을 전하는 사명을 감당하는 교회</li>
              <li className="flex gap-3 items-start"><span className="text-gold-600 font-bold">4.</span> <strong>풍성한 교제:</strong> 성도 간의 사랑과 나눔이 있는 따뜻한 공동체</li>
            </ul>
          </div>
        </div>
      )
    },
    '예배안내&모임안내': {
      title: '예배 및 모임 안내',
      subtitle: '일곡교회의 예배 시간과 각종 모임을 안내해 드립니다.',
      content: (
        <div className="space-y-8 text-neutral-800">
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-navy-800 text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold">집회명</th>
                  <th scope="col" className="px-6 py-4 font-bold">대상</th>
                  <th scope="col" className="px-6 py-4 font-bold">시간</th>
                  <th scope="col" className="px-6 py-4 font-bold">장소</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">주일 1부 예배</td>
                  <td className="px-6 py-4">장년</td>
                  <td className="px-6 py-4">주일 오전 09:00</td>
                  <td className="px-6 py-4">본당 (3층)</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">주일 2부 예배</td>
                  <td className="px-6 py-4">장년</td>
                  <td className="px-6 py-4">주일 오전 11:00</td>
                  <td className="px-6 py-4">본당 (3층)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">오후 찬양예배</td>
                  <td className="px-6 py-4">전교인</td>
                  <td className="px-6 py-4">주일 오후 02:00</td>
                  <td className="px-6 py-4">본당 (3층)</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">수요 기도회</td>
                  <td className="px-6 py-4">전교인</td>
                  <td className="px-6 py-4">수요일 오후 07:30</td>
                  <td className="px-6 py-4">본당 (3층)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">새벽 기도회</td>
                  <td className="px-6 py-4">전교인</td>
                  <td className="px-6 py-4">월~금 오전 05:00</td>
                  <td className="px-6 py-4">소예배실 (2층)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  };

  const currentContent = pageContent[page] || {
    title: page,
    subtitle: '해당 페이지는 준비 중입니다.',
    content: (
      <div className="py-20 text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-gray-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-xl font-medium">콘텐츠를 준비 중입니다.</p>
        <p className="mt-2 text-sm text-gray-400">빠른 시일 내에 업데이트하겠습니다.</p>
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Sub Visual Header */}
      <div className="bg-navy-900 py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-hero-pattern bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-navy-800/80 border border-navy-500/30 text-gold-400 text-xs font-bold tracking-widest">
            2026년 표어: 용서 사랑의 시작입니다
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{currentContent.title}</h1>
          <p className="text-navy-200 text-lg">{currentContent.subtitle}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        <button onClick={onBack} className="flex items-center gap-2 text-navy-600 hover:text-navy-900 mb-8 font-medium transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          메인으로 돌아가기
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          {currentContent.content}
        </div>
      </div>
    </div>
  );
}

// --- Main App ---
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-gold-200 selection:text-navy-900">
      <Header onNavigate={navigateTo} />

      {currentPage === 'home' ? (
        <main>
          <Hero onNavigate={navigateTo} />
          <ContentSections />
          <NewMembers />
        </main>
      ) : (
        <DetailPage page={currentPage} onBack={() => navigateTo('home')} />
      )}

      <Footer />
    </div>
  );
}

export default App;
