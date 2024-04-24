import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiningTable } from '../models/dining.table';
import { DiningTableDTO } from '../dtos/dining_table/dining.table.dto';

@Injectable({
  providedIn: 'root',
})
export class DiningTableService {
  private apiDiningTable = `${environment.apiBaseUrl}/dining_tables`;

  constructor(private http: HttpClient) {}

  //hàm lấy bàn ăn
  getDiningTables(page: number, limit: number): Observable<DiningTable[]> {
    const params = { page: page.toString(), limit: limit.toString() };
    debugger;
    return this.http.get<DiningTable[]>(this.apiDiningTable, { params });
  }

  deleteDiningTable(id: number): Observable<any> {
    debugger;
    const url = `${environment.apiBaseUrl}/dining_tables/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  getDiningTableById(id: number) {
    debugger;
    return this.http.get(`${environment.apiBaseUrl}/dining_tables/${id}`);
  }

  updateDiningTable(
    diningTableId: number,
    diningTableData: DiningTableDTO
  ): Observable<any> {
    debugger;
    return this.http.put(
      `${environment.apiBaseUrl}/dining_tables/${diningTableId}`,
      diningTableData
    );
  }

  createDiningTable(diningTableData: DiningTableDTO): Observable<any> {
    debugger;
    return this.http.post(
      `${environment.apiBaseUrl}/dining_tables`,
      diningTableData,
      { responseType: 'text' } //Nếu backend trả về string thì sử dụng
    );
  }

  getTotalTable() {
    debugger;
    return this.http.get(`${environment.apiBaseUrl}/dining_tables/total_table`);
  }
}
