import { Role } from 'src/app/models/role';

export interface UserResponse {
  id: number;
  fullname: string;
  password: string;
  position: string;
  phone_number: string;
  email: string;
  address: string;
  hire_date: Date;
  salary: number;
  role: Role;
  role_id: number;
}
