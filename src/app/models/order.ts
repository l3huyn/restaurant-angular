export interface Order {
  id: number;
  diningTableId: number;
  tableNumber: string;
  fullName: string;
  phoneNumber: string;
  orderDate: Date;
  status: string;
  totalMoney: number;
  paymentMethod: string;
  discount: number;
  theDiscountedPrice: number;
  shippingAddress: string;
  employeeId: number;
  employeeName: string;
}
