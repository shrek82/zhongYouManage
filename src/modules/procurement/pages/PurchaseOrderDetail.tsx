import React from 'react';
import { ArrowLeft, Edit, Trash2, ShoppingCart, Calendar, DollarSign, User, Building2, Package, CheckCircle2, Clock } from 'lucide-react';
import { PurchaseOrder, PurchaseOrderStatus } from '../../../core/types';

interface PurchaseOrderDetailProps {
  id: string;
  onNavigate: (path: string) => void;
}

const mockOrder: PurchaseOrder = {
  id: '1',
  poNumber: 'PO-2024-001',
  title: '2024年第一季度办公用品采购',
  supplier: '得力集团',
  totalAmount: 45000,
  orderDate: '2024-01-15',
  expectedDeliveryDate: '2024-01-20',
  status: PurchaseOrderStatus.DELIVERED,
  buyer: '张建国'
};

const PurchaseOrderDetail: React.FC<PurchaseOrderDetailProps> = ({ id, onNavigate }) => {
  const order = mockOrder;

  const handleDelete = () => {
    if (window.confirm('确定要删除此采购订单吗？此操作不可逆。')) {
      console.log('Deleted PO', id);
      onNavigate('purchase-order-list');
    }
  };

  const getStatusColor = (status: PurchaseOrderStatus) => {
    switch (status) {
      case PurchaseOrderStatus.DELIVERED: return 'bg-emerald-100 text-emerald-700';
      case PurchaseOrderStatus.SHIPPED: return 'bg-blue-100 text-blue-700';
      case PurchaseOrderStatus.APPROVED: return 'bg-indigo-100 text-indigo-700';
      case PurchaseOrderStatus.PENDING: return 'bg-amber-100 text-amber-700';
      case PurchaseOrderStatus.CANCELLED: return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('purchase-order-list')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                {order.title}
              </h2>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1 font-mono">{order.poNumber}</p>
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
            onClick={() => onNavigate(`purchase-order-edit/${id}`)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <Edit className="w-4 h-4" />
            编辑订单
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6">
              <ShoppingCart className="w-4 h-4 text-blue-600" />
              订单明细
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">供应商</p>
                <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {order.supplier}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">采购总额</p>
                <p className="text-lg font-black text-slate-800 font-mono">
                  ¥{order.totalAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">采购员</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                    {order.buyer[0]}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{order.buyer}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">下单日期</p>
                <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {order.orderDate}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">预计交货期</p>
                <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {order.expectedDeliveryDate}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-4">
              <Package className="w-4 h-4 text-blue-600" />
              采购物料清单
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">物料名称</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">规格型号</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">数量</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">单价</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">小计</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-xs font-medium text-slate-800">A4打印纸</td>
                    <td className="px-4 py-3 text-xs text-slate-500">70g 500张/包</td>
                    <td className="px-4 py-3 text-xs text-slate-800">1000</td>
                    <td className="px-4 py-3 text-xs text-slate-500 font-mono">¥25.00</td>
                    <td className="px-4 py-3 text-xs font-bold text-slate-800 font-mono">¥25,000.00</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-xs font-medium text-slate-800">黑色中性笔</td>
                    <td className="px-4 py-3 text-xs text-slate-500">0.5mm 12支/盒</td>
                    <td className="px-4 py-3 text-xs text-slate-800">500</td>
                    <td className="px-4 py-3 text-xs text-slate-500 font-mono">¥40.00</td>
                    <td className="px-4 py-3 text-xs font-bold text-slate-800 font-mono">¥20,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6">
              <Clock className="w-4 h-4 text-blue-600" />
              物流与履约跟踪
            </h3>
            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-slate-100">
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center ring-4 ring-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-bold text-slate-800">已收货入库</p>
                <p className="text-[10px] text-slate-400 mt-0.5">操作人: 库管员王师傅 · 2024-01-19 14:30</p>
                <div className="mt-2 p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-600 border border-slate-100">
                  货物完好，数量核对无误，已入A区仓库。
                </div>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center ring-4 ring-white">
                  <Package className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-bold text-slate-800">供应商已发货</p>
                <p className="text-[10px] text-slate-400 mt-0.5">顺丰速运: SF1234567890 · 2024-01-17 10:15</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center ring-4 ring-white">
                  <User className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-bold text-slate-800">订单已审批</p>
                <p className="text-[10px] text-slate-400 mt-0.5">审批人: 采购总监 · 2024-01-16 09:00</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center ring-4 ring-white">
                  <ShoppingCart className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-bold text-slate-800">创建采购订单</p>
                <p className="text-[10px] text-slate-400 mt-0.5">发起人: 张建国 · 2024-01-15 16:20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetail;
