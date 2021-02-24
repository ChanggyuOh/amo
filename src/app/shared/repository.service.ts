import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  user: SocialUser;

  constructor(private http: HttpClient) { }

  public getData = (route: string, user: SocialUser) => {
    return this.http.get(
      this.createCompleteRoute(route, environment.urlAddress),
      this.generateHeaders(user)
    );
  }
 
  public create = (route: string, body, user: SocialUser) => {

    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders(user));
  }
 
  public update = (route: string, body, user: SocialUser) => {
    return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders(user));
  }
 
  public delete = (route: string, user: SocialUser) => {
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress),this.generateHeaders(user));
  }
 
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
 
  private generateHeaders = (user: SocialUser) => {
    var headers: HttpHeaders;

    if (user != null && user.provider == 'GOOGLE') {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.idToken
      });
    }
    else if (user != null && user.provider == 'FACEBOOK') {
      var token = btoa(JSON.stringify(user));
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer fb:' + token
      });
    }
    else{
      headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
  }
    /**
     * returns options: {
      headers?: HttpHeaders|{[header: string]: string | string[]},
      observe?: HttpObserve,
      params?: HttpParams|{[param: string]: string | string[]},
      reportProgress?: boolean,
      responseType?: 'arraybuffer'|'blob'|'json'|'text',
      withCredentials?: boolean,
     */
    return { headers: headers } 
  }
}
