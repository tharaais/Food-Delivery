// Modules Imports Here :
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AdminModule } from './admin/admin.module';

import { environment } from "../environments/environment";


// Components Imports Here :
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InvitationDetailsComponent } from './components/invitation-details/invitation-details.component';
import { MealRequestComponent } from './components/meal-request/meal-request.component';

// Services Imports Here :

import { ProcessHttpErrorMsgService } from './new-services/process-http-error-msg.service';
import { ProfilesService } from './new-services/profiles.service';
import { RestaurantsService } from './new-services/restaurants.service';
import { MealsService } from './new-services/meals.service';
import { MealsRequestsService } from './new-services/meals-requests.service';
import { InvitationsService } from './new-services/invitations.service';
import { UserLoginService } from './new-services/user-login.service';




@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    ProfileComponent,
    InvitationDetailsComponent,
    MealRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AdminModule
  ],
  providers: [ProfilesService,
    RestaurantsService,
    MealsService,
    MealsRequestsService,
    InvitationsService,
    ProcessHttpErrorMsgService,
    UserLoginService,
    RestaurantsService,
    ProfilesService,
    MealsService,
    MealsRequestsService,
    InvitationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
