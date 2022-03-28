import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginAuthGuard } from '../guards/admin-login-auth.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { FoodManageComponent } from './components/food-manage/food-manage.component';

const routes: Routes = [
  {path: "admin", component: AdminLoginComponent},
  {path: "dashboard", component: AdminDashboardComponent, children: [
    {path: "food", component: FoodManageComponent}
  ], canActivate:[AdminLoginAuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {

  constructor() {}
}
