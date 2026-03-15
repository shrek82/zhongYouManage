import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, ShoppingCart, Calendar, DollarSign, User, Building2 } from 'lucide-react';
import { PurchaseOrder, PurchaseOrderStatus } from '../../../core/types';

interface PurchaseOrderFormProps {
  id?: string;
  onNavigate: (path: string) => void;
}

const PurchaseOrderForm: React.FC<PurchaseOrderFormProps> = ({ id, onNavigate }) => {
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState<Partial<PurchaseOrder>>({
    title: '',
    poNumber: `PO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    supplier: '',
    totalAmount: 0,
    orderDate: '',
    expectedDeliveryDate: '',
    status: PurchaseOrderStatus.DRAFT,
    buyer: ''
  });

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        id,
        title: '2024年第一季度办公用品采购',
        poNumber: 'PO-2024-001',
        supplier: '得力集团',
        totalAmount: 45000,
        orderDate: '2024-01-15',
        expectedDeliveryDate: '2024-01-20',
        status: PurchaseOrderStatus.PENDING,
        buyer: '张建国'
      });
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'totalAmount' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving PO:', formData);
    onNavigate('purchase-order-list');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('purchase-order-list')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {isEditMode ? '编辑采购订单' : '新建采购订单'}
            </h2>
            <p className="text-slate-500 text-xs mt-1">填写采购订单明细与供应商信息</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate('purchase-order-list')}
            className="px-6 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-all"
          >
            取消
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <Save className="w-4 h-4" />
            保存订单
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <ShoppingCart className="w-4 h-4 text-blue-600" />
              基础信息
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">订单标题 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="例如：2024年度IT设备采购"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">订单编号</label>
                <input 
                  type="text" 
                  name="poNumber"
                  value={formData.poNumber}
                  readOnly
                  className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> 供应商名称 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="supplier"
                  required
                  value={formData.supplier}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="输入供应商名称"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <User className="w-3 h-3" /> 采购员 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="buyer"
                  required
                  value={formData.buyer}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="输入采购员姓名"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              财务与履约
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> 采购总额 (元) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  name="totalAmount"
                  required
                  min="0"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> 下单日期 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="date" 
                  name="orderDate"
                  required
                  value={formData.orderDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> 预计交货期 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="date" 
                  name="expectedDeliveryDate"
                  required
                  value={formData.expectedDeliveryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600">订单状态</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all max-w-xs"
            >
              <option value={PurchaseOrderStatus.DRAFT}>草稿</option>
              <option value={PurchaseOrderStatus.PENDING}>待审批</option>
              <option value={PurchaseOrderStatus.APPROVED}>已审批</option>
              <option value={PurchaseOrderStatus.SHIPPED}>已发货</option>
              <option value={PurchaseOrderStatus.DELIVERED}>已收货</option>
              <option value={PurchaseOrderStatus.CANCELLED}>已取消</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseOrderForm;
