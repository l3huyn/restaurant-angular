import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiningTable } from '../models/dining.table';
import { Category } from '../models/category';
import { CategoryDTO } from '../dtos/category/category.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiCategory = `${environment.apiBaseUrl}/categories`;
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    debugger;
    return this.http.get<Category[]>(this.apiCategory);
  }

  getCategoryById(categoryId: number) {
    debugger;
    return this.http.get(`${environment.apiBaseUrl}/categories/${categoryId}`);
  }

  createCategory(categoryData: CategoryDTO): Observable<any> {
    debugger;
    return this.http.post(`${environment.apiBaseUrl}/categories`, categoryData);
  }

  updateCategory(
    categoryId: number,
    categoryData: CategoryDTO
  ): Observable<any> {
    debugger;
    return this.http.put(
      `${environment.apiBaseUrl}/categories/${categoryId}`,
      categoryData
    );
  }

  deleteCategory(categoryId: number): Observable<any> {
    debugger;
    return this.http.delete(
      `${environment.apiBaseUrl}/categories/${categoryId}`
    );
  }
}
