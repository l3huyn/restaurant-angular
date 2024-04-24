import { Order } from 'src/app/models/order';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDTO } from '../dtos/order/order.dto';
import { OrderResponse } from '../responses/order/order.response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiOrder = `${environment.apiBaseUrl}/orders`;

  constructor(private http: HttpClient) {}

  //hàm tính doang thu hôm nay
  getRevenue() {
    debugger;
    return this.http.get<String>(`${environment.apiBaseUrl}/orders/revenue`);
  }

  //hàm lấy những đơn hàng chưa thanh toán để hiển thị
  getCurrentUnpaidOrders(): Observable<Order[]> {
    debugger;
    return this.http.get<Order[]>(
      `${environment.apiBaseUrl}/orders/unpaid_orders`
    );
  }

  //lấy đơn hàng
  getOrder(orderId: number): Observable<Order[]> {
    debugger;
    return this.http.get<Order[]>(
      `${environment.apiBaseUrl}/orders/${orderId}`
    );
  }

  updateOrder(
    orderId: number,
    updatedOrderDTO: OrderDTO
  ): Observable<OrderDTO> {
    debugger;
    return this.http.put<OrderDTO>(
      `${environment.apiBaseUrl}/orders/${orderId}`,
      updatedOrderDTO
    );
  }

  deleteOrder(orderId: number): Observable<any> {
    debugger;
    const url = `${environment.apiBaseUrl}/orders/${orderId}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  getAllOrders(page: number, limit: number): Observable<OrderResponse[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(this.apiOrder, { params });
  }

  filterOrdersByDateRange(
    startDate: Date,
    endDate: Date,
    page: number,
    limit: number
  ): Observable<OrderResponse[]> {
    debugger;
    const params = new HttpParams()
      .set('startDate', startDate.toString())
      .set('endDate', endDate.toString())
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(
      `${environment.apiBaseUrl}/orders/get-orders-by-date-range`,
      {
        params,
      }
    );
  }

  getOrderById(orderId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/orders/${orderId}`;
    return this.http.get(url);
  }

  getRevenueByDateRange(startDate: Date, endDate: Date): Observable<any> {
    debugger;
    const params = new HttpParams()
      .set('startDate', startDate.toString())
      .set('endDate', endDate.toString());
    return this.http.get<any>(
      `${environment.apiBaseUrl}/orders/get-revenue-by-date-range`,
      {
        params,
      }
    );
  }
}
