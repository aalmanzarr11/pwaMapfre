export class TecnicalControlResponse{
  status: boolean;
  data: TecnicalControl; 
  responseData:TecnicalControl;
  error: string;
  constructor(status?: boolean, data?: TecnicalControl, responseData?: TecnicalControl,error?:string) {
      this.status = status;
      this.data = data; 
      this.responseData = responseData; 
      this.error=error;
  }
}
export class TecnicalControl {
  Num_Poliza: string;
  Num_Spto: string;
  Nom_Error: string;
  Cod_Ramo: number;
  Cod_Docum: string;
  Cod_Error: number;

  constructor(
    Num_Poliza?: string,
    Num_Spto?: string,
    Nom_Error?: string,
    Cod_Ramo?: number,
    Cod_Docum?: string,
    Cod_Error?: number
  ) {
    this.Num_Poliza = Num_Poliza;
    this.Num_Spto = Num_Spto;
    this.Nom_Error = Nom_Error;
    this.Cod_Ramo = Cod_Ramo;
    this.Cod_Docum = Cod_Docum;
    this.Cod_Error = Cod_Error;
  }
}
