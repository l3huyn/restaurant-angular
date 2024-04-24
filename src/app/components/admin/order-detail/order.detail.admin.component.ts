import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { OrderDetail } from 'src/app/models/order.detail';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { OrderDetailService } from 'src/app/services/order.detail.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail-admin',
  templateUrl: './order.detail.admin.component.html',
  styleUrls: ['./order.detail.admin.component.scss'],
})
export class OrderDetailAdminComponent implements OnInit {
  orderId: number = 0;
  orderResponse: OrderResponse = {
    id: 0, // Hoặc bất kỳ giá trị số nào bạn muốn
    tableNumber: '',
    fullName: '',
    phoneNumber: '',
    note: '',
    orderDate: new Date(),
    status: '',
    totalMoney: 0,
    paymentMethod: '',
    discount: 0,
    theDiscountedPrice: 0,
    shippingAddress: '',
    employeeName: '',
  };
  orderDetails: OrderDetail[] = [];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit(): void {
    this.getOrder();
    this.getOrderDetailById();
  }

  getOrder(): void {
    debugger;
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (response: any) => {
        debugger;
        this.orderResponse.id = response.id;
        this.orderResponse.tableNumber = response.tableNumber;
        this.orderResponse.fullName = response.fullName;
        this.orderResponse.phoneNumber = response.phoneNumber;
        this.orderResponse.note = response.note;
        this.orderResponse.orderDate = new Date(response.orderDate);
        this.orderResponse.status = response.status;
        this.orderResponse.totalMoney = response.totalMoney;
        this.orderResponse.paymentMethod = response.paymentMethod;
        this.orderResponse.discount = response.discount;
        this.orderResponse.theDiscountedPrice = response.theDiscountedPrice;
        this.orderResponse.shippingAddress = response.shippingAddress;
        this.orderResponse.employeeName = response.employeeName;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
      },
    });
  }

  getOrderDetailById(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderDetailService.getOrderDetail(this.orderId).subscribe({
      next: (response: any) => {
        debugger;
        this.orderDetails = response;
      },

      complete: () => {
        debugger;
      },

      error: (error: any) => {
        debugger;
        console.error('Error fetching detail', error);
      },
    });
  }
}
