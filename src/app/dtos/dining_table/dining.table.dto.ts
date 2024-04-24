import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDate,
  IsNumber,
} from 'class-validator';

export class DiningTableDTO {
  @IsNumber()
  id: number;

  @IsString()
  table_number: string;

  @IsNumber()
  capacity: number;

  @IsString()
  status: string;

  constructor(data: any) {
    this.id = data.id;
    this.table_number = data.table_number;
    this.capacity = data.capacity;
    this.status = data.status;
  }
}
