export interface ProductResponse {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
  status: string;
  created_at: Date;
  updated_at: Date;
  quantity_sold: number;
  category_id: number;
  categoryName: string;
}
