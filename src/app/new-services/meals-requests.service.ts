import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHttpErrorMsgService } from './process-http-error-msg.service';
import { FireBaseURL } from '../shared/FirebaseURL';
import { MealsRequests } from '../shared/NewClasses';

@Injectable({
  providedIn: 'root'
})
export class MealsRequestsService {

  constructor(private http: HttpClient,
              private errorService: ProcessHttpErrorMsgService,
              private db: AngularFireDatabase) { }

  getMealsRequests(): Observable<any[]> {
    const MealsRequestsRef = this.db.list("MealsRequests");

    return MealsRequestsRef.valueChanges();
  }

  getMealsRequestByID(ID: string): Observable<MealsRequests> {
    return this.http.get<MealsRequests>(FireBaseURL + "MealsRequests/" + ID + ".json")
    .pipe(catchError(this.errorService.handleError));
  }

  updateMealsRequest(MealsRequest: MealsRequests): void {
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
    this.http.put<void>(FireBaseURL + "MealsRequests/" + MealsRequest.ID + ".json",MealsRequest,httpOptions)
    .pipe(catchError(this.errorService.handleError));
  }

  saveMealsRequest(MealsRequest: MealsRequests): Observable<MealsRequests> {
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
    return this.http.post<MealsRequests>(FireBaseURL + "MealsRequests.json",MealsRequest,httpOptions)
    .pipe(catchError(this.errorService.handleError));
  }

  deleteMealsRequest(ID: string): Observable<MealsRequests> {
    return this.http.delete<MealsRequests>(FireBaseURL + "MealsRequests/" + ID + ".json")
    .pipe(catchError(this.errorService.handleError));

  }

}
