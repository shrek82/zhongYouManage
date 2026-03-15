
export enum ContractStatus {
  DRAFT = '草稿',
  REVIEWING = '审核中',
  ACTIVE = '生效中',
  EXPIRED = '已到期',
  TERMINATED = '已终止'
}

export interface Contract {
  id: string;
  title: string;
  contractNumber: string;
  partner: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  category: string;
  responsiblePerson: string;
}

export enum PurchaseOrderStatus {
  DRAFT = '草稿',
  PENDING = '待审批',
  APPROVED = '已审批',
  SHIPPED = '已发货',
  DELIVERED = '已收货',
  CANCELLED = '已取消'
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  title: string;
  supplier: string;
  totalAmount: number;
  orderDate: string;
  expectedDeliveryDate: string;
  status: PurchaseOrderStatus;
  buyer: string;
}

export enum PurchaseRequestStatus {
  DRAFT = '草稿',
  PENDING_APPROVAL = '待审批',
  APPROVED = '已批准',
  REJECTED = '已驳回',
  COMPLETED = '已完成'
}

export interface PurchaseRequest {
  id: string;
  requestNumber: string;
  title: string;
  department: string;
  requester: string;
  requestDate: string;
  estimatedAmount: number;
  status: PurchaseRequestStatus;
  reason: string;
}

export enum SupplierStatus {
  ACTIVE = '正常合作',
  INACTIVE = '暂停合作',
  BLACKLISTED = '黑名单',
  PENDING_REVIEW = '待审核'
}

export interface Supplier {
  id: string;
  supplierCode: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  category: string;
  status: SupplierStatus;
  rating: number;
}

export interface DashboardStats {
  totalContracts: number;
  activeValue: number;
  pendingApprovals: number;
  expiringSoon: number;
}
