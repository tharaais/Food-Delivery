import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHttpErrorMsgService } from './process-http-error-msg.service';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { FireBaseURL } from '../shared/FirebaseURL';
import { Invitations } from '../shared/NewClasses';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService {

  constructor(private http: HttpClient,
              private errorService: ProcessHttpErrorMsgService,
              private db: AngularFireDatabase) { }


  getInvitations(): Observable<any> {
    const InvitationsRef = this.db.list("Invitations");

    return InvitationsRef.valueChanges();
  }

  getInvitationByID(ID: string): Observable<Invitations> {
    return this.http.get<Invitations>(FireBaseURL + "Invitations/" + ID + ".json")
    .pipe(catchError(this.errorService.handleError));
  }

  updateInvitation(Invitation: Invitations): void {
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
    this.http.put<void>(FireBaseURL + "Invitations/" + Invitation.ID + ".json",Invitation,httpOptions)
    .pipe(catchError(this.errorService.handleError));
  }

  saveInvitation(Invitation: Invitations): Observable<any> {
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
    return this.http.post<any>(FireBaseURL + "Invitations.json",Invitation,httpOptions)
    .pipe(catchError(this.errorService.handleError));
  }

  deleteInvitation(ID: string): Observable<Invitations> {
    return this.http.delete<Invitations>(FireBaseURL + "Invitations/" + ID + ".json")
    .pipe(catchError(this.errorService.handleError));

  }

  savePeopleGroup(ID: string, data: any): Observable<any> {
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
    return this.http.post<any>(FireBaseURL + "Invitations/" + ID + "/PeopleGroup.json",data,httpOptions)
      .pipe(catchError((this.errorService.handleError)));
  }

}
