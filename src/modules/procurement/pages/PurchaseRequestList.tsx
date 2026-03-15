import React, { useState } from 'react';
import { Search, Filter, Plus, ExternalLink, Edit, Trash2, FileText } from 'lucide-react';
import { PurchaseRequest, PurchaseRequestStatus } from '../../../core/types';

interface PurchaseRequestListProps {
  onNavigate: (path: string) => void;
}

const mockRequests: PurchaseRequest[] = [
  { id: '1', requestNumber: 'PR-2024-001', title: '研发部Q2服务器扩容申请', department: '研发部', requester: '李工程师', requestDate: '2024-03-10', estimatedAmount: 150000, status: PurchaseRequestStatus.APPROVED, reason: '现有服务器资源不足，需扩容以支持新项目开发。' },
  { id: '2', requestNumber: 'PR-2024-002', title: '市场部年度宣传物料采购', department: '市场部', requester: '王经理', requestDate: '2024-03-12', estimatedAmount: 80000, status: PurchaseRequestStatus.PENDING_APPROVAL, reason: '准备下半年的全国巡回展会物料。' },
  { id: '3', requestNumber: 'PR-2024-003', title: '行政部办公设备更新', department: '行政部', requester: '张主管', requestDate: '2024-03-14', estimatedAmount: 35000, status: PurchaseRequestStatus.DRAFT, reason: '部分员工电脑老化，影响工作效率，需更换。' },
];

const PurchaseRequestList: React.FC<PurchaseRequestListProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除此采购申请吗？此操作不可逆。')) {
      console.log('Deleted PR', id);
    }
  };

  const getStatusColor = (status: PurchaseRequestStatus) => {
    switch (status) {
      case PurchaseRequestStatus.APPROVED: return 'bg-emerald-100 text-emerald-700';
      case PurchaseRequestStatus.COMPLETED: return 'bg-blue-100 text-blue-700';
      case PurchaseRequestStatus.PENDING_APPROVAL: return 'bg-amber-100 text-amber-700';
      case PurchaseRequestStatus.REJECTED: return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">采购申请列表</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            高级筛选
          </button>
          <button 
            onClick={() => onNavigate('purchase-request-create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            新建申请
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索申请编号、标题或申请人..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">申请信息</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">部门/申请人</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">预估金额</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{req.title}</p>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{req.requestNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700 font-medium">{req.department}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{req.requester}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-800 font-mono">¥{req.estimatedAmount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${getStatusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onNavigate(`purchase-request-detail/${req.id}`)}
                        className="p-1.5 hover:bg-blue-50 rounded text-slate-400 hover:text-blue-600 transition-colors" 
                        title="详情"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onNavigate(`purchase-request-edit/${req.id}`)}
                        className="p-1.5 hover:bg-amber-50 rounded text-slate-400 hover:text-amber-600 transition-colors" 
                        title="编辑"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(req.id)}
                        className="p-1.5 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 transition-colors" 
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseRequestList;
