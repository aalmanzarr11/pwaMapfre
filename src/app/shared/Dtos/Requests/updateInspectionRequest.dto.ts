export class UpdateInspectionRequest {
  numeroCotizacion: string;
  placa: string;
  marca: string;
  linea: string;
  version: string;
  modelo: string;
  codFase: string;
  motor: string;
  chasis: string;

  constructor(
    numeroCotizacion?: string,
    placa?: string,
    marca?: string,
    linea?: string,
    version?: string,
    modelo?: string,
    codFase?: string,
    motor?: string,
    chasis?: string
  ) {
    this.numeroCotizacion = numeroCotizacion;
    this.placa = placa;
    this.marca = marca;
    this.linea = linea;
    this.version = version;
    this.modelo = modelo;
    this.codFase = codFase;
    this.motor = motor;
    this.chasis = chasis;
  }
}
