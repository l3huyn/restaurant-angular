import { Role } from 'src/app/models/role';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/user/user.response';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/app/dtos/user/user.dto';

@Component({
  selector: 'app-user-detail-admin',
  templateUrl: './user.detail.admin.component.html',
  styleUrls: ['./user.detail.admin.component.scss'],
})
export class UserDetailAdminComponent implements OnInit {
  userId: number = 0;

  userResponse: UserResponse = {
    id: 0,
    fullname: '',
    position: '',
    phone_number: '',
    email: '',
    address: '',
    hire_date: new Date(),
    salary: 0,
    role: { id: 1, name: 'Employee' },
    password: '',
    role_id: 1,
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.getUserById();
    } else {
    }
  }

  getUserById(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.userId).subscribe({
      next: (response: any) => {
        debugger;
        this.userResponse.id = response.id;
        this.userResponse.fullname = response.fullname;
        this.userResponse.position = response.position;
        this.userResponse.phone_number = response.phone_number;
        this.userResponse.email = response.email;
        this.userResponse.address = response.address;
        this.userResponse.hire_date = response.hire_date;
        this.userResponse.salary = response.salary;
        this.userResponse.role = response.role;
        this.userResponse.password = response.password;
        this.userResponse.role_id = response.role_id;
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

  saveUser(): void {
    if (this.userId) {
      debugger;
      this.userService
        .updateUser(this.userId, new UserDTO(this.userResponse))
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
            console.error('Error updating user:', error);
          },
        });
    } else {
      debugger;
      this.userService.createUser(new UserDTO(this.userResponse)).subscribe({
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
          console.error('Error updating user:', error);
        },
      });
    }
  }
}
