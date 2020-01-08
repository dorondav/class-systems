import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.modoe';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';



const BACKEND_URL = environment.apiUrl + '/user/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: AuthData[] = [];
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private username: string;
  private userEmail: string;
  private userPhone: string;

  private userRole: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }


  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getUsername() {
    return this.username;
  }
  getUserPhone() {
    return this.userPhone;
  }
  getUserEmail() {
    return this.userEmail;
  }
  getUserId() {
    return this.userId;
  }
  getUserRole() {
    return this.userRole;
  }

  createUser(user: AuthData) {
    this.http.post(BACKEND_URL + 'register', user)
      .subscribe((result: any) => {
        const role = result.user.permission;
        if (role === 'Guest') {
          this.router.navigate(['/']);
        } else {
          console.table(result);
          this.router.navigate(['/management']);
        }

      }, error => console.log('There was an error: '));
  }

  userLogin(user) {
    this.http.post(BACKEND_URL + 'login', user).subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.isAuthenticated = true;
        this.userId = response.fetchedUser._id;
        this.userRole = response.fetchedUser.permission;
        this.username = response.fetchedUser.name;
        this.userEmail = response.fetchedUser.email;
        this.userPhone = response.fetchedUser.phone;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + expiresInDuration * 1000
        );
        this.saveAuthData(token, expirationDate, this.userId, this.userRole, this.username, this.userEmail, this.userPhone);

        this.router.navigate(['/']);
      }
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }


  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.userRole = authInformation.userRole;
      this.username = authInformation.username;
      this.userEmail = authInformation.userEmail;
      this.userPhone = authInformation.userPhone;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
  private saveAuthData(
    token: string, expirationDate: Date,
    userId: string, userRole: string,
    username: string, userEmail: string, userPhone: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('username', username);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userPhone', userPhone);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.username = null;
    this.userPhone = null;
    this.userEmail = null;
    this.userRole = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  // Set session timer
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  //  Geting data from Localstorage
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');
    const userPhone = localStorage.getItem('userPhone');
    const userEmail = localStorage.getItem('userEmail');


    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      userRole,
      userId,
      username,
      userPhone,
      userEmail,
      expirationDate: new Date(expirationDate)
    };
  }

  // Clear LocalStorage
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('name');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
  }
}
