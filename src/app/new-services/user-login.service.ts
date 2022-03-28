import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Profiles } from '../shared/NewClasses';


@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  public returnedUser: any;

  constructor(private ngFirebaseAuth: AngularFireAuth) { }

  async LogMeIn(user: Profiles) {
    this.returnedUser = await this.ngFirebaseAuth.signInWithEmailAndPassword(user.Email, user.Password);
    console.log(this.returnedUser);
  }

  async RegisterMe(user: Profiles) {
    this.returnedUser = await this.ngFirebaseAuth.createUserWithEmailAndPassword(user.Email, user.Password);
    console.log(this.returnedUser);
  }

  async LogMeOut() {
    this.returnedUser = await this.ngFirebaseAuth.signOut();
    console.log(this.returnedUser);
  }
}
