import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { OrderAdminComponent } from './order/order.admin.component';
import { ProductAdminComponent } from './product/product.admin.component';
import { CategoryAdminComponent } from './category/category.admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderDetailAdminComponent } from './order-detail/order.detail.admin.component';
import { CategoryDetailAdminComponent } from './category-detail/category.detail.admin.component';
import { ProductDetailAdminComponent } from './product-detail/product.detail.admin.component';
import { DiningTableAdminComponent } from './dining-table/dining.table.admin.component';
import { DiningTableDetailAdminComponent } from './dining-table-detail/dining.table.detail.admin.component';
import { UserAdminComponent } from './user/user.admin.component';
import { UserDetailAdminComponent } from './user-detail/user.detail.admin.component';
import { RevenueAdminComponent } from './revenue-admin/revenue-admin.component';

@NgModule({
  declarations: [
    AdminComponent,
    OrderAdminComponent,

    ProductAdminComponent,
    CategoryAdminComponent,
    OrderDetailAdminComponent,
    CategoryDetailAdminComponent,
    ProductDetailAdminComponent,
    DiningTableAdminComponent,
    DiningTableDetailAdminComponent,
    UserAdminComponent,
    UserDetailAdminComponent,
    RevenueAdminComponent,
  ],
  imports: [
    AdminRoutingModule, // import routes,
    CommonModule,
    FormsModule,
  ],
})
export class AdminModule {}
