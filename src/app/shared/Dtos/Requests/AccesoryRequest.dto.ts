export class AccesoryRequest {
  numeroCotizacion: string;
  marca: string;
  referencia: string;
  valor: number;
  byteFoto: string;

  constructor(
    numeroCotizacion?: string,
    marca?: string,
    referencia?: string,
    valor?: number,
    byteFoto?: string
  ) {
    this.numeroCotizacion = numeroCotizacion;
    this.marca = marca;
    this.referencia = referencia;
    this.valor = valor;
    this.byteFoto = byteFoto;
  }
}
