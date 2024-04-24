import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { OrderResponse } from 'src/app/responses/order/order.response';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order.admin.component.html',
  styleUrls: ['./order.admin.component.scss'],
})
export class OrderAdminComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;

  orders: OrderResponse[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 6;
  pages: number[] = [];
  totalPages: number = 0;
  keyword: string = '';
  visiblePages: number[] = [];
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(private orderService: OrderService, private router: Router) {}
  ngOnInit(): void {
    debugger;
    this.getAllOrders(this.currentPage, this.itemsPerPage);

    debugger;
    // this.filterOrders(this.startDate, this.endDate);
  }
  getAllOrders(page: number, limit: number) {
    debugger;
    this.orderService.getAllOrders(page, limit).subscribe({
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
        console.error('Error fetching order:', error);
      },
    });
  }
  onPageChange(page: number) {
    debugger;
    this.currentPage = page;
    this.getAllOrders(this.currentPage, this.itemsPerPage);
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

  filterOrders(startDate: Date, endDate: Date) {
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
          console.error('Error fetching products:', error);
        },
      });
  }
}
