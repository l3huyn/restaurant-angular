import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Category } from 'src/app/models/category';
import { ProductResponse } from 'src/app/responses/product/product.response';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product.admin.component.html',
  styleUrls: ['./product.admin.component.scss'],
})
export class ProductAdminComponent implements OnInit {
  products: ProductResponse[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 6;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];
  categories: Category[] = [];
  keyword: string = '';
  selectedCategoryId: number = 0;

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getAllProducts(
      this.keyword,
      this.selectedCategoryId,
      this.currentPage,
      this.itemsPerPage
    );
    this.getCategories();
  }

  searchProducts() {
    this.currentPage = 0;
    this.itemsPerPage = 6;

    debugger;
    this.getAllProducts(
      this.keyword,
      this.selectedCategoryId,
      this.currentPage,
      this.itemsPerPage
    );
  }

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

  viewDetails(productId: number) {
    debugger;
    this.router.navigate(['/admin/products', productId]);
  }

  addNewProduct() {
    debugger;
    this.router.navigate(['/admin/products/new']);
  }

  deleteProduct(productId: number) {
    const confirmation = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmation) {
      debugger;
      this.productService.deleteProduct(productId).subscribe({
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

  onPageChange(page: number) {
    debugger;
    this.currentPage = page;
    this.getAllProducts(
      this.keyword,
      this.selectedCategoryId,
      this.currentPage,
      this.itemsPerPage
    );
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
