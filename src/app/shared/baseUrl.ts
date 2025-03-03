import { environment } from "src/environments/environment";
export class BaseUrl {
    // masters
    static multipaistoken = environment.urlBase + '/api//multipais/token';
    static token = environment.urlBase + '/api/token';
    static login = environment.urlBase + '/api/apiexterno/autoinsp/login';
    
    static grabaLog = environment.urlBase + '/api/grabaLog';



    //Car
    static getAccessoryCodes = environment.urlBase + '/api/listaCodigosAccesorios';
    static uploadAccessory = environment.urlBase + '/api/creaModificaAccesorio';
    static getAccessories = environment.urlBase + '/api/consultarAccesorios'; 
    static getCarBrands = environment.urlBase + '/api/Info/Marcas'; 
    static getCarBrandLines = environment.urlBase + '/api/Info/Modelos'; 
    static getCarColors = environment.urlBase + '/api/Info/Color'; 
    static getDamageLevels = environment.urlBase + '/api/listaCodigoDanos'; 
    static uploadDamage = environment.urlBase + '/api/creaModificaDano'; 
    static getDamages = environment.urlBase + '/api/consultarDanos';  
    static getParts = environment.urlBase + '/api/listaCodigoPartes';
    static getSubparts = environment.urlBase + '/api/Info/Piezas';
    static getCarUses = environment.urlBase + '/api/Info/UsoVehiculo';


    static getCities = environment.urlBase + '/api/Info/Municipios';
    static getCustomer = environment.urlBase + '/api/consultarCliente';

    //Inspeccion
    static sendCarImages = environment.urlBase + '/api/{0}/Inspeccion/EnvioFotoVehiculo'; 
    static sendCarDamages = environment.urlBase + '/api/Inspeccion/DanosVehiculo'; 
    static sendCarDocuments = environment.urlBase + '/api/Inspeccion/DocumentacionSolicitada'; 
    static sendCarAccessories = environment.urlBase + '/api/Inspeccion/AccesoriosVehiculo'; 
    static uploadImage = environment.urlBase + '/api/Inspeccion/EnvioFotoVehiculo'; 
    static uploadImages = environment.urlBase + '/api/{0}/creaFoto';
    static getImages = environment.urlBase + '/api/{0}/consultarSetFoto' 

    static getInspectionNumber = environment.urlBase + '/api/{0}/numeroInspeccion';
    static loadInspectionsV1 = environment.urlBase + '/api/Info/DatosCliente';
    static loadInspections = environment.urlBase + '/api/Info/DatosClienteV2';
    static loadInspectionDetails = environment.urlBase + '/api/Info/Cotizacion';
    static uploadInspection = environment.urlBase + '/api/Inspeccion/EnvioRespuesta';
    static updateInspection = environment.urlBase + '/api/Inspeccion/ActualizacionDatosVehiculo';
    static getCexper = environment.urlBase + '/api/leeCexperV3';

    static getStates = environment.urlBase + '/api/Info/listaDepartamentos';
    static getStrings = environment.urlBase + '/api/leeParametrosAPPV2';

 
}
