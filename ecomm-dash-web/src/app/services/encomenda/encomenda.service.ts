import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Encomenda } from './encomenda.model';

@Injectable({
  providedIn: 'root'
})
export class EncomendaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getPaginated(page : number): Observable<Encomenda[]> {
    return this.httpClient.get<Encomenda[]>(`${environment.apiUrl}/api/Encomendas?pageSize=20&pageIndex=`+page)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  count() {
    return this.httpClient.get<number>(`${environment.apiUrl}/Encomenda/count`, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
