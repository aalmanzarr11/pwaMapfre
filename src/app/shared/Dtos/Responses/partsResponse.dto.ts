export class PartsResponse{
  status: boolean;
  data: Part[]; 
  responseData:Part[];
  error: string;
  constructor(status?: boolean, data?: Part[], responseData?: Part[],error?:string) {
      this.status = status;
      this.data = data; 
      this.responseData = responseData; 
      this.error=error;
  }
}
export class Part {
  nombrePieza: string;

  constructor(nombrePieza?: string) {
    this.nombrePieza = nombrePieza;
  }
}
