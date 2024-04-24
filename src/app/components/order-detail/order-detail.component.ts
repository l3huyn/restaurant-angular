import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDTO } from 'src/app/dtos/order/order.dto';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/order.detail';
import { OrderDetailService } from 'src/app/services/order.detail.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  orderDetails: OrderDetail[] = [];
  orders: Order[] = [];
  orderId: number = 0;

  constructor(
    private orderDetailService: OrderDetailService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    debugger;
    this.route.params.subscribe((params) => {
      //lấy id từ url
      const idParam = params['id'];
      if (idParam !== null) {
        this.orderId = +idParam;
      }
      if (!isNaN(this.orderId)) {
        //nếu orderId hợp lệ lấy orderDetai
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

        this.orderService.getOrder(this.orderId).subscribe({
          next: (response: any) => {
            debugger;

            //convert object sang mảng
            this.orders = [response].map((orderResponse: any) => {
              const order: Order = {
                id: orderResponse.id,
                diningTableId: orderResponse.diningTableId,
                tableNumber: orderResponse.tableNumber,
                fullName: orderResponse.fullName,
                phoneNumber: orderResponse.phoneNumber,
                orderDate: new Date(orderResponse.orderDate),
                status: orderResponse.status,
                totalMoney: orderResponse.totalMoney,
                paymentMethod: orderResponse.paymentMethod,
                discount: orderResponse.discount,
                theDiscountedPrice: orderResponse.theDiscountedPrice,
                shippingAddress: orderResponse.shippingAddress,
                employeeId: orderResponse.employeeId,
                employeeName: orderResponse.employeeName,
              };
              return order;
            });
          },

          complete: () => {
            debugger;
          },

          error: (error: any) => {
            debugger;
            console.error('Error fetching detail', error);
          },
        });

        //lấy order
      } else {
        console.error('Invalid orderDetailId', idParam);
      }
    });
  }

  //in hóa đơn
  printOrderAnUpdateOrder() {
    debugger;
    this.orders.forEach((order) => {
      const updateOrderDTO: OrderDTO = {
        id: order.id,
        table_id: order.diningTableId,
        table_number: order.tableNumber,
        fullname: order.fullName,
        phone_number: order.phoneNumber,
        status: 'Đã thanh toán',
        total_money: order.totalMoney,
        payment_method: order.paymentMethod,
        discount: order.discount,
        the_discounted_price: order.theDiscountedPrice,
        shipping_address: order.shippingAddress,
        employee_id: order.employeeId,
        employee_name: order.employeeName,
        order_date: order.orderDate,
      };
      // return updateOrder;
      debugger;
      this.orderService.updateOrder(this.orderId, updateOrderDTO).subscribe({
        next: (response: any) => {
          debugger;
          this.router.navigate(['/home']);
        },

        complete: () => {
          debugger;
        },

        error: (error: any) => {
          debugger;
          console.error('Error update', error);
        },
      });
    });

    debugger;

    //in hóa đơn
    window.print();
  }

  printOrder() {
    window.print();
  }
}
