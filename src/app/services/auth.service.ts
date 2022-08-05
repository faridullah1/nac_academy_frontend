import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { GenericApiResponse } from '../common/models';
import { AlertDialogService } from '../shared/alert-dialog/alert.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private baseUrl: string = '/api/v1/';

  	constructor(private http: HttpClient, 
				private alertService: AlertDialogService,
				private router: Router) { }

	post(slug: string, payload: any): Observable<GenericApiResponse> {
		return this.http.post<GenericApiResponse>(this.baseUrl + slug, payload).pipe(catchError((error) => this.handleError(error)));
	}

	private handleError(err: HttpErrorResponse) {
		if (err.status === 401) {
			this.router.navigateByUrl('login');
		}

		if (err.status === 504) {
			this.alertService.error('Error', err.statusText);
		}
		else {
			this.alertService.error('Error', err.error.message);
		}

		return throwError(() => new Error(err.error.message));
	}
}
