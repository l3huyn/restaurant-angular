import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CategoryDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
  }
}
