import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, Clock, AlertCircle, FileText, ShoppingCart, Users, ArrowRight } from 'lucide-react';

interface MyTasksProps {
  onNavigate: (path: string) => void;
}

type TaskStatus = 'pending' | 'processing' | 'completed';
type TaskPriority = 'high' | 'medium' | 'low';
type TaskType = 'contract' | 'procurement' | 'supplier';

interface Task {
  id: string;
  title: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  dueDate: string;
  submitter: string;
  department: string;
  link: string;
}

const mockTasks: Task[] = [
  {
    id: 'TSK-001',
    title: '上海医药集团年度采购框架协议审批',
    type: 'contract',
    priority: 'high',
    status: 'pending',
    createdAt: '2024-03-14 09:30',
    dueDate: '2024-03-15 18:00',
    submitter: '张三',
    department: '法务部',
    link: 'contract-detail/1'
  },
  {
    id: 'TSK-002',
    title: '2024年Q2医疗器械采购申请',
    type: 'procurement',
    priority: 'medium',
    status: 'pending',
    createdAt: '2024-03-13 14:20',
    dueDate: '2024-03-16 12:00',
    submitter: '李四',
    department: '采购部',
    link: 'purchase-request-detail/1'
  },
  {
    id: 'TSK-003',
    title: '九州通医药供应商准入资质复核',
    type: 'supplier',
    priority: 'high',
    status: 'processing',
    createdAt: '2024-03-12 10:15',
    dueDate: '2024-03-14 18:00',
    submitter: '王五',
    department: '质量管理部',
    link: 'partner-detail/2'
  },
  {
    id: 'TSK-004',
    title: '迈瑞医疗设备采购订单确认',
    type: 'procurement',
    priority: 'low',
    status: 'completed',
    createdAt: '2024-03-10 16:45',
    dueDate: '2024-03-12 18:00',
    submitter: '赵六',
    department: '设备科',
    link: 'purchase-order-detail/1'
  },
  {
    id: 'TSK-005',
    title: '信息系统维保服务合同续签',
    type: 'contract',
    priority: 'medium',
    status: 'pending',
    createdAt: '2024-03-14 11:20',
    dueDate: '2024-03-20 18:00',
    submitter: '孙七',
    department: 'IT部',
    link: 'contract-detail/2'
  }
];

const MyTasks: React.FC<MyTasksProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'processing' | 'completed'>('pending');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = mockTasks.filter(task => {
    const matchesTab = activeTab === 'all' || task.status === activeTab;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.submitter.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  const getPriorityLabel = (priority: TaskPriority) => {
    switch (priority) {
      case 'high': return '紧急';
      case 'medium': return '普通';
      case 'low': return '较低';
    }
  };

  const getTypeIcon = (type: TaskType) => {
    switch (type) {
      case 'contract': return <FileText className="w-4 h-4 text-indigo-600" />;
      case 'procurement': return <ShoppingCart className="w-4 h-4 text-blue-600" />;
      case 'supplier': return <Users className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getTypeLabel = (type: TaskType) => {
    switch (type) {
      case 'contract': return '合同审批';
      case 'procurement': return '采购业务';
      case 'supplier': return '供应商管理';
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'processing': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">我的待办事项</h2>
          <p className="text-slate-500 text-xs mt-1">处理需要您审批或确认的业务流程</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {[
              { id: 'all', label: '全部' },
              { id: 'pending', label: '待处理', count: mockTasks.filter(t => t.status === 'pending').length },
              { id: 'processing', label: '处理中' },
              { id: 'completed', label: '已完成' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${
                    activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-180px)]">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索任务标题、编号、提交人..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-4 h-4" />
            高级筛选
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div 
                key={task.id} 
                className="group bg-white border border-slate-200/60 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
                onClick={() => onNavigate(task.link)}
              >
                <div className="flex items-start sm:items-center gap-4 flex-1">
                  <div className={`p-2.5 rounded-xl border ${
                    task.type === 'contract' ? 'bg-indigo-50 border-indigo-100' :
                    task.type === 'procurement' ? 'bg-blue-50 border-blue-100' :
                    'bg-emerald-50 border-emerald-100'
                  }`}>
                    {getTypeIcon(task.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-slate-400">{task.id}</span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {getTypeLabel(task.type)}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getPriorityColor(task.priority)}`}>
                        {getPriorityLabel(task.priority)}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        {task.department} · {task.submitter}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 opacity-70" />
                        {task.createdAt} 提交
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-64 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 mt-3 sm:mt-0">
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">截止时间</span>
                    <span className={`text-xs font-mono font-bold ${
                      new Date(task.dueDate) < new Date() && task.status !== 'completed' 
                        ? 'text-red-600' 
                        : 'text-slate-700'
                    }`}>
                      {task.dueDate}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      {getStatusIcon(task.status)}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors text-slate-400">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-slate-300" />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-bold text-slate-600">太棒了！</h3>
                <p className="text-xs text-slate-400 mt-1">当前分类下没有需要处理的任务</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
