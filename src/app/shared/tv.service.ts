import { Injectable } from '@angular/core';
import { TvElement } from '../_interface/tv-element.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { environment } from './../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class TvService {
  //properties needed
  private baseUrlLogin = 'https://localhost:5001/tv';
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

  public get = (tvType:string) => {
    const tvElements = this.http.get<TvElement[]>(`${this.baseUrlLogin}/`+tvType, { headers: this.defaultHeaders });
    return tvElements;
  }
}
