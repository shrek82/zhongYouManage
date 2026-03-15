import React, { useState } from 'react';
import { Search, Filter, Plus, ExternalLink, Edit, Trash2, ShoppingCart } from 'lucide-react';
import { PurchaseOrder, PurchaseOrderStatus } from '../../../core/types';

interface PurchaseOrderListProps {
  onNavigate: (path: string) => void;
}

const mockOrders: PurchaseOrder[] = [
  { id: '1', poNumber: 'PO-2024-001', title: '2024年第一季度办公用品采购', supplier: '得力集团', totalAmount: 45000, orderDate: '2024-01-15', expectedDeliveryDate: '2024-01-20', status: PurchaseOrderStatus.DELIVERED, buyer: '张建国' },
  { id: '2', poNumber: 'PO-2024-002', title: '研发中心服务器采购', supplier: '戴尔(中国)有限公司', totalAmount: 320000, orderDate: '2024-02-10', expectedDeliveryDate: '2024-03-01', status: PurchaseOrderStatus.SHIPPED, buyer: '李梅' },
  { id: '3', poNumber: 'PO-2024-003', title: '年度营销物料制作', supplier: '上海印务中心', totalAmount: 120000, orderDate: '2024-03-05', expectedDeliveryDate: '2024-03-25', status: PurchaseOrderStatus.APPROVED, buyer: '王强' },
  { id: '4', poNumber: 'PO-2024-004', title: '总部大楼绿化养护服务', supplier: '绿城园林', totalAmount: 80000, orderDate: '2024-03-10', expectedDeliveryDate: '2024-03-12', status: PurchaseOrderStatus.PENDING, buyer: '赵敏' },
  { id: '5', poNumber: 'PO-2024-005', title: '员工体检服务采购', supplier: '爱康国宾', totalAmount: 150000, orderDate: '2024-03-12', expectedDeliveryDate: '2024-04-01', status: PurchaseOrderStatus.DRAFT, buyer: '陈笑' },
];

const PurchaseOrderList: React.FC<PurchaseOrderListProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除此采购订单吗？此操作不可逆。')) {
      console.log('Deleted PO', id);
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">采购订单列表</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            高级筛选
          </button>
          <button 
            onClick={() => onNavigate('purchase-order-create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            新建订单
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索订单编号、标题或供应商..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">订单信息</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">供应商</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">金额</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">采购员</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <ShoppingCart className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{order.title}</p>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{order.poNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700">{order.supplier}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-800 font-mono">¥{order.totalAmount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{order.buyer}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onNavigate(`purchase-order-detail/${order.id}`)}
                        className="p-1.5 hover:bg-blue-50 rounded text-slate-400 hover:text-blue-600 transition-colors" 
                        title="详情"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onNavigate(`purchase-order-edit/${order.id}`)}
                        className="p-1.5 hover:bg-amber-50 rounded text-slate-400 hover:text-amber-600 transition-colors" 
                        title="编辑"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="p-1.5 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 transition-colors" 
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderList;
