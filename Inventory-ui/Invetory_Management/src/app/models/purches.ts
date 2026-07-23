export interface Supplier {
  id: number;
  name: string;
  email?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}


export interface purchesModel {
  id?: number;
  supplier: Supplier;
  product?: Product;
  purchaseDate?: string;
  totalAmount: number;
}