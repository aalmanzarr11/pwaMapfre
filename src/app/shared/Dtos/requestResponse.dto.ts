export class RequestResponse{
  status: boolean;
  data: any; 
  responseData:any;
  error: string;
  constructor(status?: boolean, data?: string, responseData?: string,error?:string) {
      this.status = status;
      this.data = data; 
      this.responseData = responseData; 
      this.error=error;
  }
}
