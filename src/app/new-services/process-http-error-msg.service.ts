import { Injectable } from '@angular/core';
import { throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpErrorMsgService {

  errMsg: string = "";

  constructor() { }

  public handleError(error: HttpErrorResponse | any) {
    if(error.error instanceof ErrorEvent) {
      this.errMsg = error.error.message;
    } else {
      this.errMsg = `${error.status} - ${error.statusText} : ${error.error}`;
    }

    return throwError(this.errMsg);
  }
}
