import { HttpErrorResponse } from '@angular/common/http';
import { DiningTableResponse } from './../../../responses/dining_table/dining.table.response';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiningTableService } from 'src/app/services/dining.table.service';

@Component({
  selector: 'app-dining-table-admin',
  templateUrl: './dining.table.admin.component.html',
  styleUrls: ['./dining.table.admin.component.scss'],
})
export class DiningTableAdminComponent implements OnInit {
  diningTables: DiningTableResponse[] = [];
  total_table: number = 0; //tổng bàn
  currentPage: number = 0; //trang hiện tại
  itemsPerPage: number = 9; //số sản phẩm trên 1 trang
  pages: number[] = []; // mảng rỗng
  totalPages: number = 0; //tổng số trang
  visiblePages: number[] = [];

  constructor(
    private router: Router,
    private diningTableService: DiningTableService
  ) {}

  ngOnInit(): void {
    this.getAllDiningTables(this.currentPage, this.itemsPerPage);
    this.getTotalTable();
  }

  getAllDiningTables(page: number, limit: number) {
    debugger;
    this.diningTableService.getDiningTables(page, limit).subscribe({
      next: (response: any) => {
        debugger;
        this.diningTables = response.diningTables;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(
          this.currentPage,
          this.totalPages
        );
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

  viewDetails(diningTableId: number) {
    debugger;
    this.router.navigate(['/admin/dining_tables', diningTableId]);
  }

  addNewDiningTable() {
    debugger;
    this.router.navigate(['/admin/dining_tables/new']);
  }

  deleteDiningTable(id: number) {
    const confirmation = window.confirm(
      'Are you sure you want to delete this table?'
    );
    if (confirmation) {
      debugger;
      this.diningTableService.deleteDiningTable(id).subscribe({
        next: (response: any) => {
          debugger;
          location.reload();
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          debugger;
          console.error('Error fetching table:', error);
        },
      });
    }
  }

  getTotalTable() {
    this.diningTableService.getTotalTable().subscribe({
      next: (response: any) => {
        debugger;
        this.total_table = response.totalTable;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching table:', error);
      },
    });
  }

  //hàm tạo phân trang
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

  //hàm lấy thay đổi của trang
  onPageChange(page: number) {
    debugger;
    this.currentPage = page;
    this.getAllDiningTables(this.currentPage, this.itemsPerPage);
  }
}
