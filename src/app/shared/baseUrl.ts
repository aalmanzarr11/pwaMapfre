import { environment } from "src/environments/environment";
export class BaseUrl {
    //Token 
    static token =   environment.urlBase + '/api/token'; 
    
    //logs
    static grabaLog =   environment.urlBase + '/api/grabaLog';



    //Car
    static getAccessoryCodes =   environment.urlBase + '/api/listaCodigosAccesorios'; //N
    static uploadAccessory =   environment.urlBase + '/api/autoins/accesoriosVehiculo'; //SS
    static getAccessories =   environment.urlBase + '/api/consultarAccesorios'; //N 
    static getDamageLevels =   environment.urlBase + '/api/listaCodigoDanos'; //N
    static uploadDamage =   environment.urlBase + '/api/creaModificaDano'; //N
    static getDamages =   environment.urlBase + '/api/consultarDanos';  //N
    static getParts =   environment.urlBase + '/api/listaCodigoPartes';//N
    static getSubparts =   environment.urlBase + '/api/autoins/listaPiezas';//SS
    static getCarUses =   environment.urlBase + '/api/Info/UsoVehiculo';//N


    static getCities =   environment.urlBase + '/api/Info/Municipios';
    static getCustomer =   environment.urlBase + '/api/consultarCliente';

    //Inspeccion
    static sendCarImages =   environment.urlBase + '/api/autoins/fotosVehiculo'; //SS
    static sendCarDamages =   environment.urlBase + '/api/autoins/danosVehiculo'; //SS
    static sendCarDocuments =   environment.urlBase + '/api/autoins/documentacion'; //SS 
    static sendCarAccessories =   environment.urlBase + '/api/autoins/accesoriosVehiculo'; //SS
    static uploadImage =   environment.urlBase + '/api/autoins/fotosVehiculo';  //SS 
    //static getImages =   environment.urlBase + '/api/{0}/consultarSetFoto' 

    static getInspectionNumber =   environment.urlBase + '/api/{0}/numeroInspeccion';
    static loadInspectionsV1 =   environment.urlBase + '/api/autoins/buscarCotizacionesCliente';
    static loadInspections =   environment.urlBase + '/api/autoins/buscarCotizacionesCliente';
    static loadInspectionDetails =   environment.urlBase + '/api/autoins/informacionCotizacion';
    static uploadInspection =   environment.urlBase + '/api/autoins/envioRespuesta'; //SS
    static updateInspection =   environment.urlBase + '/api/Inspeccion/ActualizacionDatosVehiculo';
    static getCexper =   environment.urlBase + '/api/leeCexperV3';

    static getStates =   environment.urlBase + '/api/Info/listaDepartamentos';
    static getStrings =   environment.urlBase + '/api/leeParametrosAPPV2';

 
}
