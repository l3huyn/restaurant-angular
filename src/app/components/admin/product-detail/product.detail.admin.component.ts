import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDTO } from 'src/app/dtos/product/product.dto';
import { environment } from 'src/app/environments/environment';
import { Category } from 'src/app/models/category';
import { ProductResponse } from 'src/app/responses/product/product.response';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail-admin',
  templateUrl: './product.detail.admin.component.html',
  styleUrls: ['./product.detail.admin.component.scss'],
})
export class ProductDetailAdminComponent implements OnInit {
  productId: number = 0;
  categories: Category[] = [];
  selectedCategory: Category | undefined;
  selectedFile: File | null = null;

  productResponse: ProductResponse = {
    id: 0,
    name: '',
    thumbnail: '',
    price: 0,
    status: '',
    created_at: new Date(),
    updated_at: new Date(),
    quantity_sold: 0,
    category_id: 0,
    categoryName: '',
  };

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}
  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      debugger;
      this.getProduct();

      debugger;
      this.categoryService.getAllCategories().subscribe({
        next: (categories: Category[]) => {
          this.categories = categories;
          this.selectedCategory = categories.find(
            (category) => category.id === this.productResponse.category_id
          );
        },
        error: (error: any) => {
          console.error('Error getting category', error);
        },
      });
    } else {
      debugger;
      this.getProduct();
      debugger;
      this.categoryService.getAllCategories().subscribe({
        next: (categories: Category[]) => {
          this.categories = categories;
        },
        error: (error: any) => {
          console.error('Error getting category', error);
        },
      });
    }
  }

  getProduct(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.productId).subscribe({
      next: (response: any) => {
        debugger;
        this.productResponse.id = response.id;
        this.productResponse.name = response.name;
        this.productResponse.thumbnail = `${environment.apiBaseUrl}/products/images/${response.thumbnail}`;
        this.productResponse.price = response.price;
        this.productResponse.status = response.status;
        this.productResponse.created_at = response.created_at;
        this.productResponse.updated_at = response.updated_at;
        this.productResponse.quantity_sold = response.quantity_sold;
        this.productResponse.category_id = response.category_id;
        this.productResponse.categoryName = response.categoryName;
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

  updateCategoryId(categoryId: number) {
    debugger;
    this.productResponse.category_id = categoryId;
  }

  saveProduct(): void {
    if (this.productId) {
      debugger;
      this.productService
        .updateProduct(this.productId, new ProductDTO(this.productResponse))
        .subscribe({
          next: (response: any) => {
            debugger;
            //Upload image
            if (this.selectedFile) {
              this.productService
                .postImageProduct(this.productId, this.selectedFile)
                .subscribe({
                  next: (imageResponse: any) => {
                    // Xử lý phản hồi từ việc tải lên ảnh
                    console.log('Image uploaded successfully:', imageResponse);
                  },
                  error: (error: any) => {
                    console.error('Error uploading image:', error);
                  },
                });
            }

            debugger;
            // Navigate back to the previous page
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          complete: () => {
            debugger;
          },
          error: (error: any) => {
            debugger;
            console.error('Error updating product:', error);
          },
        });
    } else {
      this.productService
        .createProduct(new ProductDTO(this.productResponse))
        .subscribe({
          next: (response: any) => {
            if (this.selectedFile) {
              this.productService
                .postImageProduct(this.productId, this.selectedFile)
                .subscribe({
                  next: (imageResponse: any) => {
                    // Xử lý phản hồi từ việc tải lên ảnh
                    console.log('Image uploaded successfully:', imageResponse);
                  },
                  error: (error: any) => {
                    console.error('Error uploading image:', error);
                  },
                });
            }
            debugger;
            // Navigate back to the previous page
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          complete: () => {
            debugger;
          },
          error: (error: any) => {
            debugger;
            console.error('Error create product:', error);
          },
        });
    }
  }

  onFileSelected(event: any): void {
    // Lấy ra file từ sự kiện change
    const files: FileList = event.target.files;

    // Kiểm tra xem người dùng đã chọn file hay chưa
    if (files.length > 0) {
      // Lưu trữ file được chọn
      this.selectedFile = files[0];
    } else {
      this.selectedFile = null;
    }
  }
}
