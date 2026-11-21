import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Users, TrendingUp, Database, FileText, Upload, MousePointer, Target 
} from 'lucide-react';

// --- MOCK DATA ---

const FUNNEL_DATA = [
  { name: '廣告觸及', value: 15420 },
  { name: '進入平台', value: 8500 },
  { name: '開始模擬', value: 6200 },
  { name: '完成挑戰', value: 4800 },
  { name: '點擊應徵', value: 1250 },
];

const SOURCE_DATA = [
  { name: 'IG / Threads', value: 45, color: '#E1306C' },
  { name: '校園推薦', value: 25, color: '#ffbc0d' },
  { name: '官網導流', value: 20, color: '#db0007' },
  { name: '其他', value: 10, color: '#9ca3af' },
];

// --- COMPONENTS ---

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'rag'>('analytics');

  const tabs = [
    { id: 'analytics', label: '人才漏斗洞察', icon: TrendingUp },
    { id: 'rag', label: 'RAG 知識庫', icon: Database },
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden md:block">
        <div className="p-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">管理控制台</h2>
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    activeTab === tab.id 
                      ? 'bg-red-50 text-[#db0007] shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-6 border-t border-gray-100 mt-auto">
          <div className="bg-gray-50 p-4 rounded-xl">
             <div className="text-xs text-gray-500 mb-1">系統狀態</div>
             <div className="flex items-center gap-2 text-sm font-bold text-green-600">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               AI 模型運作中
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-64px)]">
        
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-[#292929]">{tabs.find(t => t.id === activeTab)?.label}</h1>
            <p className="text-gray-500 text-sm">即時數據更新於：剛剛</p>
          </div>
          <div className="flex gap-3">
             <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50">匯出報表</button>
             <button className="bg-[#292929] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-black">系統設定</button>
          </div>
        </header>

        {/* Dynamic Content based on Tab */}
        <div className="animate-[fadeIn_0.3s_ease-out]">
          
          {/* TAB 1: FUNNEL ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Funnel Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
                <h3 className="text-lg font-bold text-[#292929] mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#db0007]" /> 招募轉換漏斗
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={FUNNEL_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="value" fill="#db0007" barSize={30} radius={[0, 4, 4, 0]} label={{ position: 'right' }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Source Pie Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-[#292929] mb-6">流量來源分佈</h3>
                <div className="h-64">
                   <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={SOURCE_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {SOURCE_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                 <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                       <div>
                         <p className="text-sm text-gray-500 mb-1">完成模擬轉換率</p>
                         <p className="text-3xl font-black text-[#db0007]">77.4%</p>
                       </div>
                       <TrendingUp className="w-8 h-8 text-[#db0007] opacity-20" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                       <div>
                         <p className="text-sm text-gray-500 mb-1">完成後應徵轉化率</p>
                         <p className="text-3xl font-black text-green-600">26.0%</p>
                       </div>
                       <Target className="w-8 h-8 text-green-600 opacity-20" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
                       <div>
                         <p className="text-sm text-gray-500 mb-1">平均停留時間</p>
                         <p className="text-3xl font-black text-[#b45309]">8m 42s</p>
                       </div>
                       <MousePointer className="w-8 h-8 text-[#b45309] opacity-20" />
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* TAB 2: RAG KNOWLEDGE BASE */}
          {activeTab === 'rag' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
                <h3 className="text-lg font-bold text-[#292929] mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#ffbc0d]" /> AI 知識庫內容預覽 (Context Window)
                </h3>
                <div className="bg-[#1e1e1e] text-gray-300 p-4 rounded-xl font-mono text-sm h-[400px] overflow-y-auto leading-relaxed whitespace-pre-wrap">
                  {`[文件類別：內部標準作業程序 SOP]
1. 職位：正職服務員 (Crew)
   - 核心原則：QSCV (品質 Quality、服務 Service、清潔 Cleanliness、價值 Value)。
   - 服務黃金標準：熱而新鮮。薯條保存期限為7分鐘，超過必須報廢。
   
2. 職位：襄理/培訓生 (Manager Trainee)
   - 核心職能：樓面管理 (Shift Management)、人員調度。
   - 尖峰時段規範 (12:00-13:00)：禁止非必要的人員休息或補貨。

[AI 設定]
Role: Professional HR & Trainer
Tone: Encouraging, Professional, Constructive
Language: Traditional Chinese (Taiwan)`}
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                  <span>Tokens used: 1,240 / 128,000</span>
                  <span className="text-green-600 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Synced</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold text-[#292929] mb-4">更新知識庫</h3>
                   <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#db0007] hover:bg-red-50 transition-colors cursor-pointer group">
                      <Upload className="w-10 h-10 text-gray-300 group-hover:text-[#db0007] mx-auto mb-3" />
                      <p className="text-gray-600 font-bold">拖曳檔案至此</p>
                      <p className="text-xs text-gray-400 mt-1">支援 PDF, DOCX, TXT</p>
                   </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold text-[#292929] mb-4">最近索引文件</h3>
                   <ul className="space-y-3 text-sm">
                     <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                       <span className="flex items-center gap-2 text-gray-700"><FileText className="w-4 h-4 text-gray-400"/> 2024 Q3 服務手冊.pdf</span>
                       <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">已索引</span>
                     </li>
                     <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                       <span className="flex items-center gap-2 text-gray-700"><FileText className="w-4 h-4 text-gray-400"/> 危機處理個案集.docx</span>
                       <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">已索引</span>
                     </li>
                     <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                       <span className="flex items-center gap-2 text-gray-700"><FileText className="w-4 h-4 text-gray-400"/> 食安通報流程 v2.txt</span>
                       <span className="text-yellow-600 text-xs bg-yellow-100 px-2 py-1 rounded">處理中</span>
                     </li>
                   </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};