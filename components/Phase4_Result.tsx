import React, { useRef } from 'react';
import { UserStats, CareerNode } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Button } from './Button';
import { Share2, Download, Gift, RotateCcw, TrendingUp, BookOpen, Lock, Unlock } from 'lucide-react';

interface Props {
  stats: UserStats;
  currentRoleNode?: CareerNode;
  nextRoleNode?: CareerNode;
  onRestart: () => void;
  onUnlockNext?: () => void;
}

export const Phase4_Result: React.FC<Props> = ({ stats, currentRoleNode, nextRoleNode, onRestart, onUnlockNext }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const data = [
    { subject: '領導力', A: stats.leadership, fullMark: 100 },
    { subject: '溝通', A: stats.communication, fullMark: 100 },
    { subject: '危機處理', A: stats.crisisManagement, fullMark: 100 },
    { subject: '適應力', A: stats.adaptability, fullMark: 100 },
    { subject: '顧客服務', A: stats.customerService, fullMark: 100 },
  ];

  const bestTrait = Object.entries(stats).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  
  const traitTitles: Record<string, string> = {
    leadership: '天生領袖',
    communication: '溝通大師',
    crisisManagement: '冷靜指揮官',
    adaptability: '變色龍',
    customerService: '人氣王'
  };

  return (
    <div className="min-h-screen bg-white text-[#292929] pb-20 flex flex-col items-center">
      
      <header className="text-center py-10 px-4">
        <h2 className="text-3xl font-black mb-2 text-[#db0007]">你的職涯潛力分析</h2>
        <p className="text-gray-500">恭喜完成 {currentRoleNode?.title || '職位'} 模擬挑戰</p>
      </header>

      <div className="w-full max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Column: Result Card */}
        <div ref={cardRef} className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 w-full md:w-1/2 relative overflow-hidden">
          
          {/* Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffbc0d]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#db0007]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#db0007] text-white w-8 h-8 rounded flex items-center justify-center font-black text-sm">M</div>
              <span className="font-bold text-gray-800">Pro Career</span>
            </div>
            <div className="text-gray-400 text-xs font-medium">#從打工到專業</div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-2">經由 AI 判定你的核心優勢</h3>
            <div className="text-4xl font-black text-[#292929]">
              {traitTitles[bestTrait]}
            </div>
          </div>

          <div className="h-64 w-full mb-8 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }} />
                <Radar
                  name="User"
                  dataKey="A"
                  stroke="#db0007"
                  strokeWidth={3}
                  fill="#ffbc0d"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl text-center mb-6 border border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">
              你展現了極高的<span className="text-[#db0007] font-bold">潛力</span>。
              這些能力正是 <span className="underline decoration-[#ffbc0d] decoration-4 underline-offset-2 font-bold">{currentRoleNode?.title}</span> 所需要的。
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-[#292929] hover:bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
              <Share2 className="w-4 h-4" /> 分享 IG
            </button>
            <button className="flex-1 bg-white border-2 border-gray-200 hover:border-[#db0007] hover:text-[#db0007] text-gray-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
              <Download className="w-4 h-4" /> 下載
            </button>
          </div>
        </div>

        {/* Right Column: Benefits & Next Steps (The "Why Join" part) */}
        <div className="w-full md:w-1/2 space-y-6">
          
          {/* Benefits Card */}
          <div className="bg-gradient-to-br from-[#fff9e6] to-white p-6 rounded-3xl border border-[#ffeeba] shadow-sm">
            <h3 className="text-xl font-bold text-[#b45309] mb-4 flex items-center gap-2">
              <Gift className="w-6 h-6" /> 加入 {currentRoleNode?.title} 的專屬福利
            </h3>
            <ul className="space-y-3">
              {currentRoleNode?.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 bg-white/60 p-3 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-[#ffbc0d] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Promotion Path Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-[#db0007]"></div>
             <h3 className="text-xl font-bold text-[#292929] mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#db0007]" /> 未來晉升地圖
            </h3>
            
            <div className="mb-6">
              <div className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-2">晉升條件與培訓</div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-gray-400 mt-1" />
                <p className="text-gray-600 leading-relaxed">{currentRoleNode?.trainingPath}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-[#292929]">
              <div className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">下一階段展望</div>
              <p className="text-gray-800 font-medium">{currentRoleNode?.futureProspect}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4">
            {nextRoleNode ? (
              <Button 
                fullWidth 
                className="py-4 text-lg shadow-xl animate-pulse"
                onClick={onUnlockNext}
              >
                <Unlock className="w-5 h-5" /> 解鎖下一職位：{nextRoleNode.title}
              </Button>
            ) : (
               <Button fullWidth className="py-4 text-lg shadow-xl" onClick={onRestart}>
                 <RotateCcw className="w-5 h-5" /> 回到職涯地圖
               </Button>
            )}
            
            {nextRoleNode && (
              <p className="text-center text-xs text-gray-400 mt-3">
                點擊解鎖即可在職涯地圖中查看 {nextRoleNode.title}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};