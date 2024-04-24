export interface OrderResponse {
  id: number;
  tableNumber: string;
  fullName: string;
  phoneNumber: string;
  note: string;
  orderDate: Date; // Dạng chuỗi ISO 8601
  status: string;
  totalMoney: number;
  paymentMethod: string;
  discount: number;
  theDiscountedPrice: number;
  shippingAddress: string;
  employeeName: string;
}
