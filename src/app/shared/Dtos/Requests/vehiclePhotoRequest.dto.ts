export class VehiclePhotoRequest {
  numeroCotizacion: string;
  tipoFoto: string;
  byteFoto: string;

  constructor(
    numeroCotizacion?: string,
    tipoFoto?: string,
    byteFoto?: string
  ) {
    this.numeroCotizacion = numeroCotizacion;
    this.tipoFoto = tipoFoto;
    this.byteFoto = byteFoto;
  }
}
