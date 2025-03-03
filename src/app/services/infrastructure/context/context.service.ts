import { Injectable } from '@angular/core';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  public static apiToken: any;
  public static userSession : any = {};
  public NombreCliente: string = null;
  public NombreUsuario: string = null;

  public static location : any = {
    'country' : '',
    'lat' : 0,
    'long' : 0
  };
  public static hasInternet: boolean = false;
  public static isMenuVisible: boolean = false;

  public static currentInspection_PRO: any = {
    "numeroCotizacion": "",
    "tipoDocumento": "",
    "numDocumento": "",
    "nombres": " ",
    "apellidoPaterno": "",
    "apellidoMaterno": "",
    "telefono": "",
    "email": "",
    "ciudad": "",
    "direccion": "",
    "placa": "",
    "marca": "",
    "linea": "",
    "version": "",
    "modelo": "",
    "codFase": "",
    "motor": "",
    "chasis": "",
    "serie": "",
    "uso": "",
    "color": "",
    "origen" : ""
  };

  public static currentInspection_DEV_DEBUG: any = {
    "numeroCotizacion": "",
    "tipoDocumento": "IDENTIFICACION",
    "numDocumento": "1234567",
    "nombres": "ALFONSO ",
    "apellidoPaterno": "RODRIGUEZ VALDES", 
    "apellidoMaterno": "",
    "telefono": "00507-6780-9749",
    "email": "arodriguez.nor@gmail.com",
    "ciudad": "Panamá",
    "direccion": "7ma",
    "placa": "ABC123",
    "marca": "KIA",
    "linea": "",
    "version": "2011",
    "modelo": "CERATO",
    "codFase": "",
    "motor": "KNAFU411AB5380466",
    "chasis": "KNAFU411AB5380466",
    "serie": "",
    "uso": "USADO",
    "color": "OTRO"
  };

  // EL_SALVADOR
  public static currentInspection_DEV_EL_SALVADOR: any = {
    "numeroCotizacion": "", // 3011800127205, 
    "tipoDocumento": "",
    "numDocumento": "",
    "nombres": " ",
    "apellidoPaterno": "",
    "apellidoMaterno": "",
    "telefono": "",
    "email": "",
    "ciudad": "",
    "direccion": "",
    "placa": "P898456", // P909911
    "marca": "",
    "linea": "",
    "version": "",
    "modelo": "",
    "codFase": "",
    "motor": "",
    "chasis": "",
    "serie": "",
    "uso": "",
    "color": ""
  };

  // HONDURAS
  public static currentInspection_DEV_HONDURAS: any = {
    "numeroCotizacion": "", // E1-TG-20-4110
    "tipoDocumento": "",
    "numDocumento": "0801-1975-02848",
    "nombres": " ",
    "apellidoPaterno": "",
    "apellidoMaterno": "",
    "telefono": "",
    "email": "",
    "ciudad": "",
    "direccion": "",
    "placa": "",
    "marca": "",
    "linea": "",
    "version": "",
    "modelo": "",
    "codFase": "",
    "motor": "",
    "chasis": "",
    "serie": "",
    "uso": "",
    "color": ""
  };

  // NICARAGUA
  public static currentInspection_DEV_NICARAGUA: any = {
    "numeroCotizacion": "", //2130100000028 "2130100000490", "2130100134623"
    "tipoDocumento": "",
    "numDocumento": "",
    "nombres": " ",
    "apellidoPaterno": "",
    "apellidoMaterno": "",
    "telefono": "",
    "email": "",
    "ciudad": "",
    "direccion": "",
    "placa": "CH 24791",
    "marca": "",
    "linea": "",
    "version": "",
    "modelo": "",
    "codFase": "",
    "motor": "",
    "chasis": "",
    "serie": "",
    "uso": "",
    "color": ""
  };

  // COSTA_RICA
  public static currentInspection_DEV_COSTA_RICA: any = {
    "numeroCotizacion": "", // 3022100084916
    "tipoDocumento": "",
    "numDocumento": "999999999",
    "nombres": " ",
    "apellidoPaterno": "",
    "apellidoMaterno": "",
    "telefono": "",
    "email": "",
    "ciudad": "",
    "direccion": "",
    "placa": "",
    "marca": "",
    "linea": "",
    "version": "",
    "modelo": "",
    "codFase": "",
    "motor": "",
    "chasis": "",
    "serie": "",
    "uso": "",
    "color": ""
  };

  public static currentInspection_DEV_GUATEMALA: any = {
    "numeroCotizacion": "",// 4281
    "tipoDocumento": "",
    "numDocumento": "",
    "nombres": " ",
    "apellidoPaterno": "",
    "apellidoMaterno": "",
    "telefono": "",
    "email": "",
    "ciudad": "",
    "direccion": "",
    "placa": "555FFF",
    "marca": "",
    "linea": "",
    "version": "",
    "modelo": "",
    "codFase": "",
    "motor": "",
    "chasis": "",
    "serie": "",
    "uso": "",
    "color": ""
  };

  public static footerMenuOptions : any = [];
  public static carParts : any = [];
  public static carDocuments : any = [];
  public static carDamages : any = [];
  public static accessories : any = []; 
  public static currentInspection :any = null;
  public static currentPage :any = null;
  public static inspectionList: any;
  public static ModalSelectParametes: any;
  public static SelectedCarPicture: any;
  public static SelectedCarDamage: any;
  public static SelectedAccesory: any;
  public static hasSeenIntro: boolean = false;
  public static numeroCotizacionFromURL: string;
  
  public static init(){

    console.log("ContextService init");

    // ContextService.currentInspection = JSON.parse(
    //   JSON.stringify(
    //     EnvironmentService.isProduction ? 
    //     ContextService.currentInspection_PRO : 
    //     ContextService.currentInspection_DEV_HONDURAS
    //   )
    // );

    ContextService.currentInspection = JSON.parse(
      JSON.stringify(ContextService.currentInspection_PRO)
    );

    ContextService.footerMenuOptions = [
      {title : 'Ingreso placa vehículo', status : 0},
      {title : 'Datos de cliente y vehículo', status : 0},
      {title : 'Inspección matrícula', status : 0},
      {title : 'Fotografías vehículo', status : 0},
      {title : 'Accesorios vehículo', status : 0},
    ];

    ContextService.carParts = [];
    ContextService.accessories = []; 
    ContextService.carDocuments = []; 
    ContextService.carDamages = []; 
    ContextService.inspectionList = []
  }

  public static getPrefixAPI() {
    let prefix = ContextService.userSession.userType !== 'C' ? '/autoinsp' : '/autoinspcliente';
    return prefix;
  }

  public static getBodyAPI(body: any) {

    console.log('getBodyAPI', ContextService.userSession.userType);

    let data  = body;

    if(ContextService.userSession.userType === 'C') {

      const month = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO",
        "AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];

      const currentDate = new Date();
      // let name = month[d.getMonth()];

      var random = Math.floor((Math.random() * 100000000) + 1);
      var monthName = month[currentDate.getMonth()]; // 'ENERO';
      var dayMonth =  currentDate.getDate();

      if (!EnvironmentService.isProduction) {
        // dayMonth -= 1;
      }

      var monthDay = monthName + dayMonth + random;

      console.log('random', random);
      console.log('monthDay', monthDay);

      data['tok'] = btoa(monthDay);
      data['tik'] = btoa(random + ''); 
    }

    return data;
  }

}
