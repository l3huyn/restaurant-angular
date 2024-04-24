import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDTO } from 'src/app/dtos/category/category.dto';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category.admin.component.html',
  styleUrls: ['./category.admin.component.scss'],
})
export class CategoryAdminComponent implements OnInit {
  categories: Category[] = [];
  categoryId: number = 0;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    debugger;
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        debugger;
        this.categories = response;
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

  viewDetails(categoryId: number) {
    debugger;
    this.router.navigate(['/admin/categories', categoryId]);
  }

  addNewCategory() {
    debugger;
    this.router.navigate(['/admin/categories/new']);
  }

  deleteCategory(categoryId: number) {
    debugger;
    const confirmation = window.confirm(
      'Are you sure you want to delete this category?'
    );
    if (confirmation) {
      debugger;
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: (response: any) => {
          debugger;
          location.reload();
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          debugger;
          console.error('Error fetching category:', error);
        },
      });
    }
  }
}
