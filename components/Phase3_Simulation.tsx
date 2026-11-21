import React, { useState, useEffect } from 'react';
import { Bot, Zap, Brain, Heart, ArrowRight } from 'lucide-react';
import { UserStats } from '../types';
import { Button } from './Button';
import { generateSimulationScenario } from '../services/geminiService';

interface Props {
  roleTitle: string;
  onComplete: (finalStats: UserStats) => void;
}

export const Phase3_Simulation: React.FC<Props> = ({ roleTitle, onComplete }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [scenario, setScenario] = useState<any>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [stats, setStats] = useState<UserStats>({
    leadership: 20,
    communication: 20,
    crisisManagement: 20,
    adaptability: 20,
    customerService: 20
  });

  const loadScenario = async () => {
    setLoading(true);
    setFeedback(null);
    // Simulate progression: Easy -> Hard
    const difficulty = step === 0 ? 'Easy' : 'Hard';
    
    // Use the roleTitle passed from props to generate specific RAG content
    const data = await generateSimulationScenario(roleTitle, difficulty);
    setScenario(data);
    setLoading(false);
  };

  useEffect(() => {
    loadScenario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleOptionSelect = (option: any) => {
    const skillMap: Record<string, keyof UserStats> = {
      'Leadership': 'leadership',
      'Communication': 'communication',
      'Crisis Management': 'crisisManagement',
      'Adaptability': 'adaptability',
      'Customer Service': 'customerService'
    };

    const skillKey = skillMap[option.primarySkill] || 'leadership';
    
    setStats(prev => ({
      ...prev,
      [skillKey]: Math.min(100, prev[skillKey] + 25)
    }));

    setFeedback(option.feedback);
  };

  const handleNext = () => {
    if (step >= 1) { // 2 questions total for demo
      onComplete(stats);
    } else {
      setStep(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Stats Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-16 z-10 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-[#db0007] text-white px-3 py-1 rounded font-bold text-sm">
              {roleTitle} 模擬中
            </span>
            <span className="text-gray-500 font-medium">第 {step + 1}/2 關</span>
          </div>
          
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#ffbc0d]" /> 
              <span>決策力 Lv.{Math.floor((stats.leadership + stats.crisisManagement)/20)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#db0007]" /> 
              <span>服務心 Lv.{Math.floor((stats.communication + stats.customerService)/20)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-3xl mx-auto w-full">
        {loading ? (
          <div className="text-center space-y-6 animate-pulse">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Bot className="w-10 h-10 text-[#db0007]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#292929] mb-2">AI 正在生成現場狀況...</h3>
              <p className="text-gray-500 text-sm">正在檢索 {roleTitle} 相關 SOP 與歷史案例 (RAG)</p>
            </div>
          </div>
        ) : scenario ? (
          <div className="w-full space-y-8 animate-[fadeIn_0.5s_ease-out]">
            
            {/* Scenario Context */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#ffbc0d]"></div>
              
              <div className="flex gap-6">
                <div className="hidden md:flex flex-col items-center gap-2">
                   <div className="w-12 h-12 bg-[#db0007]/10 rounded-full flex items-center justify-center">
                     <Bot className="w-6 h-6 text-[#db0007]" />
                   </div>
                   <div className="h-full w-0.5 bg-gray-100"></div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">情境發生</h3>
                  <p className="text-xl text-[#292929] leading-relaxed font-medium mb-6">
                    {scenario.context}
                  </p>
                  <div className="bg-[#fff9e6] p-4 rounded-xl border border-[#ffeeba]">
                    <p className="text-[#b45309] font-bold text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      任務：{scenario.question}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Options */}
            {!feedback ? (
              <div className="grid gap-4">
                {scenario.options.map((opt: any) => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionSelect(opt)}
                    className="w-full text-left p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-[#ffbc0d] hover:shadow-lg hover:-translate-y-0.5 transition-all group relative overflow-hidden"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 group-hover:bg-[#ffbc0d] group-hover:text-black transition-colors shrink-0">
                        {opt.id}
                      </div>
                      <span className="text-lg text-gray-700 font-medium group-hover:text-black">{opt.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              /* Feedback State */
              <div className="space-y-6 animate-[slideUp_0.3s_ease-out]">
                <div className="bg-white border-l-4 border-[#27ae60] p-6 rounded-r-xl shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#27ae60]/10 rounded-full">
                      <Zap className="w-5 h-5 text-[#27ae60]" />
                    </div>
                    <h4 className="text-xl font-bold text-[#292929]">職能分析回饋</h4>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed pl-11">{feedback}</p>
                </div>
                
                <div className="flex justify-end">
                   <Button onClick={handleNext} className="py-4 px-8 text-lg flex items-center gap-2">
                    {step === 1 ? '查看最終分析' : '下一題'} <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-[#db0007]">載入失敗，請重試。</div>
        )}
      </div>
    </div>
  );
};