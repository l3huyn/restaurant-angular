import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-revenue-admin',
  templateUrl: './revenue-admin.component.html',
  styleUrls: ['./revenue-admin.component.scss'],
})
export class RevenueAdminComponent implements OnInit {
  // @ViewChild('registerForm') registerForm!: NgForm;

  revenue_today: number = 0;
  revenue_by_date_range: number = 0;
  startDate: Date = new Date();
  endDate: Date = new Date();

  orders: OrderResponse[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 50;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];
  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    this.getRevenue();
  }

  //hàm tính doanh thu hôm nay
  getRevenue() {
    debugger;
    this.orderService.getRevenue().subscribe({
      next: (response: any) => {
        debugger;
        this.revenue_today = response.revenue;
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

  getRevenueByDateRange(startDate: Date, endDate: Date) {
    debugger;
    this.orderService.getRevenueByDateRange(startDate, endDate).subscribe({
      next: (response: any) => {
        debugger;
        this.revenue_by_date_range = response.revenue;
      },
      complete: () => {
        debugger;
      },
      error: (error: HttpErrorResponse) => {
        debugger;
        console.error(error?.error?.message ?? '');
      },
    });

    //lấy các đơn hàng tương ứng theo ngày
    debugger;
    this.orderService
      .filterOrdersByDateRange(
        startDate,
        endDate,
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (response: any) => {
          debugger;
          this.orders = response.orders;
          this.totalPages = response.totalPages;
          this.visiblePages = this.generateVisiblePageArray(
            this.currentPage,
            this.totalPages
          );
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          debugger;
          console.error('Error fetching orders:', error);
        },
      });
  }

  deleteOrder(id: number) {
    const confirmation = window.confirm(
      'Are you sure you want to delete this order?'
    );
    if (confirmation) {
      debugger;
      this.orderService.deleteOrder(id).subscribe({
        next: (response: any) => {
          debugger;
          location.reload();
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          debugger;
          console.error('Error fetching products:', error);
        },
      });
    }
  }
  viewDetails(order: OrderResponse) {
    debugger;
    this.router.navigate(['/admin/orders', order.id]);
  }

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
}
