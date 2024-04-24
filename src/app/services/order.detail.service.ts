import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  private apiOrderDetail = `${environment.apiBaseUrl}/order_details`;

  constructor(private http: HttpClient) {}

  //hàm lấy order_detail
  getOrderDetail(orderDetailId: number) {
    debugger;
    return this.http.get(
      `${environment.apiBaseUrl}/order_details/order/${orderDetailId}`
    );
  }
}
