import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Building2, User, Phone, Mail, Tag, Star } from 'lucide-react';
import { Supplier, SupplierStatus } from '../../../core/types';

interface SupplierFormProps {
  id?: string;
  onNavigate: (path: string) => void;
}

const SupplierForm: React.FC<SupplierFormProps> = ({ id, onNavigate }) => {
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState<Partial<Supplier>>({
    name: '',
    supplierCode: `SUP-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
    contactPerson: '',
    phone: '',
    email: '',
    category: '办公用品',
    status: SupplierStatus.PENDING_REVIEW,
    rating: 3
  });

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        id,
        name: '得力集团有限公司',
        supplierCode: 'SUP-001',
        contactPerson: '刘经理',
        phone: '13800138000',
        email: 'liu@deli.com',
        category: '办公用品',
        status: SupplierStatus.ACTIVE,
        rating: 5
      });
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'rating' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving Supplier:', formData);
    onNavigate('supplier-collab');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('supplier-collab')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {isEditMode ? '编辑供应商' : '新增供应商'}
            </h2>
            <p className="text-slate-500 text-xs mt-1">填写供应商基础信息与联系方式</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate('supplier-collab')}
            className="px-6 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-all"
          >
            取消
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <Save className="w-4 h-4" />
            保存供应商
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <Building2 className="w-4 h-4 text-blue-600" />
              基础信息
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">供应商名称 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="例如：得力集团有限公司"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">供应商编码</label>
                <input 
                  type="text" 
                  name="supplierCode"
                  value={formData.supplierCode}
                  readOnly
                  className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> 供应类别
                </label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="办公用品">办公用品</option>
                  <option value="IT设备">IT设备</option>
                  <option value="印刷服务">印刷服务</option>
                  <option value="行政服务">行政服务</option>
                  <option value="其他">其他</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Star className="w-3 h-3" /> 初始评级
                </label>
                <select 
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value={1}>1 星 (极差)</option>
                  <option value={2}>2 星 (较差)</option>
                  <option value={3}>3 星 (一般)</option>
                  <option value={4}>4 星 (良好)</option>
                  <option value={5}>5 星 (优秀)</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <User className="w-4 h-4 text-emerald-600" />
              联系方式
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <User className="w-3 h-3" /> 联系人 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="contactPerson"
                  required
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="输入联系人姓名"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> 联系电话 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="输入手机号或座机"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Mail className="w-3 h-3" /> 电子邮箱
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="输入邮箱地址"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600">合作状态</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all max-w-xs"
            >
              <option value={SupplierStatus.PENDING_REVIEW}>待审核</option>
              <option value={SupplierStatus.ACTIVE}>正常合作</option>
              <option value={SupplierStatus.INACTIVE}>暂停合作</option>
              <option value={SupplierStatus.BLACKLISTED}>黑名单</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;
