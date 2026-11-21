import React, { useState } from 'react';
import { User, Award, Briefcase, TrendingUp, X, PlayCircle, Lock, CheckCircle, ArrowUpCircle } from 'lucide-react';
import { CareerNode } from '../types';
import { Button } from './Button';

// Exporting this so App.tsx can use it to pass data to Result phase
export const CAREER_NODES: CareerNode[] = [
  {
    id: 'crew',
    title: '正職服務員',
    role: 'Crew',
    salaryRange: '32k - 35k',
    period: '起點',
    skills: ['QSCV標準', '顧客款待', '團隊協作'],
    description: '這是你展現專業的起點。學習國際級的黃金標準，從炸薯條的精準秒數到櫃檯的殷勤款待，你將掌握營運一家世界級餐廳的基礎。',
    videoPlaceholder: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=800',
    benefits: ['彈性排班制度', '員工餐半價優惠', '定期員工旅遊', '國定假日雙倍薪'],
    trainingPath: '完成基礎工作站檢定 (SOC) -> 參加服務員訓練課程 -> 挑戰訓練員檢定',
    futureProspect: '當你熟悉所有工作站並展現輔導新人的能力後，即具備晉升「餐廳襄理」的資格。'
  },
  {
    id: 'manager_trainee',
    title: '襄理培訓生',
    role: 'Manager Trainee',
    salaryRange: '38k - 42k',
    period: '6-12 個月',
    skills: ['樓面管理', '人員調度', '危機處理'],
    description: '晉升為管理組。你將學習如何在尖峰時刻指揮 10-20 人的團隊，確保出餐速度與服務品質。這是一堂關於領導力的實戰課。',
    videoPlaceholder: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800',
    benefits: ['完整的管理職培訓', '季度績效獎金', '外語進修補助', '年度健康檢查'],
    trainingPath: '通過值班管理檢定 (Shift Management) -> 參加初階主管課程 (BMP) -> 實際帶領團隊達成目標',
    futureProspect: '完成培訓並通過檢定後，你將能獨當一面，並有機會負責特定營運系統（如排班、訂貨）。'
  },
  {
    id: 'restaurant_manager',
    title: '餐廳經理',
    role: 'Restaurant Manager',
    salaryRange: '55k - 70k+',
    period: '2-3 年',
    skills: ['損益管理(P&L)', '人才培育', '商圈經營'],
    description: '你就是這家千萬營收門市的 CEO。你需要分析財務報表、制定行銷策略、並培育下一代的管理人才。',
    videoPlaceholder: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    benefits: ['高額年度分紅', '每10年特許休假(Sabbatical)', '配發公務手機', '海外年會參加資格'],
    trainingPath: '漢堡大學 (Hamburger University) 高階主管課程 -> 商圈經營實戰 -> 跨店輪調歷練',
    futureProspect: '作為專業經理人，你的下一步是管理多加門市，成為區域營運顧問。'
  },
  {
    id: 'consultant',
    title: '營運顧問',
    role: 'Business Consultant',
    salaryRange: '80k - 100k+',
    period: '5 年+',
    skills: ['多店策略', '品牌稽核', '長期佈局'],
    description: '視野擴大至區域管理。你將輔導多家門市，確保品牌標準的一致性，並協助各店經理達成營運目標。',
    videoPlaceholder: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    benefits: ['配發公務車或津貼', '認股權憑證(RSU)', '高階經理人俱樂部', '全額EMBA補助機會'],
    trainingPath: '跨國營運交流 -> 品牌策略規劃工作坊 -> 領導組織變革專案',
    futureProspect: '你已是組織的核心大腦，未來可往營運總監或總部策略部門發展。'
  }
];

interface Props {
  onStartSimulation: (roleTitle: string) => void;
  unlockedLevel: number;
}

