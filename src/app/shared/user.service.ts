import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { environment } from './../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { SocialUser } from 'angularx-social-login';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //properties needed
  private baseUrlLogin = environment.urlAddress+'/users';
  user: SocialUser;
  defaultHeaders: HttpHeaders;

  constructor(private http: HttpClient) 
  {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.defaultHeaders = new HttpHeaders();
    this.defaultHeaders = this.defaultHeaders.append('Content-Type', 'application/json');
    if (this.user != null) {
      this.defaultHeaders = this.defaultHeaders.append('Authorization', 'Bearer ' + this.user.idToken);
    }
  }

  //communicate with web api
  public login = (route: string, userData) => {
    if (userData != null && userData.provider == 'GOOGLE') {
      this.defaultHeaders.delete('Authorization');
      this.defaultHeaders = this.defaultHeaders.set('Authorization', 'Bearer ' + userData.idToken);
    }
    else if (userData != null && userData.provider == 'FACEBOOK') {
      this.defaultHeaders.delete('Authorization');
      this.defaultHeaders = this.defaultHeaders.set('Authorization', 'Bearer ' + userData.idToken);
    }

    return this.http.post<any>(this.baseUrlLogin, userData, {'headers':this.defaultHeaders}).pipe(
      map(result => {
        if (result.message != null) {
          console.log('We sent a message to our Controller API. It works');
        }
        return result;
      }
    ));
  }

  public getAccounts = () => {
    const accounts = this.http.get<Account[]>(`${this.baseUrlLogin}`, { headers: this.defaultHeaders });
    return accounts;
  }
}
