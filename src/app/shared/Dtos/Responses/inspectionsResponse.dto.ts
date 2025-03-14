export class InspectionsResponse{
  status: boolean;
  data: Inspection[]; 
  responseData:Inspection[];
  error: string;
  constructor(status?: boolean, data?: Inspection[], responseData?: Inspection[],error?:string) {
      this.status = status;
      this.data = data; 
      this.responseData = responseData; 
      this.error=error;
  }
}
class Inspection{
  numeroCotizacion: string;
  placa: string;
  poliza:string; 

  constructor(numeroCotizacion?: string,placa?:string,poliza?:string) {
      this.numeroCotizacion = numeroCotizacion;
      this.placa = placa;
      this.poliza = poliza; 
  }
}
