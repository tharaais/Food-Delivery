import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHttpErrorMsgService } from './process-http-error-msg.service';
import { FireBaseURL } from '../shared/FirebaseURL';
import { Restaurants } from '../shared/NewClasses';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient,
              private errorService: ProcessHttpErrorMsgService,
              private db: AngularFireDatabase) { }

  getRestaurants(): Observable<any> {
    const RestaurantsRef = this.db.list("Restaurants");

    return RestaurantsRef.valueChanges();
  }

  getRestaurantByID(ID: string): Observable<Restaurants> {
    return this.http.get<Restaurants>(FireBaseURL + "Restaurants/" + ID + ".json")
    .pipe(catchError(this.errorService.handleError));
  }

  updateRestaurant(Restaurant: Restaurants): void {
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
    this.http.put<void>(FireBaseURL + "Restaurants/" + Restaurant.ID + ".json",Restaurant,httpOptions)
    .pipe(catchError(this.errorService.handleError));
  }

  saveRestaurant(Restaurant: Restaurants): Observable<Restaurants> {
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
    return this.http.post<Restaurants>(FireBaseURL + "Restaurants.json",Restaurant,httpOptions)
    .pipe(catchError(this.errorService.handleError));
  }

  deleteRestaurant(ID: string): Observable<Restaurants> {
    return this.http.delete<Restaurants>(FireBaseURL + "Restaurants/" + ID + ".json")
    .pipe(catchError(this.errorService.handleError));

  }
}
