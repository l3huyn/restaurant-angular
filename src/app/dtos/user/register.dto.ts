import { IsString, IsNotEmpty, IsPhoneNumber, IsDate } from 'class-validator';

//thay vì sử dụng registerData thì ta dùng registerDTO để có thể validate
export class RegisterDTO {
  @IsString()
  fullname: string;

  @IsNotEmpty()
  position: string;

  @IsPhoneNumber()
  phone_number: string;

  @IsNotEmpty()
  email: string;

  @IsString()
  address: string;

  @IsDate()
  hire_date: Date;

  @IsNotEmpty()
  salary: number;

  role_id: number = 1;

  @IsString()
  @IsNotEmpty()
  password: string;

  //hàm khởi tạo
  constructor(data: any) {
    this.fullname = data.fullname;
    this.position = data.position;
    this.phone_number = data.phone_number;
    this.email = data.email;
    this.address = data.address;
    this.hire_date = data.hire_date;
    this.salary = data.salary;
    this.role_id = data.role_id || 1;
    this.password = data.password;
  }
}
