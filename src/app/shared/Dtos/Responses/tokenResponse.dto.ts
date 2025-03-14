export class TokenResponse{
  status: boolean;
  data: Token; 
  responseData:Token;
  error: string;
  constructor(status?: boolean, data?: Token, responseData?: Token,error?:string) {
      this.status = status;
      this.data = data; 
      this.responseData = responseData; 
      this.error=error;
  }
}
class Token{
  access_token: string;
  token_type: string;
  expires_in:string; 

  constructor(access_token?: string, token_type?: string,userType?:string,expires_in?:string) {
      this.access_token = access_token;
      this.token_type = token_type;
      this.expires_in = expires_in; 
  }
}
