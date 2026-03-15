
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AIAssistant from '../AIAssistant/AIAssistant';

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPath, onNavigate }) => {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar currentPath={currentPath} onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>

        <footer className="px-8 py-4 bg-white border-t border-slate-200/60 flex justify-between items-center text-[11px] text-slate-400">
          <div>© 2024 兰州众友健康药业有限公司 | 数字资产管理部</div>
          <div className="flex gap-4">
            <span className="hover:text-blue-600 cursor-pointer">服务条款</span>
            <span className="hover:text-blue-600 cursor-pointer">系统日志</span>
            <span className="text-emerald-500 font-medium">● 系统运行正常</span>
          </div>
        </footer>
      </div>

      <AIAssistant />
    </div>
  );
};

export default Layout;
