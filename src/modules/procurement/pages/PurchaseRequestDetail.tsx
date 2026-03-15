import React from 'react';
import { ArrowLeft, Edit, Trash2, FileText, Calendar, DollarSign, User, Building, CheckCircle2, Clock } from 'lucide-react';
import { PurchaseRequest, PurchaseRequestStatus } from '../../../core/types';

interface PurchaseRequestDetailProps {
  id: string;
  onNavigate: (path: string) => void;
}

const mockRequest: PurchaseRequest = {
  id: '1',
  requestNumber: 'PR-2024-001',
  title: '研发部Q2服务器扩容申请',
  department: '研发部',
  requester: '李工程师',
  requestDate: '2024-03-10',
  estimatedAmount: 150000,
  status: PurchaseRequestStatus.APPROVED,
  reason: '现有服务器资源不足，需扩容以支持新项目开发。'
};

const PurchaseRequestDetail: React.FC<PurchaseRequestDetailProps> = ({ id, onNavigate }) => {
  const request = mockRequest;

  const handleDelete = () => {
    if (window.confirm('确定要删除此申请吗？此操作不可逆。')) {
      console.log('Deleted PR', id);
      onNavigate('purchase-request-list');
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('purchase-request-list')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                {request.title}
              </h2>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1 font-mono">{request.requestNumber}</p>
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
            onClick={() => onNavigate(`purchase-request-edit/${id}`)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <Edit className="w-4 h-4" />
            编辑申请
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6">
              <FileText className="w-4 h-4 text-blue-600" />
              申请详情
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">申请部门</p>
                <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  {request.department}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">预估金额</p>
                <p className="text-lg font-black text-slate-800 font-mono">
                  ¥{request.estimatedAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">申请人</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                    {request.requester[0]}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{request.requester}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">申请日期</p>
                <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {request.requestDate}
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">申请事由</p>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {request.reason}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6">
              <Clock className="w-4 h-4 text-blue-600" />
              审批流转记录
            </h3>
            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-slate-100">
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center ring-4 ring-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-bold text-slate-800">总监审批通过</p>
                <p className="text-[10px] text-slate-400 mt-0.5">审批人: 张总监 · 2024-03-11 14:30</p>
                <div className="mt-2 p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-600 border border-slate-100">
                  同意扩容，请尽快走采购流程。
                </div>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center ring-4 ring-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-bold text-slate-800">部门经理审批通过</p>
                <p className="text-[10px] text-slate-400 mt-0.5">审批人: 王经理 · 2024-03-10 16:15</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center ring-4 ring-white">
                  <User className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-bold text-slate-800">发起采购申请</p>
                <p className="text-[10px] text-slate-400 mt-0.5">发起人: 李工程师 · 2024-03-10 10:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseRequestDetail;
