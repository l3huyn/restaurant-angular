import { UserResponse } from './../../responses/user/user.response';
import { DiningTable } from './../../models/dining.table';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { DiningTableService } from 'src/app/services/dining.table.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //khai báo các thuộc tính
  diningTables: DiningTable[] = []; //mảng chứa bàn ăn
  orders: Order[] = [];
  currentPage: number = 0; //trang hiện tại
  itemsPerPage: number = 16; //số sản phẩm trên 1 trang
  pages: number[] = []; // mảng rỗng
  totalPages: number = 0; //tổng số trang
  visiblePages: number[] = [];
  revenue: number = 0; //doanh thu
  orderId: any | string;
  ordersByDiningTableId: { [key: number]: Order[] } = {}; //bàn ăn dựa trên đơn hàng
  userResponse?: UserResponse | null;

  constructor(
    private diningTableService: DiningTableService,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  //hàm load đầu tiên
  ngOnInit() {
    debugger;
    this.getDiningTable(this.currentPage, this.itemsPerPage);

    debugger;
    this.getCurrentUnpaidOrders();

    //lấy doanh thu hôm nay
    this.getRevenue();

    debugger;
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  hasOrder(diningTableId: number): boolean {
    return !!this.ordersByDiningTableId[diningTableId];
  }

  //hàm lấy bàn ăn
  getDiningTable(page: number, limit: number) {
    debugger;
    this.diningTableService.getDiningTables(page, limit).subscribe({
      next: (response: any) => {
        debugger;
        this.diningTables = response.diningTables;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(
          this.currentPage,
          this.totalPages
        );
      },
      complete: () => {
        debugger;
      },
      error: (error: HttpErrorResponse) => {
        debugger;
        console.error(error?.error?.message ?? '');
      },
    });
  }

  //hàm tính doanh thu
  getRevenue() {
    debugger;
    this.orderService.getRevenue().subscribe({
      next: (response: any) => {
        debugger;
        this.revenue = response.revenue;
      },
      complete: () => {
        debugger;
      },
      error: (error: HttpErrorResponse) => {
        debugger;
        console.error(error?.error?.message ?? '');
      },
    });
  }

  //hàm lấy đơn hàng chưa thanh toán
  getCurrentUnpaidOrders() {
    debugger;
    this.orderService.getCurrentUnpaidOrders().subscribe({
      next: (response: any) => {
        debugger;
        this.orders = response;
        debugger;
        this.orders.forEach((order) => {
          debugger;
          if (!this.ordersByDiningTableId[order.diningTableId]) {
            this.ordersByDiningTableId[order.diningTableId] = [];
          }
          debugger;
          this.ordersByDiningTableId[order.diningTableId].push(order);
        });
      },
      complete: () => {
        debugger;
      },
      error: (error: HttpErrorResponse) => {
        debugger;
        console.error(error?.error?.message ?? '');
      },
    });
  }

  //hàm tạo phân trang
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    return new Array(endPage - startPage + 1)
      .fill(0)
      .map((_, index) => startPage + index);
  }

  //hàm lấy thay đổi của trang
  onPageChange(page: number) {
    debugger;
    this.currentPage = page;
    this.getDiningTable(this.currentPage, this.itemsPerPage);
  }
}
