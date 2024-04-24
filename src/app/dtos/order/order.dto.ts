import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDate,
  IsNumber,
} from 'class-validator';

export class OrderDTO {
  @IsNumber()
  id: number;

  @IsNumber()
  table_id: number;

  @IsString()
  table_number: string;

  @IsString()
  fullname: string;

  @IsString()
  phone_number: string;

  @IsDate()
  order_date: Date;

  @IsString()
  status: string;

  @IsNumber()
  total_money: number;

  @IsString()
  payment_method: string;

  @IsNumber()
  discount: number;

  @IsNumber()
  the_discounted_price: number;

  @IsString()
  shipping_address: string;

  @IsNumber()
  employee_id: number;

  @IsString()
  employee_name: string;

  constructor(data: any) {
    this.id = data.id;
    this.table_id = data.table_id;
    this.table_number = data.table_number;
    this.fullname = data.fullname;
    this.phone_number = data.phone_number;
    this.order_date = data.order_date;
    this.status = data.status;
    this.total_money = data.total_money;
    this.payment_method = data.payment_method;
    this.discount = data.discount;
    this.the_discounted_price = data.the_discounted_price;
    this.shipping_address = data.shipping_address;
    this.employee_id = data.employee_id;
    this.employee_name = data.employee_name;
  }
}
