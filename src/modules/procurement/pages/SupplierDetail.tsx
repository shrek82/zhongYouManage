import React from 'react';
import { ArrowLeft, Edit, Trash2, Building2, User, Phone, Mail, Tag, Star, FileText, Activity } from 'lucide-react';
import { Supplier, SupplierStatus } from '../../../core/types';

interface SupplierDetailProps {
  id: string;
  onNavigate: (path: string) => void;
}

const mockSupplier: Supplier = {
  id: '1',
  supplierCode: 'SUP-001',
  name: '得力集团有限公司',
  contactPerson: '刘经理',
  phone: '13800138000',
  email: 'liu@deli.com',
  category: '办公用品',
  status: SupplierStatus.ACTIVE,
  rating: 5
};

const SupplierDetail: React.FC<SupplierDetailProps> = ({ id, onNavigate }) => {
  const supplier = mockSupplier;

  const handleDelete = () => {
    if (window.confirm('确定要删除此供应商吗？此操作不可逆。')) {
      console.log('Deleted Supplier', id);
      onNavigate('supplier-collab');
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('supplier-collab')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                {supplier.name}
              </h2>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest ${getStatusColor(supplier.status)}`}>
                {supplier.status}
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1 font-mono">{supplier.supplierCode}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-xl text-xs hover:bg-red-50 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            删除
          </button>
          <button 
            onClick={() => onNavigate(`supplier-edit/${id}`)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <Edit className="w-4 h-4" />
            编辑信息
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6">
              <Building2 className="w-4 h-4 text-blue-600" />
              基本资料
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">供应类别</p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600">
                  <Tag className="w-3 h-3" />
                  {supplier.category}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">综合评级</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < supplier.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">联系人</p>
                <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {supplier.contactPerson}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">联系电话</p>
                <p className="text-sm font-bold text-slate-800 flex items-center gap-2 font-mono">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {supplier.phone}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">电子邮箱</p>
                <p className="text-sm font-bold text-slate-800 flex items-center gap-2 font-mono">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {supplier.email || '未提供'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-blue-600" />
              资质文件
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between group hover:border-blue-200 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">营业执照副本.pdf</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">有效期至: 2030-12-31</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">已认证</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between group hover:border-blue-200 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">ISO9001质量体系认证.pdf</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">有效期至: 2025-06-30</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">已认证</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6">
              <Activity className="w-4 h-4 text-blue-600" />
              合作概况
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">累计合作订单</p>
                <p className="text-2xl font-black text-slate-800 font-mono">156 <span className="text-sm font-medium text-slate-500">笔</span></p>
              </div>
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">累计采购金额</p>
                <p className="text-2xl font-black text-slate-800 font-mono">¥2.4M</p>
              </div>
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">准时交货率</p>
                <p className="text-2xl font-black text-slate-800 font-mono">98.5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;
