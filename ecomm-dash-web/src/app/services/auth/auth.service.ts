import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Auth } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private currentViewerSubject: BehaviorSubject<Auth>;

    public currentViwer: Observable<Auth>;

    constructor(private http: HttpClient) {
        this.currentViewerSubject = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('currentViewer')));
        this.currentViwer = this.currentViewerSubject.asObservable();
    }

    public get currentViewerValue(): Auth {
        return this.currentViewerSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/Authentication`, { username, password })
            .pipe(map(viewer => {
                localStorage.setItem('currentViewer', JSON.stringify(viewer));
                this.currentViewerSubject.next(viewer);
                return viewer;
            }));
    }

    logout() {
        localStorage.removeItem('currentViewer');
        this.currentViewerSubject.next(null);
    }
}