import { DiningTableService } from 'src/app/services/dining.table.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiningTableResponse } from 'src/app/responses/dining_table/dining.table.response';
import { DiningTableDTO } from 'src/app/dtos/dining_table/dining.table.dto';

@Component({
  selector: 'app-dining-table-detail-admin',
  templateUrl: './dining.table.detail.admin.component.html',
  styleUrls: ['./dining.table.detail.admin.component.scss'],
})
export class DiningTableDetailAdminComponent implements OnInit {
  diningTableId: number = 0;
  diningTableResponse: DiningTableResponse = {
    id: 0,
    table_number: '',
    capacity: 0,
    status: 'Đang trống',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private diningTableService: DiningTableService
  ) {}
  ngOnInit(): void {
    this.diningTableId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.diningTableId) {
      debugger;
      this.getDiningTableById();
    } else {
      debugger;
      this.getDiningTableById();
    }
  }

  getDiningTableById(): void {
    this.diningTableId = Number(this.route.snapshot.paramMap.get('id'));
    this.diningTableService.getDiningTableById(this.diningTableId).subscribe({
      next: (response: any) => {
        debugger;
        this.diningTableResponse.id = response.id;
        this.diningTableResponse.table_number = response.table_number;
        this.diningTableResponse.capacity = response.capacity;
        this.diningTableResponse.status = response.status;
      },

      complete: () => {
        debugger;
      },

      error: (error: any) => {
        debugger;
        console.error('Error fetching table', error);
      },
    });
  }

  saveDiningTable(): void {
    if (this.diningTableId) {
      debugger;
      this.diningTableService
        .updateDiningTable(
          this.diningTableId,
          new DiningTableDTO(this.diningTableResponse)
        )
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
            console.error('Error updating table:', error);
          },
        });
    } else {
      this.diningTableService
        .createDiningTable(new DiningTableDTO(this.diningTableResponse))
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
            console.error('Error create table:', error);
          },
        });
    }
  }
}
