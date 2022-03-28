import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHttpErrorMsgService } from './process-http-error-msg.service';
import { FireBaseURL } from '../shared/FirebaseURL';
import { Profiles } from '../shared/NewClasses';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private http: HttpClient,
              private errorService: ProcessHttpErrorMsgService,
              private db: AngularFireDatabase) { }

  getProfiles(): Observable<any[]> {
    const ProfilesRef = this.db.list("Profiles");

    return ProfilesRef.valueChanges();
  }

  getProfileByID(ID: string): Observable<Profiles> {
    return this.http.get<Profiles>(FireBaseURL + "Profiles/" + ID + ".json")
    .pipe(catchError(this.errorService.handleError));
  }

  updateProfile(profile: Profiles): void {
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
    this.http.put<void>(FireBaseURL + "Profiles/" + profile.ID + ".json",profile,httpOptions)
    .pipe(catchError(this.errorService.handleError));
  }

  saveProfile(profile: Profiles): Observable<Profiles> {
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
    return this.http.post<Profiles>(FireBaseURL + "Profiles.json",profile,httpOptions)
    .pipe(catchError(this.errorService.handleError));
  }

  deleteProfile(ID: string): Observable<Profiles> {
    return this.http.delete<Profiles>(FireBaseURL + "Profiles/" + ID + ".json")
    .pipe(catchError(this.errorService.handleError));

  }

}
