import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, of, map, catchError } from 'rxjs';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:8000/api/auth';
  private profileUrl: string = 'http://localhost:8000/api';
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient, private route: Router) {}

  private user?: User;
  private csrfToken: string = '';

  // Get user
  getUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    const credentials = {
      email: email,
      password: password,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Cookie': `sessionid=${this.getCookie('sessionid')}; csrftoken=${this.getCookie('csrftoken')}`,
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': this.getCookie('csrftoken'),
      }),
      withCredentials: true,
    };
    const csrfToken = this.getCookie('csrftoken');
    console.log(csrfToken, 'token');
    localStorage.setItem('csrftoken', csrfToken);

    return this.http
      .post<User>(`${this.url}/login/`, credentials, httpOptions)
      .pipe(
        tap((s) => console.log(s)),
        tap((user) => (this.user = user as User))
      );
  }

  checkAuth(): Observable<boolean> {
    if (!localStorage.getItem('csrftoken')) return of(false);

    const token = localStorage.getItem('csrftoken');

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest');

    if (token) {
      headers = headers.set('X-CSRFToken', token);
    }

    const httpOptions = {
      headers: headers,
      withCredentials: true,
    };

    const user = this.http
      .get<User>(`${this.profileUrl}/profile/`, httpOptions)
      .pipe(
        tap((user) => (this.user = user)),
        map((user) => !!user),
        catchError((err) => of(false))
      );

    console.log(user);
    return user;
  }

  // Logout user

  logout() {
    this.user = undefined;
    localStorage.clear();
    this.route.navigate(['login']);
  }

  getCookie(name: string): string {
    let cookieValue = '';
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }

    return cookieValue;
  }
}
