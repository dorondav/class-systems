import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.modoe';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



const BACKEND_URL = environment.apiUrl + '/user/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: AuthData[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  createUser(user: object) {
    this.http.post(BACKEND_URL + 'register', user)
      .subscribe(result => {
        const role = result.user.permission;
        if (role === 'Guest') {
          this.router.navigate(['/']);
        } else {
          console.table(result);
          this.router.navigate(['/management']);
        }

      }, error => console.log('There was an error: '));
  }

}
