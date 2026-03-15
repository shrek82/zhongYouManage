import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, FileText, Calendar, DollarSign, User, Building } from 'lucide-react';
import { PurchaseRequest, PurchaseRequestStatus } from '../../../core/types';

interface PurchaseRequestFormProps {
  id?: string;
  onNavigate: (path: string) => void;
}

const PurchaseRequestForm: React.FC<PurchaseRequestFormProps> = ({ id, onNavigate }) => {
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState<Partial<PurchaseRequest>>({
    title: '',
    requestNumber: `PR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    department: '',
    requester: '',
    requestDate: new Date().toISOString().split('T')[0],
    estimatedAmount: 0,
    status: PurchaseRequestStatus.DRAFT,
    reason: ''
  });

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        id,
        title: '研发部Q2服务器扩容申请',
        requestNumber: 'PR-2024-001',
        department: '研发部',
        requester: '李工程师',
        requestDate: '2024-03-10',
        estimatedAmount: 150000,
        status: PurchaseRequestStatus.PENDING_APPROVAL,
        reason: '现有服务器资源不足，需扩容以支持新项目开发。'
      });
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'estimatedAmount' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving PR:', formData);
    onNavigate('purchase-request-list');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('purchase-request-list')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {isEditMode ? '编辑采购申请' : '新建采购申请'}
            </h2>
            <p className="text-slate-500 text-xs mt-1">填写采购需求及预估金额</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate('purchase-request-list')}
            className="px-6 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-all"
          >
            取消
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <Save className="w-4 h-4" />
            保存申请
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <FileText className="w-4 h-4 text-blue-600" />
              基础信息
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">申请标题 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="例如：市场部年度宣传物料采购"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">申请编号</label>
                <input 
                  type="text" 
                  name="requestNumber"
                  value={formData.requestNumber}
                  readOnly
                  className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Building className="w-3 h-3" /> 申请部门 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="输入部门名称"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <User className="w-3 h-3" /> 申请人 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="requester"
                  required
                  value={formData.requester}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="输入申请人姓名"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              预算与时间
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> 预估金额 (元) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  name="estimatedAmount"
                  required
                  min="0"
                  value={formData.estimatedAmount}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> 申请日期 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="date" 
                  name="requestDate"
                  required
                  value={formData.requestDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">申请状态</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value={PurchaseRequestStatus.DRAFT}>草稿</option>
                  <option value={PurchaseRequestStatus.PENDING_APPROVAL}>提交审批</option>
                  <option value={PurchaseRequestStatus.APPROVED}>已批准</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600">申请事由 / 需求说明 <span className="text-red-500">*</span></label>
            <textarea 
              name="reason"
              required
              value={formData.reason}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              placeholder="详细描述采购原因、用途及具体需求..."
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseRequestForm;
