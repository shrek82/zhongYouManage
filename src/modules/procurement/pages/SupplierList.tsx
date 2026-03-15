import React, { useState } from 'react';
import { Search, Filter, Plus, ExternalLink, Edit, Trash2, Building2, Star } from 'lucide-react';
import { Supplier, SupplierStatus } from '../../../core/types';

interface SupplierListProps {
  onNavigate: (path: string) => void;
}

const mockSuppliers: Supplier[] = [
  { id: '1', supplierCode: 'SUP-001', name: '得力集团有限公司', contactPerson: '刘经理', phone: '13800138000', email: 'liu@deli.com', category: '办公用品', status: SupplierStatus.ACTIVE, rating: 5 },
  { id: '2', supplierCode: 'SUP-002', name: '戴尔(中国)有限公司', contactPerson: '张总监', phone: '13900139000', email: 'zhang@dell.com', category: 'IT设备', status: SupplierStatus.ACTIVE, rating: 4 },
  { id: '3', supplierCode: 'SUP-003', name: '上海印务中心', contactPerson: '王主管', phone: '13700137000', email: 'wang@shprint.com', category: '印刷服务', status: SupplierStatus.PENDING_REVIEW, rating: 3 },
  { id: '4', supplierCode: 'SUP-004', name: '绿城园林', contactPerson: '赵工', phone: '13600136000', email: 'zhao@greentown.com', category: '行政服务', status: SupplierStatus.INACTIVE, rating: 2 },
  { id: '5', supplierCode: 'SUP-005', name: '某不良供应商', contactPerson: '李某', phone: '13500135000', email: 'li@bad.com', category: '其他', status: SupplierStatus.BLACKLISTED, rating: 1 },
];

const SupplierList: React.FC<SupplierListProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除此供应商吗？此操作不可逆。')) {
      console.log('Deleted Supplier', id);
    }
  };

  const getStatusColor = (status: SupplierStatus) => {
    switch (status) {
      case SupplierStatus.ACTIVE: return 'bg-emerald-100 text-emerald-700';
      case SupplierStatus.PENDING_REVIEW: return 'bg-amber-100 text-amber-700';
      case SupplierStatus.INACTIVE: return 'bg-slate-100 text-slate-600';
      case SupplierStatus.BLACKLISTED: return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">供应商协同</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            高级筛选
          </button>
          <button 
            onClick={() => onNavigate('supplier-create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            新增供应商
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索供应商名称、编码或联系人..." 
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
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">供应商信息</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">联系方式</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">分类</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">评级</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{supplier.name}</p>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{supplier.supplierCode}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700 font-medium">{supplier.contactPerson}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{supplier.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700">{supplier.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${getStatusColor(supplier.status)}`}>
                      {supplier.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < supplier.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onNavigate(`supplier-detail/${supplier.id}`)}
                        className="p-1.5 hover:bg-blue-50 rounded text-slate-400 hover:text-blue-600 transition-colors" 
                        title="详情"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onNavigate(`supplier-edit/${supplier.id}`)}
                        className="p-1.5 hover:bg-amber-50 rounded text-slate-400 hover:text-amber-600 transition-colors" 
                        title="编辑"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(supplier.id)}
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

export default SupplierList;
