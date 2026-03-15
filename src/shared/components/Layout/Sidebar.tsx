
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  PieChart, 
  ShieldCheck, 
  ChevronDown, 
  ChevronRight,
  Briefcase,
  Layers,
  FileCheck,
  History,
  AlertCircle,
  HardDrive,
  BarChart3,
  ShoppingCart
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  const [openMenus, setOpenMenus] = useState<string[]>(['contracts', 'partners', 'procurement']);

  const menuGroups = [
    {
      group: '工作台',
      items: [
        { id: 'dashboard', label: '管理驾驶舱', icon: LayoutDashboard },
        { id: 'my-tasks', label: '我的待办事项', icon: Layers, badge: '5' },
      ]
    },
    {
      group: '供应链与采购',
      items: [
        { 
          id: 'procurement', 
          label: '采购管理', 
          icon: ShoppingCart,
          children: [
            { id: 'purchase-order-list', label: '采购订单' },
            { id: 'purchase-request-list', label: '采购申请' },
            { id: 'supplier-collab', label: '供应商协同' }
          ]
        }
      ]
    },
    {
      group: '合同全生命周期',
      items: [
        { 
          id: 'contracts', 
          label: '合同管理', 
          icon: FileText,
          children: [
            { id: 'contract-list', label: '合同台账总表' },
            { id: 'contract-approval', label: '在线审批流' },
            { id: 'contract-sign', label: '电子签章管理' },
            { id: 'contract-archive', label: '数字化档案库' }
          ]
        },
        { 
          id: 'partners', 
          label: '相对方管理', 
          icon: Users,
          children: [
            { id: 'partner-list', label: '合格供应商名录' },
            { id: 'partner-audit', label: '资信评估报告' },
            { id: 'partner-black', label: '风险黑名单' }
          ]
        },
      ]
    },
    {
      group: '合规与效能',
      items: [
        { id: 'compliance', label: '法律合规矩阵', icon: ShieldCheck },
        { id: 'analytics', label: '效能统计分析', icon: BarChart3 },
        { id: 'audit-log', label: '操作审计日志', icon: History },
      ]
    },
    {
      group: '系统支持',
      items: [
        { id: 'storage', label: '云端存储中心', icon: HardDrive },
        { id: 'settings', label: '系统参数配置', icon: Settings },
      ]
    }
  ];

  const toggleMenu = (id: string) => {
    setOpenMenus(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col sticky top-0 overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-base font-black text-slate-800 leading-tight">众友健康</h1>
          <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Contract OS v2.5</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto scrollbar-hide">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <h4 className="px-3 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-3">{group.group}</h4>
            <div className="space-y-1">
              {group.items.map((item: any) => {
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = openMenus.includes(item.id);
                const isActive = currentPath === item.id || (item.children?.some((c: any) => currentPath.startsWith(c.id) || (c.id === 'contract-list' && currentPath.startsWith('contract-')) || (c.id === 'purchase-order-list' && currentPath.startsWith('purchase-order-'))));

                return (
                  <div key={item.id}>
                    <button
                      onClick={() => hasChildren ? toggleMenu(item.id) : onNavigate(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                        isActive && !hasChildren
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                          : isActive && hasChildren
                          ? 'text-blue-600 bg-blue-50/50'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${isActive && !hasChildren ? 'text-white' : ''}`} />
                        <span className="text-xs font-bold tracking-tight">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {hasChildren && (
                          isOpen ? <ChevronDown className="w-3 h-3 opacity-50" /> : <ChevronRight className="w-3 h-3 opacity-50" />
                        )}
                      </div>
                    </button>
                    
                    {hasChildren && isOpen && (
                      <div className="mt-1 ml-4 space-y-1 border-l-2 border-slate-100 pl-4 py-1">
                        {item.children.map((child: any) => {
                          const isChildActive = currentPath === child.id || 
                            (child.id === 'contract-list' && currentPath.startsWith('contract-')) || 
                            (child.id === 'purchase-order-list' && currentPath.startsWith('purchase-order-')) ||
                            (child.id === 'purchase-request-list' && currentPath.startsWith('purchase-request-')) ||
                            (child.id === 'supplier-collab' && currentPath.startsWith('supplier-')) ||
                            (child.id === 'partner-list' && currentPath.startsWith('partner-'));
                          return (
                            <button
                              key={child.id}
                              onClick={() => onNavigate(child.id)}
                              className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-lg transition-all ${
                                isChildActive 
                                  ? 'text-blue-600 bg-blue-50' 
                                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {child.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
           <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">System Health: 99%</span>
           </div>
           <p className="text-[9px] text-slate-400 leading-relaxed font-medium">数据已与兰州总部同步，SSL 加密连接已生效。</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
