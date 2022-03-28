// Modules Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from "./admin-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components Import
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { FoodManageComponent } from './components/food-manage/food-manage.component';


// Services Imports
import { FoodManageService } from './services/food-manage.service'

// Angular Materials Imports



@NgModule({
  declarations: [AdminLoginComponent, AdminDashboardComponent, FoodManageComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [FoodManageService]
})
export class AdminModule { }
