import { AdminComponent } from './admin.component';
import { OrderAdminComponent } from './order/order.admin.component';
import { OrderDetailAdminComponent } from './order-detail/order.detail.admin.component';
import { Route, Router, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductAdminComponent } from './product/product.admin.component';
import { CategoryAdminComponent } from './category/category.admin.component';
import { CategoryDetailAdminComponent } from './category-detail/category.detail.admin.component';
import { ProductDetailAdminComponent } from './product-detail/product.detail.admin.component';
import { DiningTableAdminComponent } from './dining-table/dining.table.admin.component';
import { DiningTableDetailAdminComponent } from './dining-table-detail/dining.table.detail.admin.component';
import { UserAdminComponent } from './user/user.admin.component';
import { UserDetailAdminComponent } from './user-detail/user.detail.admin.component';
import { RevenueAdminComponent } from './revenue-admin/revenue-admin.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'orders',
        component: OrderAdminComponent,
      },
      {
        path: 'orders/:id',
        component: OrderDetailAdminComponent,
      },
      {
        path: 'products',
        component: ProductAdminComponent,
      },
      {
        path: 'categories',
        component: CategoryAdminComponent,
      },
      {
        path: 'dining_tables',
        component: DiningTableAdminComponent,
      },
      {
        path: 'users',
        component: UserAdminComponent,
      },
      {
        path: 'revenues',
        component: RevenueAdminComponent,
      },

      {
        path: 'categories/:id',
        component: CategoryDetailAdminComponent,
      },
      { path: 'categories/new', component: CategoryDetailAdminComponent },

      {
        path: 'products/:id',
        component: ProductDetailAdminComponent,
      },
      {
        path: 'products/new',
        component: ProductDetailAdminComponent,
      },
      {
        path: 'dining_tables/:id',
        component: DiningTableDetailAdminComponent,
      },
      {
        path: 'dining_tables/new',
        component: DiningTableDetailAdminComponent,
      },
      {
        path: 'users/:id',
        component: UserDetailAdminComponent,
      },
      {
        path: 'users/new',
        component: UserDetailAdminComponent,
      },
      {
        path: 'users/:id',
        component: UserDetailAdminComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
