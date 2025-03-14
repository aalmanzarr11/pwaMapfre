export class DamageRequest {
  numeroCotizacion: string;
  pieza: string;
  nivelDano: number;
  valor: number;
  byteFoto: string;

  constructor(
    numeroCotizacion?: string,
    pieza?: string,
    nivelDano?: number,
    valor?: number,
    byteFoto?: string
  ) {
    this.numeroCotizacion = numeroCotizacion;
    this.pieza = pieza;
    this.nivelDano = nivelDano;
    this.valor = valor;
    this.byteFoto = byteFoto;
  }
}
