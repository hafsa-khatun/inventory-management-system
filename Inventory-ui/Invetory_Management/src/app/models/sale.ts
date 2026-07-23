export interface CustomerModel {
id?: number;
  name?: string;  
  email?: string;
  phone?: string;
}

export interface SaleModel {
  id?: number;
  customer?: CustomerModel; 
  saleDate?: string;
  totalAmount: number;
}