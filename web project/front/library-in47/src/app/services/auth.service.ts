import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, of, map, catchError } from 'rxjs';
import { User } from '../models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:8000/api/auth';
  private profileUrl: string = 'http://localhost:8000/api';
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient) {}

  private user?: User;

  // Get user
  getUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user);
  }
  // Login
  login(email: string, password: string): Observable<User> {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post<User>(`${this.url}/login/`, body).pipe(
      tap((user) => (this.user = user as User)),
      tap((user) => localStorage.setItem('token', user.id.toString()))
    );
  }

  // Check user status
  checkAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Cookie': `sessionid=${this.getCookie('sessionid')}; csrftoken=${this.getCookie('csrftoken')}`,
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': this.getCookie('csrftoken'),
      }),
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
    window.location.reload();
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

  set isLoggedIn(value: boolean) {
    this._isLoggedIn.next(value);
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn.getValue();
  }

  getIsLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }
}
