import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { InvitationsService } from 'src/app/new-services/invitations.service';
import { MealsRequestsService } from 'src/app/new-services/meals-requests.service';
import { ProfilesService } from 'src/app/new-services/profiles.service';
import { RestaurantsService } from 'src/app/new-services/restaurants.service';
import { Invitations, MealsRequests, Profiles, Restaurants } from 'src/app/shared/NewClasses';

@Injectable({
  providedIn: 'root'
})
export class FoodManageService {

  public RestaurantsNumber: number = 0;
  public UsersNumber: number = 0;
  public InvitationsNumber: number = 0;
  public MealsRequestsNumber: number = 0;

  public myProfiles: Profiles[] = [];
  public myRestaurants: Restaurants[] = [];
  public myInvitations: Invitations[] = [];
  public myMealsRequests: MealsRequests[] = [];

  private Ready: BehaviorSubject<boolean>;

  constructor(private profilesService: ProfilesService,
              private restaurantsService: RestaurantsService,
              private invitationsService: InvitationsService,
              private mealsRequestsService: MealsRequestsService) {

      this.Ready = new BehaviorSubject<boolean>(false);
  }

  PrepareData(): Observable<boolean> {
      this.profilesService.getProfiles()
      .subscribe((data) => {
        this.myProfiles = data;
        this.UsersNumber = this.myProfiles.length;
        console.log("1- Users are Ready !");
        this.restaurantsService.getRestaurants()
        .subscribe((data) => {
          this.myRestaurants = data;
          this.RestaurantsNumber = this.myRestaurants.length;
          console.log("2- Restaurants are Ready !!");
          this.invitationsService.getInvitations()
          .subscribe((data) => {
            this.myInvitations = data;
            this.InvitationsNumber = this.myInvitations.length;
            console.log("3- Invitations are Ready !!!!");
            this.mealsRequestsService.getMealsRequests()
            .subscribe((data) => {
              this.myMealsRequests = data;
              this.MealsRequestsNumber = this.myMealsRequests.length;
              console.log("4- Meals Requests Are Ready !!!");
              this.Ready.next(true);
            });
          });
        });
      });

      return this.Ready.asObservable();
  }

}
