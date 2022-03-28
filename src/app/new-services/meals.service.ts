import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHttpErrorMsgService } from './process-http-error-msg.service';
import { FireBaseURL } from '../shared/FirebaseURL';
import { Meals } from '../shared/NewClasses';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(private http: HttpClient,
              private errorService: ProcessHttpErrorMsgService,
              private db: AngularFireDatabase) { }

  getMeals(): Observable<any[]> {
    const MealsRef = this.db.list("Meals");

    return MealsRef.valueChanges();
  }

  getMealByID(ID: string): Observable<Meals> {
    return this.http.get<Meals>(FireBaseURL + "Meals/" + ID + ".json")
    .pipe(catchError(this.errorService.handleError));
  }

  updateMeal(Meal: Meals): void {
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
    this.http.put<void>(FireBaseURL + "Meals/" + Meal.ID + ".json",Meal,httpOptions)
    .pipe(catchError(this.errorService.handleError));
  }

  saveMeal(Meal: Meals): Observable<Meals> {
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
    return this.http.post<Meals>(FireBaseURL + "Meals.json",Meal,httpOptions)
    .pipe(catchError(this.errorService.handleError));
  }

  deleteMeal(ID: string): Observable<Meals> {
    return this.http.delete<Meals>(FireBaseURL + "Meals/" + ID + ".json")
    .pipe(catchError(this.errorService.handleError));

  }

}
