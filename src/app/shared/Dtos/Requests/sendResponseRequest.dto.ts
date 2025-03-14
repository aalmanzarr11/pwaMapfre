export class TechnicalControlRequest {
  control: string;

  constructor(control?: string) {
    this.control = control;
  }
}

export class sendResponseRequest {
  usuario: string;
  numeroCotizacion: string;
  resultado: string;
  comentarios: string;
  controlesTecnicos: TechnicalControlRequest[];

  constructor(
    usuario?: string,
    numeroCotizacion?: string,
    resultado?: string,
    comentarios?: string,
    controlesTecnicos?: TechnicalControlRequest[]
  ) {
    this.usuario = usuario;
    this.numeroCotizacion = numeroCotizacion;
    this.resultado = resultado;
    this.comentarios = comentarios;
    this.controlesTecnicos = controlesTecnicos || [];
  }
}
