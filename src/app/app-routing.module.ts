import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { ChefComponent } from './components/chef/chef.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //màn hình mặc định là login
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  // { path: 'register', component: RegisterComponent },
  // { path: 'products/:id', component: DetailProduct Component },
  { path: 'order-detail/:id', component: OrderDetailComponent },
  { path: 'chef', component: ChefComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
