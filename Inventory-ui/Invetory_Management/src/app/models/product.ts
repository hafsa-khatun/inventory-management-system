export interface CatagoryModel {
  id?: number;
  categoryName: string;
  description?: string;
}

export interface SupplierModel {
  id?: number;
  supplierName: string;
  contactInfo?: string;
}

export interface ProductModel {
  id?: number;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  category: CatagoryModel | null;
  supplier: SupplierModel | null;
  createdAt?: string;
}