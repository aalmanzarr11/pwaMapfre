import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';

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

  public token(credentials) {

    console.log('credentials', credentials);

    if (credentials.email === null || credentials.password === null) {
      return Observable.throw('Please insert credentials');
    } else {
      return Observable.create(observer => {
        let userType = 'Cliente';
        switch(credentials.userType) { 
          case 'P': { 
            userType = 'Perito';
             break; 
          } 
          case 'I': { 
            userType = 'Intermediario';
             break; 
          }
        } 

        const body = {
          "user": btoa(credentials.email),
          "pass": btoa(credentials.password),
          "tipo": userType,
          "grant_type": credentials.grantType 
        };

        this.httpClient.post('/multipais/token', body, false).subscribe(
          data => {
            observer.next({status: true, data: data.data});
            observer.complete();
          }
        );
      });
    }
  }

  public tokenCliente() {
    
  }

  public tokenForm(credentials) {

    return Observable.create(observer => {

      const payload = new HttpParams()
        .set('Username', btoa(credentials.email))
        .set('Password', btoa(credentials.password))
        .set('grant_type', 'password');

      console.log('formData', payload);

      // this.http.post(url, payload);


      this.httpClient.postForm('/token', payload).subscribe(
        data => {
          observer.next({status: true, data: data.data});
          observer.complete();
        }
      );
    });

  }

  public login(credentials) {

    if (credentials.email === null || credentials.password === null) {
      return Observable.throw('Please insert credentials');
    } else {
      return Observable.create(observer => {

        // var body = {
        //   "login" : {
        //     "nomUsuario" : credentials.email, //"JPEREZ",
        //     "txtClaveMd5": CryptoJS.MD5(credentials.password).toString(CryptoJS.enc.Hex), //"7e577f4f49b24ea60483424cd0915474",
        //     "txtClave": credentials.password,
        //     "tipUsuario" : credentials.userType
        //   },
        //   "token" : this.tokenService.getAuthentication()
        // };

        const body = {
          'usuario': credentials.email, // 'JPEREZ',
          'txtClaveMd5': credentials.password,
          // 'txtClaveMd5': CryptoJS.MD5(credentials.password).toString(CryptoJS.enc.Hex), //  '7e577f4f49b24ea60483424cd0915474',
          'tipUsuario': credentials.userType, //  'I',
          'pais': ContextService.location.country
        };

        console.log('login body', body);

        this.httpClient.post('/api/apiexterno/autoinsp/login', body, false).subscribe(
          data => {
            observer.next({status: true, data: data.data});
            observer.complete();
          }
        );
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw('Please insert credentials');
    } else {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
