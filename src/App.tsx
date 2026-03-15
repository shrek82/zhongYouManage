
import React, { useState, Suspense } from 'react';
import Layout from './shared/components/Layout/Layout';

const Dashboard = React.lazy(() => import('./modules/dashboard/pages/Dashboard'));
const MyTasks = React.lazy(() => import('./modules/dashboard/pages/MyTasks'));
const ContractList = React.lazy(() => import('./modules/contracts/pages/ContractList'));
const ContractForm = React.lazy(() => import('./modules/contracts/pages/ContractForm'));
const ContractDetail = React.lazy(() => import('./modules/contracts/pages/ContractDetail'));
const PurchaseOrderList = React.lazy(() => import('./modules/procurement/pages/PurchaseOrderList'));
const PurchaseOrderForm = React.lazy(() => import('./modules/procurement/pages/PurchaseOrderForm'));
const PurchaseOrderDetail = React.lazy(() => import('./modules/procurement/pages/PurchaseOrderDetail'));
const PurchaseRequestList = React.lazy(() => import('./modules/procurement/pages/PurchaseRequestList'));
const PurchaseRequestForm = React.lazy(() => import('./modules/procurement/pages/PurchaseRequestForm'));
const PurchaseRequestDetail = React.lazy(() => import('./modules/procurement/pages/PurchaseRequestDetail'));
const SupplierList = React.lazy(() => import('./modules/procurement/pages/SupplierList'));
const SupplierForm = React.lazy(() => import('./modules/procurement/pages/SupplierForm'));
const SupplierDetail = React.lazy(() => import('./modules/procurement/pages/SupplierDetail'));
const PartnerList = React.lazy(() => import('./modules/contracts/pages/PartnerList'));
const PartnerForm = React.lazy(() => import('./modules/contracts/pages/PartnerForm'));
const PartnerDetail = React.lazy(() => import('./modules/contracts/pages/PartnerDetail'));

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('dashboard');

  const renderContent = () => {
    const [basePath, ...rest] = currentPath.split('/');
    const id = rest.join('/');

    switch (basePath) {
      case 'dashboard':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <Dashboard />
          </Suspense>
        );
      case 'my-tasks':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <MyTasks onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'contract-list':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <ContractList onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'contract-create':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <ContractForm onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'contract-edit':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <ContractForm id={id} onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'contract-detail':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <ContractDetail id={id} onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'purchase-order-list':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <PurchaseOrderList onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'purchase-order-create':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <PurchaseOrderForm onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'purchase-order-edit':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <PurchaseOrderForm id={id} onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'purchase-order-detail':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <PurchaseOrderDetail id={id} onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'purchase-request-list':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <PurchaseRequestList onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'purchase-request-create':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <PurchaseRequestForm onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'purchase-request-edit':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <PurchaseRequestForm id={id} onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'purchase-request-detail':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <PurchaseRequestDetail id={id} onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'supplier-collab':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <SupplierList onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'supplier-create':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <SupplierForm onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'supplier-edit':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <SupplierForm id={id} onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'supplier-detail':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <SupplierDetail id={id} onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'partner-list':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <PartnerList onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'partner-create':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <PartnerForm onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'partner-edit':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <PartnerForm id={id} onNavigate={setCurrentPath} />
          </Suspense>
        );
      case 'partner-detail':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <PartnerDetail id={id} onNavigate={setCurrentPath} />
          </Suspense>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 space-y-4">
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center animate-pulse">
              <span className="text-3xl">🧩</span>
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-700">模块构筑中</h3>
              <p className="text-xs text-slate-400 mt-1">"{currentPath}" 页面正在接入众友健康 ERP 数据接口...</p>
            </div>
            <button 
              onClick={() => setCurrentPath('dashboard')}
              className="px-6 py-2 bg-white border border-slate-200 text-blue-600 font-semibold rounded-xl text-xs hover:shadow-sm transition-all"
            >
              返回控制台
            </button>
          </div>
        );
    }
  };

  return (
    <Layout currentPath={currentPath} onNavigate={setCurrentPath}>
      {renderContent()}
    </Layout>
  );
};

export default App;
