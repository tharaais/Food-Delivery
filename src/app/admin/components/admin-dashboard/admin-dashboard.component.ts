import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodManageService } from '../../services/food-manage.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public RestaurantsNumber: number = 0;
  public UsersNumber: number = 0;
  public InvitationsNumber: number = 0;
  public MealsRequestsNumber: number = 0;

  constructor(private FoodManageService: FoodManageService,
              private router: Router) { }

  ngOnInit(): void {

    this.FoodManageService.PrepareData().subscribe((data) => {
      console.log("Is the data Ready??" + data);
      if(data === true) {
        this.RestaurantsNumber = this.FoodManageService.RestaurantsNumber;
        this.UsersNumber = this.FoodManageService.UsersNumber;
        this.InvitationsNumber = this.FoodManageService.InvitationsNumber;
        this.MealsRequestsNumber = this.FoodManageService.MealsRequestsNumber;
      }
    });
}

  foodManage() {
    this.router.navigateByUrl("/dashboard/food");
  }

}
