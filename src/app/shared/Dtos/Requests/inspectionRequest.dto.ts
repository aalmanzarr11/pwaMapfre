export class InspectionRequest {
  usuario: string;
  tipUsuario: string;
  identificacion: string;
  placa: string;
  numeroCotizacion: string;
  constructor(identificacion?: string, placa?: string, numeroCotizacion?: string, usuario?: string, tipUsuario?: string) {
    this.usuario = usuario;
    this.tipUsuario = tipUsuario;
    this.identificacion = identificacion;
    this.placa = placa;
    this.numeroCotizacion = numeroCotizacion;
  }

}
