import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvitationsService } from 'src/app/new-services/invitations.service';
import { ProfilesService } from 'src/app/new-services/profiles.service';
import { RestaurantsService } from 'src/app/new-services/restaurants.service';
import { UserLoginService } from 'src/app/new-services/user-login.service';
import { Invitations, Profiles, Restaurants, ShortProfile } from 'src/app/shared/NewClasses';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public NotificationCounter: number = 0 ;
  public OldNotificationCounter: number = 0;
  public notificateMe: boolean = false;
  public notificattionsFirstPass: boolean = true;

  public restaurants: Restaurants[] = [];
  public restaurantsNames: string[] = [];

  public myInvitation: Invitations = new Invitations();
  public allInvitations: any;
  public UserInvitations: Invitations[] = [];

  public myProfiles: Profiles[] = [];
  public currentUser: Profiles = new Profiles();

  constructor(private userLoginService: UserLoginService,
              private router: Router,
              private restaurantsService: RestaurantsService,
              private profilesService: ProfilesService,
              private invitationsService: InvitationsService) { }

  ngOnInit(): void {
    // Getting the Whole Restaurants and store the names in the array
    this.restaurantsService.getRestaurants()
      .subscribe((data) => {
        this.restaurants = data;
        // console.log(this.restaurants);
        // console.log(this.restaurants[0].RestaurantName);
        let i = 0;
        this.restaurants.forEach(element => {
          this.restaurantsNames[i] = element.RestaurantName;
          i++;
        });
      });

    // Getting the all users profiles to grap the names and use them in the add invitation
      this.profilesService.getProfiles()
       .subscribe((data) => {
         this.myProfiles = data;
        //  console.log(this.myProfiles);
         data.forEach(elem => {
           if (elem.Email === this.userLoginService.returnedUser.user.email) {
             this.currentUser = elem;
           }
         });
        });

    this.invitationsService.getInvitations()
    .subscribe((data) => {
      console.log(data);
      this.UserInvitations = [];
      data.forEach((elem:Invitations) => {
        // console.log(elem.PeopleGroup);
        elem.PeopleGroup.forEach((elem2) => {
          // console.log(elem2);
          if (elem2 === `${this.currentUser.FirstName}${this.currentUser.LastName}`) {
            this.notificateMe = true;
            this.NotificationCounter++;
            this.UserInvitations.push(elem);
          }
        });
      });
      this.NotificationCounter = this.NotificationCounter - this.OldNotificationCounter;
      this.OldNotificationCounter = this.NotificationCounter;
    });
  }





  Create() {

    this.invitationsService.saveInvitation(this.myInvitation)
      .subscribe((data) => {console.log(data);});

  }

  Logout() {
    this.userLoginService.LogMeOut().then(() => {this.router.navigate(["/login"]);});
  }

}
