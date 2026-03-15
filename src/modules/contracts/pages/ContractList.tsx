
import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, MoreVertical, FileText, ExternalLink, ShieldCheck, Trash2, Edit } from 'lucide-react';
import { Contract, ContractStatus } from '../../../core/types';
import { getContracts } from '../api';

interface ContractListProps {
  onNavigate: (path: string) => void;
}

const mockContracts: Contract[] = [
  { id: '1', title: '2024年三季度中成药采购合同', contractNumber: 'ZYJK-2024-089', partner: '扬子江药业集团', amount: 8900000, startDate: '2024-07-01', endDate: '2024-09-30', status: ContractStatus.ACTIVE, category: '成品药采购', responsiblePerson: '张建国' },
  { id: '2', title: '高新园区中心库租赁协议', contractNumber: 'ZYJK-2023-156', partner: '兰州高新产业园管理公司', amount: 1200000, startDate: '2023-01-01', endDate: '2025-12-31', status: ContractStatus.ACTIVE, category: '行政服务', responsiblePerson: '李梅' },
  { id: '3', title: '冷链物流设备维保协议', contractNumber: 'ZYJK-2024-042', partner: '格力冷链装备部', amount: 250000, startDate: '2024-03-01', endDate: '2025-02-28', status: ContractStatus.REVIEWING, category: '物流设备', responsiblePerson: '王大力' },
  { id: '4', title: '2023年度甘草采购协议', contractNumber: 'ZYJK-2023-012', partner: '民勤县中药材基地', amount: 4500000, startDate: '2023-01-01', endDate: '2023-12-31', status: ContractStatus.EXPIRED, category: '原材料采购', responsiblePerson: '张建国' },
  { id: '5', title: '企业品牌数字化营销合作', contractNumber: 'ZYJK-2024-015', partner: '字节跳动巨量引擎', amount: 3000000, startDate: '2024-01-01', endDate: '2024-12-31', status: ContractStatus.ACTIVE, category: '市场营销', responsiblePerson: '陈笑' },
];

const ContractList: React.FC<ContractListProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除此合同吗？此操作不可逆。')) {
      console.log('Deleted contract', id);
      // In a real app, call API and refresh list
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">合同列表</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            高级筛选
          </button>
          <button 
            onClick={() => onNavigate('contract-create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            新增合同
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="搜索合同标题、编号或合作伙伴..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="bg-slate-50 border-none rounded-lg text-sm px-4 py-2 text-slate-600 outline-none">
          <option>所有状态</option>
          <option>生效中</option>
          <option>审核中</option>
          <option>已到期</option>
        </select>
        <select className="bg-slate-50 border-none rounded-lg text-sm px-4 py-2 text-slate-600 outline-none">
          <option>所有类别</option>
          <option>原材料采购</option>
          <option>市场营销</option>
          <option>行政服务</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">合同信息</th>
              <th className="px-6 py-4">合作伙伴</th>
              <th className="px-6 py-4 text-right">总金额</th>
              <th className="px-6 py-4">合同有效期</th>
              <th className="px-6 py-4">经办人</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockContracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-blue-50/20 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{contract.title}</div>
                      <div className="text-xs text-slate-400">{contract.contractNumber}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">{contract.partner}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] text-emerald-600 font-medium">已实名认证</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-slate-800">¥{contract.amount.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-slate-600">{contract.startDate}</div>
                  <div className="text-xs text-slate-400 mt-0.5">至 {contract.endDate}</div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{contract.responsiblePerson}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                    contract.status === ContractStatus.ACTIVE ? 'bg-emerald-50 text-emerald-600' :
                    contract.status === ContractStatus.REVIEWING ? 'bg-blue-50 text-blue-600' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {contract.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onNavigate(`contract-detail/${contract.id}`)}
                      className="p-1.5 hover:bg-blue-50 rounded text-slate-400 hover:text-blue-600 transition-colors" 
                      title="详情"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onNavigate(`contract-edit/${contract.id}`)}
                      className="p-1.5 hover:bg-amber-50 rounded text-slate-400 hover:text-amber-600 transition-colors" 
                      title="编辑"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(contract.id)}
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
  );
};

export default ContractList;
