import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDate,
  IsNumber,
} from 'class-validator';

export class UserDTO {
  @IsNumber()
  id: number;

  @IsString()
  fullname: string;

  @IsString()
  position: string;

  @IsString()
  phone_number: string;

  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsDate()
  hire_date: Date;

  @IsNumber()
  salary: number;

  @IsNumber()
  role_id: number;

  @IsString()
  password: string;

  constructor(data: any) {
    this.id = data.id;
    this.fullname = data.fullname;
    this.position = data.position;
    this.phone_number = data.phone_number;
    this.email = data.email;
    this.address = data.address;
    this.hire_date = data.hire_date;
    this.salary = data.salary;
    this.role_id = data.role_id;
    this.password = data.password;
  }
}
