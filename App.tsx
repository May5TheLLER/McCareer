import React, { useState } from 'react';
import { AppPhase, UserStats } from './types';
import { Phase2_Map, CAREER_NODES } from './components/Phase2_Map';
import { Phase3_Simulation } from './components/Phase3_Simulation';
import { Phase4_Result } from './components/Phase4_Result';
import { AdminDashboard } from './components/AdminDashboard';
import { LayoutDashboard, LogOut } from 'lucide-react';

const App: React.FC = () => {
  // Start directly at Discovery Phase as requested
  const [phase, setPhase] = useState<AppPhase>(AppPhase.DISCOVERY);
  
  // Track which levels are unlocked (Index in CAREER_NODES). Starts at 0 (Crew).
  const [unlockedLevel, setUnlockedLevel] = useState<number>(0);
  
  const [selectedRoleTitle, setSelectedRoleTitle] = useState<string>('正職服務員');
  const [userStats, setUserStats] = useState<UserStats>({
    leadership: 0,
    communication: 0,
    crisisManagement: 0,
    adaptability: 0,
    customerService: 0
  });

  const handleStartSimulation = (roleTitle: string) => {
    setSelectedRoleTitle(roleTitle);
    setPhase(AppPhase.ENGAGEMENT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePhase3Complete = (finalStats: UserStats) => {
    setUserStats(finalStats);
    setPhase(AppPhase.REFLECTION); // Go to Result
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlockNext = () => {
    // Determine index of current role
    const currentIndex = CAREER_NODES.findIndex(node => node.title === selectedRoleTitle);
    
    // If the user just completed the highest unlocked level, unlock the next one
    if (currentIndex === unlockedLevel && unlockedLevel < CAREER_NODES.length - 1) {
      setUnlockedLevel(prev => prev + 1);
    }
    
    setPhase(AppPhase.DISCOVERY); // Go back to Map
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setPhase(AppPhase.DISCOVERY);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Derived data for Phase 4
  const currentRoleIndex = CAREER_NODES.findIndex(node => node.title === selectedRoleTitle);
  const currentRoleNode = CAREER_NODES[currentRoleIndex];
  const nextRoleNode = CAREER_NODES[currentRoleIndex + 1];

  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-gray-50 text-gray-900 font-sans">
      {/* Global Header */}
      <nav className="bg-[#db0007] text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setPhase(AppPhase.DISCOVERY)}
          >
            <div className="text-3xl font-black tracking-tighter text-[#ffbc0d]">M</div>
            <h1 className="text-lg font-bold tracking-wide">ProCareer <span className="opacity-80 font-normal">| 職涯光芒導航</span></h1>
          </div>
          
          <div>
            {phase === AppPhase.ADMIN ? (
               <button 
                 onClick={() => setPhase(AppPhase.DISCOVERY)}
                 className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
               >
                 <LogOut className="w-4 h-4" /> 退出後台
               </button>
            ) : (
               <button 
                 onClick={() => setPhase(AppPhase.ADMIN)}
                 className="flex items-center gap-2 bg-[#a30005] hover:bg-[#850004] px-4 py-2 rounded-lg transition-colors text-xs font-bold uppercase tracking-wider shadow-inner"
               >
                 <LayoutDashboard className="w-4 h-4" /> 企業登入
               </button>
            )}
          </div>
        </div>
      </nav>

      {phase === AppPhase.DISCOVERY && (
        <Phase2_Map 
          onStartSimulation={handleStartSimulation} 
          unlockedLevel={unlockedLevel}
        />
      )}

      {phase === AppPhase.ENGAGEMENT && (
        <Phase3_Simulation 
          roleTitle={selectedRoleTitle} 
          onComplete={handlePhase3Complete} 
        />
      )}

      {(phase === AppPhase.REFLECTION || phase === AppPhase.SHARING) && (
        <Phase4_Result 
          stats={userStats} 
          currentRoleNode={currentRoleNode}
          nextRoleNode={nextRoleNode}
          onRestart={handleRestart}
          onUnlockNext={handleUnlockNext}
        />
      )}

      {phase === AppPhase.ADMIN && (
        <AdminDashboard />
      )}
    </main>
  );
};

export default App;