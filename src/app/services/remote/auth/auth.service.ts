import { Injectable } from '@angular/core';
import { ContextService } from '../../infrastructure/context/context.service';
import { ConstantsService } from '../../infrastructure/constants/constants.service';
import { AuthService as AuthServiceCa } from 'src/app/services/remote_ca/auth/auth.service';
import { AuthService as AuthServiceHn } from 'src/app/services/remote_hn/auth/auth.service';
import { Observable } from 'rxjs';

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
    private authServiceCa: AuthServiceCa,
    private authServiceHn: AuthServiceHn
  ) {}

  private getServiceByCountry() {
    const countryCode = ContextService.location.country;
    return countryCode === ConstantsService.HONDURAS_CODE ? this.authServiceHn : this.authServiceCa;
  }

  public token(credentials): Observable<any> {
    return this.getServiceByCountry().token(credentials);
  }

  public tokenCliente(): Observable<any> {
    return this.getServiceByCountry().tokenCliente();
  }

  public tokenForm(credentials): Observable<any> {
    return this.getServiceByCountry().tokenForm(credentials);
  }

  public login(credentials): Observable<any> {
    return this.getServiceByCountry().login(credentials);
  }

  public register(credentials): Observable<any> {
    return this.getServiceByCountry().register(credentials);
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout(): Observable<any> {
    return this.getServiceByCountry().logout();
  }
}