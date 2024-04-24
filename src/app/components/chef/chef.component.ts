import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMessage } from '@stomp/stompjs';

import { environment } from 'src/app/environments/environment';
import { Category } from 'src/app/models/category';
import { OrderDetail } from 'src/app/models/order.detail';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { ProductResponse } from 'src/app/responses/product/product.response';
import { CategoryService } from 'src/app/services/category.service';
import { OrderDetailService } from 'src/app/services/order.detail.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { WebSocketService } from 'src/app/services/web.socket.service';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.scss'],
})
export class ChefComponent implements OnInit {
  orders: OrderResponse[] = [];
  products: ProductResponse[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 50;
  totalPages: number = 0;
  orderDetails: OrderDetail[] = [];
  categories: Category[] = [];
  tableNumber: string = '';
  orderId: number = 0;

  keyword: string = '';
  selectedCategoryId: number = 0;

  messages: string[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private orderDetalService: OrderDetailService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    debugger;
    this.getAllOrders(this.currentPage, this.itemsPerPage);
    this.getAllProducts(
      this.keyword,
      this.selectedCategoryId,
      this.currentPage,
      this.itemsPerPage
    );
    this.getCategories();

    this.webSocketService.connect();
    // this.webSocketService.subscribe('/topic/orders', (message: IMessage) => {
    //   console.log('Received message:', message.body);
    //   // Xử lý thông điệp ở đây và cập nhật giao diện nếu cần
    // });
  }

  searchProducts() {
    this.currentPage = 0;
    this.itemsPerPage = 50;

    debugger;
    this.getAllProducts(
      this.keyword,
      this.selectedCategoryId,
      this.currentPage,
      this.itemsPerPage
    );
  }

  //hàm lấy categories
  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: Category[]) => {
        debugger;
        this.categories = categories;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  getAllOrders(page: number, limit: number) {
    debugger;
    this.orderService.getAllOrders(page, limit).subscribe({
      next: (response: any) => {
        debugger;
        this.orders = response.orders;
        this.totalPages = response.totalPages;
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

  showOrderDetail(orderId: number) {
    debugger;
    this.orderDetalService.getOrderDetail(orderId).subscribe({
      next: (response: any) => {
        debugger;
        this.orderDetails = response;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching order detail:', error);
      },
    });
    debugger;
    this.orderService.getOrderById(orderId).subscribe({
      next: (response: any) => {
        debugger;
        this.tableNumber = response.tableNumber;
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

  getAllProducts(
    keyword: string,
    selectedCategoryId: number,
    page: number,
    limit: number
  ) {
    debugger;
    this.productService
      .getAllProducts(keyword, selectedCategoryId, page, limit)
      .subscribe({
        next: (response: any) => {
          debugger;
          response.products.forEach((productResponse: ProductResponse) => {
            productResponse.thumbnail = `${environment.apiBaseUrl}/products/images/${productResponse.thumbnail}`;
          });
          this.products = response.products;
          this.totalPages = response.totalPages;
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

  getTableNumberById(orderId: number) {
    debugger;
    this.orderService.getOrderById(orderId).subscribe({
      next: (response: any) => {
        debugger;
        this.tableNumber = response.tableNumber;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching order detail:', error);
      },
    });
  }

  completeOrder() {}
}
