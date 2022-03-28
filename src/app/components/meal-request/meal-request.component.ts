import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealsRequestsService } from 'src/app/new-services/meals-requests.service';
import { MealsService } from 'src/app/new-services/meals.service';
import { ProfilesService } from 'src/app/new-services/profiles.service';
import { RestaurantsService } from 'src/app/new-services/restaurants.service';
import { UserLoginService } from 'src/app/new-services/user-login.service';

import { Meals, MealsRequests, Profiles, Restaurants } from 'src/app/shared/NewClasses';

@Component({
  selector: 'app-meal-request',
  templateUrl: './meal-request.component.html',
  styleUrls: ['./meal-request.component.css']
})
export class MealRequestComponent implements OnInit {

  invitation: any;
  myRest: Restaurants[] = [];
  myPersons: Profiles[] = [];
  restaurant = new Restaurants();
  mealRequest = new MealsRequests();
  selectedMeal = new Meals();

  constructor(private restaurentService: RestaurantsService,
              private mealsRequestsService: MealsRequestsService,
              private mealService: MealsService,
              private activateRoute: ActivatedRoute,
              private userLoginService: UserLoginService,
              private profilesSRV: ProfilesService) {

  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      console.log("invitation : " , params);
      this.invitation = params;
      this.restaurentService.getRestaurants().subscribe(restaurantResult => {
            console.log(restaurantResult);
            this.myRest = restaurantResult;
            this.myRest.forEach(elem => {
              if (elem.RestaurantName === this.invitation.params.RestaurantName) {
                this.restaurant = elem;
              }
            });
          })
    });

    this.profilesSRV.getProfiles()
      .subscribe((data) => {
        this.myPersons = data;
      });
  }



  selectt(soso: string , meal: Meals){
    let count = Number(soso);
    console.log("count : " , count);


    this.selectedMeal=meal;

    meal.Count=count;
    console.log("meal  : " , meal);
    console.log("selecteddd meal :   " , this.selectedMeal);

    if(count > 0){


      if(!this.mealRequest.Meal.includes(this.selectedMeal)){
       this.selectedMeal.Count=count;
       console.log("push" , this.selectedMeal.MealName);
       this.mealRequest.Meal.push(this.selectedMeal);
       this.mealRequest.TotalPrice = this.mealRequest.TotalPrice + ( this.selectedMeal.Price * count);
      }else{

      if(this.mealRequest.Meal.includes(this.selectedMeal) ){

       if((this.mealRequest.Count>count))
      {
       console.log("count not equal");
        this.mealRequest.TotalPrice = this.mealRequest.TotalPrice - ( this.selectedMeal.Price * (count-1));
       }
       else{
         this.mealRequest.TotalPrice = this.mealRequest.TotalPrice + ( this.selectedMeal.Price * (count-1));

       }
      }}

    }else{
     this.mealRequest.TotalPrice = this.mealRequest.TotalPrice - ( this.selectedMeal.Price * count);
    }

 }


  SaveMealRequest(mealRequestt: MealsRequests) {
     console.log("meal requestt " , mealRequestt);
     let userMail = this.userLoginService.returnedUser.user.email;
     this.myPersons.forEach(elem => {
       if((elem.Email) === userMail) {
          mealRequestt.PersonName = (elem.FirstName) + (elem.LastName) ;
       }
     });
     this.mealsRequestsService.saveMealsRequest(mealRequestt).subscribe(result => {
       console.log("result save meal request:  " , result);
     });
  }

}
