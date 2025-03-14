import { Injectable } from '@angular/core';
import { ContextService } from '../../infrastructure/context/context.service';
import { ConstantsService } from '../../infrastructure/constants/constants.service'; 
import { Observable } from 'rxjs';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { HttpParams } from '@angular/common/http';  
import { BaseUrl } from 'src/app/shared/baseUrl';
import { TokenForm } from 'src/app/shared/Dtos/Requests/tokenForm.dto'; 
import { TokenResponse } from 'src/app/shared/Dtos/Responses/tokenResponse.dto';
export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  constructor(
      private httpClient: HttpClientService,
      private tokenService: TokenService
  ) {}
 

  public token(credentials:TokenForm): Observable<TokenResponse> {
 
    if (credentials.Username === null || credentials.Password === null) {
      return Observable.throw('Please insert credentials');
    } else {
      return Observable.create(observer => {
       
        this.httpClient.post(BaseUrl.token, credentials).subscribe(
          data => {   
            observer.next(data);
            observer.complete();
          }
        );
      });
    }
  }
  
 

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout(): Observable<any> {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}