import { UserResponse } from './../../responses/user/user.response';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/dtos/user/login.dto';
import { Role } from 'src/app/models/role';
import { LoginResponse } from 'src/app/responses/user/login.response';
import { RoleService } from 'src/app/services/role.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  //Khai báo các thuộc tính và truyền giá trị mặc định thì không cần viết hàm khởi tạo
  phoneNumber: string = '12345678';
  password: string = '12345678';

  roles: Role[] = []; //Mảng roles rỗng
  rememberMe: boolean = true;
  selectedRole: Role | undefined; //Biến lưu trữ được chọn từ dropdown
  userResponse?: UserResponse;

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) {}

  //Hàm khi nhấn vào phone là thay đổi
  onPhoneNumberChange() {
    console.log(`Phone typed: ${this.phoneNumber}`);
    //how to validate ? phone must be at least 6 characters
  }

  //khi load trang web -> nhảy đến hàm lấy ds các role
  ngOnInit() {
    //Gọi API lấy danh sách các roles lưu vào biến roles
    debugger;
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        //sử dụng kiểu Role[]
        debugger;
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: any) => {
        debugger;
        console.error('Error getting roles', error);
      },
    });
  }

  //Hàm đăng nhập
  login() {
    const message = `phone: ${this.phoneNumber} + 
                  password: ${this.password}`;

    debugger;

    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1,
    };

    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger;
        //lấy ra token
        const { token } = response; //trích xuất token từ response

        if (this.rememberMe) {
          //lưu token
          this.tokenService.setToken(token);
          this.userService.getUserDetail(token).subscribe({
            next: (response: any) => {
              debugger;
              this.userResponse = {
                id: response.id,
                fullname: response.fullname,
                position: response.position,
                phone_number: response.phone_number,
                address: response.address,
                email: response.email,
                hire_date: response.hire_date,
                salary: response.salary,
                role: response.role,
                password: response.password,
                role_id: response.role_id,
              };
              this.userService.saveUserResponseToLocalStorage(
                this.userResponse
              );
              //kiểm tra nếu admin -> trang admin, còn Thu ngân -> trang home
              if (this.userResponse?.role.name == 'admin') {
                this.router.navigate(['/admin/revenues']);
              } else if (this.userResponse?.position == 'Cashier') {
                //chuyển hướng đến home
                this.router.navigate(['/home']);
              } else if (this.userResponse?.position == 'Chef') {
                this.router.navigate(['/chef']);
              }
            },
            complete: () => {
              debugger;
            },
            error: (error: any) => {
              debugger;
              alert(error.error.message);
            },
          });
        }
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        alert(error?.error?.message);
      },
    });
  }
}
