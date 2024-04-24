import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './components/interceptors/token.interceptor';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './components/admin/admin.component';
//import { OrderAdminComponent } from './components/admin/order/order.admin.component';
import { CommonModule } from '@angular/common';
import { AdminModule } from './components/admin/admin.module';
import { ProductDetailAdminComponent } from './components/admin/product-detail/product.detail.admin.component';
import { DiningTableAdminComponent } from './components/admin/dining-table/dining.table.admin.component';
import { DiningTableDetailAdminComponent } from './components/admin/dining-table-detail/dining.table.detail.admin.component';
import { ChefComponent } from './components/chef/chef.component';
//import { CategoryAdminComponent } from './components/admin/category/category.admin.component';
//import { ProductAdminComponent } from './components/admin/product/product.admin.component';

@NgModule({
  declarations: [
    HomeComponent,
    OrderDetailComponent,
    HeaderComponent,
    LoginComponent,
    AppComponent,
    ChefComponent,

    // AdminComponent,
    // OrderAdminComponent,
    // CategoryAdminComponent,
    // ProductAdminComponent,
    // DiningTableAdminComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    AdminModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [
    AppComponent,
    // HomeComponent,
    // OrderDetailComponent,
    // LoginComponent,
  ],
})
export class AppModule {}
