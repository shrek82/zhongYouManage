import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Users, ShieldCheck, FileText } from 'lucide-react';

interface PartnerFormProps {
  id?: string;
  onNavigate: (path: string) => void;
}

const PartnerForm: React.FC<PartnerFormProps> = ({ id, onNavigate }) => {
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    code: `PTN-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
    type: '药品供应商',
    status: '审核中',
    rating: 'B',
    expireDate: ''
  });

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: '上海医药集团',
        code: 'PTN-001',
        type: '药品供应商',
        status: '合格',
        rating: 'A',
        expireDate: '2025-12-31'
      });
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving Partner:', formData);
    onNavigate('partner-list');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('partner-list')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {isEditMode ? '编辑相对方信息' : '新增相对方'}
            </h2>
            <p className="text-slate-500 text-xs mt-1">填写合格供应商/合作方基础信息</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate('partner-list')}
            className="px-6 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-all"
          >
            取消
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <Save className="w-4 h-4" />
            保存信息
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <Users className="w-4 h-4 text-blue-600" />
              基础资料
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">相对方名称 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="例如：上海医药集团"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">相对方编码</label>
                <input 
                  type="text" 
                  name="code"
                  value={formData.code}
                  readOnly
                  className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">相对方类型</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="药品供应商">药品供应商</option>
                  <option value="器械供应商">器械供应商</option>
                  <option value="服务提供商">服务提供商</option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              合规与资质
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">准入状态</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="审核中">审核中</option>
                  <option value="合格">合格</option>
                  <option value="不合格">不合格</option>
                  <option value="黑名单">黑名单</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">信用评级</label>
                <select 
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="A">A 级 (优秀)</option>
                  <option value="B">B 级 (良好)</option>
                  <option value="C">C 级 (一般)</option>
                  <option value="D">D 级 (较差)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">资质有效期至</label>
                <input 
                  type="date" 
                  name="expireDate"
                  value={formData.expireDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerForm;
