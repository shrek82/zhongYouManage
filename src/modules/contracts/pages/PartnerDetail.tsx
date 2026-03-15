import React from 'react';
import { ArrowLeft, Edit, Trash2, Users, ShieldCheck, FileText, Activity } from 'lucide-react';

interface PartnerDetailProps {
  id: string;
  onNavigate: (path: string) => void;
}

const mockPartner = {
  id: '1',
  code: 'PTN-001',
  name: '上海医药集团',
  type: '药品供应商',
  status: '合格',
  rating: 'A',
  expireDate: '2025-12-31'
};

const PartnerDetail: React.FC<PartnerDetailProps> = ({ id, onNavigate }) => {
  const partner = mockPartner;

  const handleDelete = () => {
    if (window.confirm('确定要移除此相对方吗？')) {
      console.log('Deleted Partner', id);
      onNavigate('partner-list');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('partner-list')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                {partner.name}
              </h2>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest ${partner.status === '合格' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {partner.status}
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1 font-mono">{partner.code}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-xl text-xs hover:bg-red-50 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            移除
          </button>
          <button 
            onClick={() => onNavigate(`partner-edit/${id}`)}
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
              <Users className="w-4 h-4 text-blue-600" />
              基本资料
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">相对方类型</p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600">
                  {partner.type}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">信用评级</p>
                <div className="text-sm font-bold text-slate-800">
                  {partner.rating} 级
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">资质有效期</p>
                <p className="text-sm font-bold text-slate-800 flex items-center gap-2 font-mono">
                  {partner.expireDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              合规状态
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">准入审核</p>
                <p className="text-lg font-black text-slate-800">已通过</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetail;
