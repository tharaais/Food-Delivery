import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profiles } from 'src/app/shared/NewClasses';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  public returnedUser: any;

  constructor(private ngFireBaseAuth: AngularFireAuth) { }

  async LogMeIn(user: Profiles) {
    this.returnedUser = await this.ngFireBaseAuth.signInWithEmailAndPassword(user.Email, user.Password);
    console.log(this.returnedUser);
  }

  async LogMeOut() {
    this.returnedUser = await this.ngFireBaseAuth.signOut();
    console.log(this.returnedUser);
  }
}
