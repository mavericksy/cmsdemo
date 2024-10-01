//
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface IUser {
  userid: number;
  username: string;
  passhash: string;
}

interface IAuthInfo {
  payload?: IUser;
  expiresAt?: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //
  private _loginUrl = '/api/login';
  private isAuthenticated = false;
  private authSecretKey = 'Bearer Token';

  constructor(
    private _http: HttpClient,
  ) {
    let br = localStorage.getItem(this.authSecretKey);
    this.isAuthenticated = !!br && br !== 'undefined';
  }

  login(username: string, password: string): Observable<any> {
    return this._http.post<IAuthInfo>(this._loginUrl, { username, password }).pipe(
      map((response: IAuthInfo) => {
        console.log(response);
        const retUser: IAuthInfo = <IAuthInfo>(<any>response);
        localStorage.setItem(this.authSecretKey, JSON.stringify(retUser));
        return retUser;
      })
    );
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
  }
}
