import React from 'react';
import { ArrowLeft, Edit, Trash2, FileText, Calendar, DollarSign, User, Tag, ShieldCheck, Download, Clock, CheckCircle2 } from 'lucide-react';
import { Contract, ContractStatus } from '../../../core/types';

interface ContractDetailProps {
  id: string;
  onNavigate: (path: string) => void;
}

const mockContract: Contract = {
  id: '1',
  title: '2024年三季度中成药采购合同',
  contractNumber: 'ZYJK-2024-089',
  partner: '扬子江药业集团',
  amount: 8900000,
  startDate: '2024-07-01',
  endDate: '2024-09-30',
  status: ContractStatus.ACTIVE,
  category: '成品药采购',
  responsiblePerson: '张建国'
};

const ContractDetail: React.FC<ContractDetailProps> = ({ id, onNavigate }) => {
  // In a real app, fetch contract by id
  const contract = mockContract;

  const handleDelete = () => {
    if (window.confirm('确定要删除此合同吗？此操作不可逆。')) {
      console.log('Deleted contract', id);
      onNavigate('contract-list');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('contract-list')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                {contract.title}
              </h2>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest ${
                contract.status === ContractStatus.ACTIVE ? 'bg-emerald-100 text-emerald-700' :
                contract.status === ContractStatus.REVIEWING ? 'bg-blue-100 text-blue-700' :
                'bg-slate-100 text-slate-600'
              }`}>
                {contract.status}
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1 font-mono">{contract.contractNumber}</p>
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
            onClick={() => onNavigate(`contract-edit/${id}`)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <Edit className="w-4 h-4" />
            编辑合同
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6">
              <FileText className="w-4 h-4 text-blue-600" />
              核心要素
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">相对方</p>
                <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  {contract.partner}
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">涉及金额</p>
                <p className="text-lg font-black text-slate-800 font-mono">
                  ¥{contract.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">合同类别</p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600">
                  <Tag className="w-3 h-3" />
                  {contract.category}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">经办人</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                    {contract.responsiblePerson[0]}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{contract.responsiblePerson}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">生效日期</p>
                <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {contract.startDate}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">截止日期</p>
                <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {contract.endDate}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-blue-600" />
              合同正文与附件
            </h3>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between group hover:border-blue-200 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">2024年三季度中成药采购合同_正本.pdf</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">2.4 MB · 上传于 2024-06-28</p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline & AI */}
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
                <p className="text-xs font-bold text-slate-800">法务部审核通过</p>
                <p className="text-[10px] text-slate-400 mt-0.5">审批人: 李晨 · 2024-06-29 14:30</p>
                <div className="mt-2 p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-600 border border-slate-100">
                  条款无异议，符合 GSP 规范。
                </div>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center ring-4 ring-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-bold text-slate-800">财务部审核通过</p>
                <p className="text-[10px] text-slate-400 mt-0.5">审批人: 王会计 · 2024-06-28 16:15</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center ring-4 ring-white">
                  <User className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-bold text-slate-800">发起合同审批</p>
                <p className="text-[10px] text-slate-400 mt-0.5">发起人: 张建国 · 2024-06-28 10:00</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <h3 className="text-sm font-black flex items-center gap-2 mb-3 relative z-10">
              <ShieldCheck className="w-4 h-4 text-blue-200" />
              AI 智能风控评估
            </h3>
            <div className="space-y-3 relative z-10">
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">GSP 合规分</span>
                  <span className="text-sm font-black text-emerald-300">98/100</span>
                </div>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[98%] rounded-full"></div>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed text-blue-50">
                该合同条款严谨，已明确包含药品质量保证协议附件，符合国家 GSP 规范要求。未发现明显法律风险。
              </p>
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-colors">
                重新生成分析报告
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetail;
