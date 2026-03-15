import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, FileText, Calendar, DollarSign, User, Tag, ShieldCheck } from 'lucide-react';
import { Contract, ContractStatus } from '../../../core/types';

interface ContractFormProps {
  id?: string;
  onNavigate: (path: string) => void;
}

const ContractForm: React.FC<ContractFormProps> = ({ id, onNavigate }) => {
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState<Partial<Contract>>({
    title: '',
    contractNumber: `ZYJK-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    partner: '',
    amount: 0,
    startDate: '',
    endDate: '',
    status: ContractStatus.DRAFT,
    category: '成品药采购',
    responsiblePerson: ''
  });

  useEffect(() => {
    if (isEditMode) {
      // Mock fetching existing contract
      setFormData({
        id,
        title: '2024年三季度中成药采购合同',
        contractNumber: 'ZYJK-2024-089',
        partner: '扬子江药业集团',
        amount: 8900000,
        startDate: '2024-07-01',
        endDate: '2024-09-30',
        status: ContractStatus.ACTIVE,
        category: '成品药采购',
        responsiblePerson: '张建国'
      });
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    console.log('Saving contract:', formData);
    onNavigate('contract-list');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('contract-list')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {isEditMode ? '编辑合同' : '新增合同'}
            </h2>
            <p className="text-slate-500 text-xs mt-1">填写合同基础信息与核心条款</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate('contract-list')}
            className="px-6 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-all"
          >
            取消
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <Save className="w-4 h-4" />
            保存合同
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* 基本信息 */}
          <div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <FileText className="w-4 h-4 text-blue-600" />
              基本信息
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">合同标题 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="例如：2024年度阿莫西林采购框架协议"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">合同编号</label>
                <input 
                  type="text" 
                  name="contractNumber"
                  value={formData.contractNumber}
                  readOnly
                  className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <User className="w-3 h-3" /> 相对方名称 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="partner"
                  required
                  value={formData.partner}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="输入供应商或客户名称"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> 合同类别
                </label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="成品药采购">成品药采购</option>
                  <option value="中药材采购">中药材采购</option>
                  <option value="医疗器械">医疗器械</option>
                  <option value="行政服务">行政服务</option>
                  <option value="市场营销">市场营销</option>
                </select>
              </div>
            </div>
          </div>

          {/* 履约与财务信息 */}
          <div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              履约与财务
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> 涉及金额 (元) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  name="amount"
                  required
                  min="0"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> 生效日期 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="date" 
                  name="startDate"
                  required
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> 截止日期 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="date" 
                  name="endDate"
                  required
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 责任人与状态 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600">经办人 <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="responsiblePerson"
                required
                value={formData.responsiblePerson}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="输入员工姓名"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600">初始状态</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option value={ContractStatus.DRAFT}>草稿</option>
                <option value={ContractStatus.REVIEWING}>提交审核</option>
                <option value={ContractStatus.ACTIVE}>直接生效 (特批)</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600">合同正文 / 备注说明</label>
            <textarea 
              rows={5}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              placeholder="在此粘贴合同核心条款，或添加备注说明..."
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractForm;
