import { CategoryResponse } from './../../../responses/category/category.response';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDTO } from 'src/app/dtos/category/category.dto';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-detail-admin',
  templateUrl: './category.detail.admin.component.html',
  styleUrls: ['./category.detail.admin.component.scss'],
})
export class CategoryDetailAdminComponent implements OnInit {
  // categories: Category[] = [];
  categoryId: number = 0;
  name: string = '';

  categoryResponse: CategoryResponse = {
    id: 0,
    name: '',
  };

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.categoryId) {
      debugger;
      this.getCategory();
    } else {
      this.getCategory();
    }
  }

  getCategory(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (response: any) => {
        debugger;
        this.categoryResponse.name = response.name;
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

  saveCategory(): void {
    if (this.categoryId) {
      debugger;
      this.categoryService
        .updateCategory(this.categoryId, new CategoryDTO(this.categoryResponse))
        .subscribe({
          next: (response: any) => {
            debugger;
            // Navigate back to the previous page
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          complete: () => {
            debugger;
          },
          error: (error: any) => {
            debugger;
            console.error('Error updating category:', error);
          },
        });
    } else {
      this.categoryService
        .createCategory(new CategoryDTO(this.categoryResponse))
        .subscribe({
          next: (response: any) => {
            debugger;
            // Navigate back to the previous page
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          complete: () => {
            debugger;
          },
          error: (error: any) => {
            debugger;
            console.error('Error create category:', error);
          },
        });
    }
  }
}
