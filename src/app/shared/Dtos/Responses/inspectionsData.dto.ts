export  class InspectionData{
  tipoDocumento: string;
  numDocumento: string;
  nombres:string; 
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  email: string;
  ciudad: string;
  direccion:string;
  placa: string;
  marca: string;
  linea: string;
  version: string;
  modelo:  string;
  codFase: string;
  motor: string;
  chasis: string;
  serie: string;
  uso: string;
  color: string;
  numeroCotizacion:string

  constructor(
    tipoDocumento?: string,
    numDocumento?: string,
    nombres?:string,
    apellidoPaterno?: string,
    apellidoMaterno?: string,
    telefono?: string,
    email?: string,
    ciudad?: string,
    direccion?:string,
    placa?: string,
    marca?: string,
    linea?: string,
    version?: string,
    modelo?:  string,
    codFase?: string,
    motor?: string,
    chasis?: string,
    serie?: string,
    uso?: string,
    color?: string,
    numeroCotizacion?:string

  ) {
     this.tipoDocumento =tipoDocumento;
     this.numDocumento  =numDocumento;
     this.nombres  =nombres;
     this.apellidoPaterno  =apellidoPaterno;
     this.apellidoMaterno =apellidoMaterno;
     this.telefono  =telefono;
     this.email  =email;
     this.ciudad  =ciudad;
     this.direccion  =direccion;
     this.placa =placa;
     this.marca =marca;
     this.linea =linea;
     this.version  =version;
     this.modelo =modelo;
     this.codFase  =codFase;
     this.motor  =motor;
     this.chasis  =chasis;
     this.serie =serie;
     this.uso  =uso;
     this.color  =color;
     this.numeroCotizacion  =numeroCotizacion;
  }
}
