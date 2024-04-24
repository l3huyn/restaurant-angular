import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/user/user.response';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user.admin.component.html',
  styleUrls: ['./user.admin.component.scss'],
})
export class UserAdminComponent implements OnInit {
  users: UserResponse[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 6;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers(this.currentPage, this.itemsPerPage);
  }

  getAllUsers(page: number, limit: number) {
    debugger;
    this.userService.getAllUsers(page, limit).subscribe({
      next: (response: any) => {
        debugger;
        this.users = response.users;
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

  viewDetails(userId: number) {
    debugger;
    this.router.navigate(['/admin/users', userId]);
  }

  addNewUser() {
    debugger;
    this.router.navigate(['/admin/users/new']);
  }

  deleteUser(userId: number) {
    const confirmation = window.confirm(
      'Are you sure you want to delete this user?'
    );
    if (confirmation) {
      debugger;
      this.userService.deleteUser(userId).subscribe({
        next: (response: any) => {
          debugger;
          location.reload();
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          debugger;
          console.error('Error fetching user:', error);
        },
      });
    }
  }

  onPageChange(page: number) {
    debugger;
    this.currentPage = page;
    this.getAllUsers(this.currentPage, this.itemsPerPage);
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
