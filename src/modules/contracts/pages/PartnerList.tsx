import React, { useState } from 'react';
import { Search, Filter, Plus, ExternalLink, Edit, Trash2, Users, ShieldCheck } from 'lucide-react';

interface PartnerListProps {
  onNavigate: (path: string) => void;
}

const mockPartners = [
  { id: '1', code: 'PTN-001', name: '上海医药集团', type: '药品供应商', status: '合格', rating: 'A', expireDate: '2025-12-31' },
  { id: '2', code: 'PTN-002', name: '九州通医药', type: '药品供应商', status: '合格', rating: 'A', expireDate: '2025-10-15' },
  { id: '3', code: 'PTN-003', name: '迈瑞医疗', type: '器械供应商', status: '审核中', rating: 'B', expireDate: '2024-08-20' },
];

const PartnerList: React.FC<PartnerListProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    if (window.confirm('确定要移除此相对方吗？')) {
      console.log('Deleted Partner', id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">合格供应商名录</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            筛选
          </button>
          <button 
            onClick={() => onNavigate('partner-create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            新增相对方
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索相对方名称、编码..." 
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
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">相对方信息</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">类型</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">评级</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">资质有效期</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{partner.name}</p>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{partner.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700">{partner.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${partner.status === '合格' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {partner.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-700">{partner.rating}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700">{partner.expireDate}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onNavigate(`partner-detail/${partner.id}`)}
                        className="p-1.5 hover:bg-blue-50 rounded text-slate-400 hover:text-blue-600 transition-colors" 
                        title="详情"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onNavigate(`partner-edit/${partner.id}`)}
                        className="p-1.5 hover:bg-amber-50 rounded text-slate-400 hover:text-amber-600 transition-colors" 
                        title="编辑"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(partner.id)}
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

export default PartnerList;
