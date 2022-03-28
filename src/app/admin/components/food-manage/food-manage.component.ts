import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { RestaurantsService } from 'src/app/new-services/restaurants.service';
import { Meals, Restaurants } from 'src/app/shared/NewClasses';
import { FoodManageService } from '../../services/food-manage.service';

@Component({
  selector: 'app-food-manage',
  templateUrl: './food-manage.component.html',
  styleUrls: ['./food-manage.component.css']
})
export class FoodManageComponent implements OnInit {

  public Restaurants: Restaurants[] = [];
  public Meals: Meals[] = [];

  public SavedRestaurant: Restaurants = new Restaurants();
  public SavedMeal: Meals = new Meals();

  constructor(private FoodManageService: FoodManageService,
              private RestaurantService: RestaurantsService,
              private db: AngularFireDatabase) { }

  ngOnInit(): void {

    this.FoodManageService.PrepareData().subscribe((data) => {
      if(data === true) {
        this.Restaurants = this.FoodManageService.myRestaurants;
        console.log("The Restaurants are = ");
        console.log(this.Restaurants);
      }
    });


    let itemRef = this.db.list("Restaurants");
    itemRef.snapshotChanges(["child_added"]).subscribe((action) => {
      console.log("Testing the Angular Firebase Module")
      action.forEach(elem => {
        console.log(elem.type);
        console.log(elem.key);
        console.log(elem.prevKey);
        console.log(elem.payload.val());
      });
    });

  }

  ReadRest(rest: string) {

    this.Meals = [];

    this.Restaurants.forEach(elem => {
      if(elem.RestaurantName === rest) {
        this.Meals = elem.Meals;
      }
    });
  }

  SaveRestaurant() {
    this.RestaurantService.saveRestaurant(this.SavedRestaurant)
      .subscribe((data) => {
        this.RestaurantService.getRestaurantByID(String(data))
          .subscribe((data) => {
            console.log("The Saved Restaurant is :");
            console.log(data);
          });
      });
  }


  SaveMeal() {

  }







}
