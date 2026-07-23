export interface ProductModel {
  id?: number;
  productName?: string;
  price?: number;
}

export interface SaleModel {
  id?: number;
  totalAmount?: number;
  saleDate?: string;
}

export interface SaleDetailModel {
  id?: number;
  sale?: SaleModel;   
  product?: ProductModel;
  quantity: number;
  unitPrice: number;
  subtotal?: number;
}