import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDate,
  IsNumber,
} from 'class-validator';

export class ProductDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  thumbnail: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity_sold: number;

  @IsString()
  status: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsNumber()
  category_id: number;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.thumbnail = data.thumbnail;
    this.price = data.price;
    this.quantity_sold = data.quantity_sold;
    this.status = data.status;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.category_id = data.category_id;
  }
}
