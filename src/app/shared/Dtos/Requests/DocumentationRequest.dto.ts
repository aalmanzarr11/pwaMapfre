export class DocumentationRequest {
  usuario: string;
  numeroCotizacion: string;
  tipoDocumento: string; 
  byteFoto: string;

  constructor(
    usuario?: string,
    numeroCotizacion?: string,
    tipoDocumento?: string, 
    byteFoto?: string
  ) {
    this.usuario = usuario;
    this.numeroCotizacion = numeroCotizacion;
    this.tipoDocumento = tipoDocumento; 
    this.byteFoto = byteFoto;
  }
}