export const Phase2_Map: React.FC<Props> = ({ onStartSimulation, unlockedLevel }) => {
  const [selectedNode, setSelectedNode] = useState<CareerNode | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white py-12 px-6 text-center border-b border-gray-200">
        <h2 className="text-4xl font-black text-[#292929] mb-4 tracking-tight">你的職涯，層層解鎖</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          職涯是一場晉級遊戲。完成當前職位的 <span className="text-[#db0007] font-bold">AI 情境挑戰</span>，證明你的實力，才能解鎖下一階段的福利與權限。
        </p>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12 relative">
        {/* Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-12 bottom-12 w-1 bg-gray-200 -z-0 transform md:-translate-x-1/2">
           {/* Progress Line */}
           <div 
             className="absolute top-0 left-0 w-full bg-[#ffbc0d] transition-all duration-1000"
             style={{ height: `${(unlockedLevel / (CAREER_NODES.length - 1)) * 100}%` }}
           ></div>
        </div>

        <div className="space-y-16">
          {CAREER_NODES.map((node, index) => {
            const isLeft = index % 2 === 0;
            const Icon = [User, TrendingUp, Briefcase, Award][index];
            const isLocked = index > unlockedLevel;
            const isCompleted = index < unlockedLevel;
            const isCurrent = index === unlockedLevel;
            
            return (
              <div key={node.id} className={`relative flex items-center md:justify-between ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
                
                {/* Timeline Dot */}
                <div className={`absolute left-6 md:left-1/2 w-8 h-8 rounded-full border-4 shadow-md transform -translate-x-1/2 z-10 flex items-center justify-center transition-colors duration-500
                  ${isLocked ? 'bg-gray-300 border-white' : 
                    isCompleted ? 'bg-[#27ae60] border-white' : 'bg-[#db0007] border-[#ffbc0d]'}`}>
                  {isLocked && <Lock className="w-3 h-3 text-white" />}
                  {isCompleted && <CheckCircle className="w-4 h-4 text-white" />}
                  {isCurrent && <div className="w-2 h-2 bg-white rounded-full animate-ping" />}
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-[45%] group transition-all duration-500 ${isLocked ? 'opacity-60 blur-[1px]' : 'opacity-100'}`}>
                  <div 
                    onClick={() => !isLocked && setSelectedNode(node)}
                    className={`bg-white p-6 rounded-2xl shadow-sm border transition-all duration-300 relative overflow-hidden
                      ${isLocked 
                        ? 'border-gray-100 cursor-not-allowed bg-gray-50' 
                        : 'border-gray-100 cursor-pointer hover:shadow-xl hover:border-[#ffbc0d] hover:-translate-y-1'
                      }
                      ${isCurrent ? 'ring-2 ring-[#ffbc0d] ring-offset-2' : ''}
                    `}
                  >
                    {!isLocked && <div className="absolute top-0 left-0 w-1 h-full bg-[#ffbc0d]"></div>}
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`p-3 rounded-full ${isLocked ? 'bg-gray-200 text-gray-400' : 'bg-red-50 text-[#db0007]'}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${isLocked ? 'text-gray-400' : 'text-[#292929]'}`}>{node.title}</h3>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{node.role}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                      <span className={`font-semibold ${isLocked ? 'text-gray-400' : 'text-[#db0007]'}`}>
                        {isLocked ? '????' : node.salaryRange}
                      </span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">{node.period}</span>
                    </div>

                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      {isLocked ? '完成上一階段職位模擬以解鎖詳細內容...' : node.description}
                    </p>
                    
                    <div className={`flex items-center font-bold text-sm ${isLocked ? 'text-gray-400' : 'text-[#db0007] group-hover:underline'}`}>
                       {isLocked ? <><Lock className="w-4 h-4 mr-1"/> 需先解鎖前一職位</> : <>{isCompleted ? '再次回顧' : '立即挑戰'} <PlayCircle className="w-4 h-4 ml-1" /></>}
                    </div>
                  </div>
                </div>

                {/* Empty space for the other side */}
                <div className="hidden md:block md:w-[45%]"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            
            <button 
              onClick={() => setSelectedNode(null)} 
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white text-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative h-56 shrink-0 bg-gray-200">
              <img src={selectedNode.videoPlaceholder} alt={selectedNode.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-3xl font-black text-white mb-1">{selectedNode.title}</h3>
                  <div className="flex gap-3 text-white/90 text-sm font-medium">
                    <span className="bg-[#db0007] px-2 py-0.5 rounded">{selectedNode.role}</span>
                    <span>{selectedNode.salaryRange}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 overflow-y-auto">
              <div className="mb-8">
                <h4 className="text-lg font-bold text-[#292929] mb-3 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#ffbc0d]" /> 工作內容
                </h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {selectedNode.description}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4" /> 核心職能要求
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedNode.skills.map(skill => (
                    <span key={skill} className="px-4 py-2 bg-white text-[#292929] text-sm font-medium rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#ffbc0d]" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Button 
                fullWidth 
                variant="primary"
                onClick={() => onStartSimulation(selectedNode.title)}
                className="py-4 text-lg shadow-xl"
              >
                開始 {selectedNode.title} 模擬挑戰
              </Button>
              <p className="text-center text-xs text-gray-400 mt-3">
                完成挑戰後將解鎖下一階段職位與福利詳情
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};