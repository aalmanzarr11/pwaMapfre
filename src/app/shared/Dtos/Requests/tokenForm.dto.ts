export class TokenForm {
  Username: string;
  Password: string;
  userType:string;
  grantType:string;

  constructor(Username?: string, Password?: string,userType?:string,grantType?:string) {
      this.Username = Username;
      this.Password = Password;
      this.userType = userType;
      this.grantType = grantType;
  }
  
}
