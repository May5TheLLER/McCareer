import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface Props {
  onComplete: () => void;
}

export const Phase1_Hook: React.FC<Props> = ({ onComplete }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showFinalCta, setShowFinalCta] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrolled) {
      const timer = setTimeout(() => setShowFinalCta(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [scrolled]);

  return (
    <div ref={containerRef} className="relative min-h-[150vh] bg-zinc-950 text-white overflow-hidden">
      {/* Sticky Hero Section */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 text-center">
        
        {/* Initial State */}
        <div className={`transition-all duration-1000 absolute inset-0 flex flex-col items-center justify-center bg-black z-20 ${scrolled ? 'opacity-0 pointer-events-none translate-y-[-50px]' : 'opacity-100'}`}>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            只是份<span className="text-zinc-600">打工</span>？
          </h1>
          <p className="text-zinc-400 text-lg animate-pulse mb-12">下滑揭開真相</p>
          <ChevronDown className="w-8 h-8 text-yellow-500 animate-bounce" />
        </div>

        {/* Revealed State */}
        <div className={`transition-all duration-1000 absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 z-10 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[50px]'}`}>
          <div className="max-w-3xl space-y-8 p-6">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-500 to-orange-500">
              其實，這是許多人<br/>第一份領導經驗的起點
            </h2>
            <p className="text-xl text-zinc-300 font-light">
              在這裡，你不只是端盤子。<br/>
              你將學會管理團隊、處理危機、營運千萬營收的店面。
            </p>
            
            <div className={`transition-all duration-700 transform ${showFinalCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button onClick={onComplete} className="text-lg px-8 py-4">
                探索你的職涯地圖 <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};