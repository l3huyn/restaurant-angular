import { ProductResponse } from './../responses/product/product.response';
import { Order } from 'src/app/models/order';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDTO } from '../dtos/order/order.dto';
import { OrderResponse } from '../responses/order/order.response';
import { ProductDTO } from '../dtos/product/product.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiProduct = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(
    keyword: string,
    categoryId: number,
    page: number,
    limit: number
  ): Observable<ProductResponse[]> {
    debugger;
    const params = {
      keyword: keyword,
      category_id: categoryId.toString(),
      page: page.toString(),
      limit: limit.toString(),
    };
    return this.http.get<any>(this.apiProduct, { params });
  }

  getProductById(id: number) {
    debugger;
    return this.http.get(`${environment.apiBaseUrl}/products/${id}`);
  }

  createProduct(productData: ProductDTO): Observable<any> {
    debugger;
    return this.http.post(`${environment.apiBaseUrl}/products`, productData, {
      responseType: 'text',
    });
  }

  postImageProduct(idProduct: number, file: File): Observable<any> {
    debugger;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(
      `${environment.apiBaseUrl}/products/uploads/${idProduct}`,
      formData
    );
  }

  updateProduct(productId: number, productData: ProductDTO): Observable<any> {
    debugger;
    return this.http.put(
      `${environment.apiBaseUrl}/products/${productId}`,
      productData
    );
  }

  deleteProduct(id: number): Observable<any> {
    debugger;
    const url = `${environment.apiBaseUrl}/products/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
