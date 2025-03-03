import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { IonPullUpFooterState } from 'ionic-pullup';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ConstantsService } from 'src/app/services/infrastructure/constants/constants.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { FormValidatorService } from 'src/app/services/infrastructure/form-validator/form-validator.service';
import { HelperStringsService } from 'src/app/services/infrastructure/helper-strings/helper-strings.service';
import { InspectionService } from 'src/app/services/remote/inspection/inspection.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { LogInfoService } from 'src/app/services/infrastructure/log-info/log-info.service';
// import { StorageService } from 'src/app/services/infrastructure/storage/storage.service';
import { AuthService } from 'src/app/services/remote/auth/auth.service';
import { CarBrandsService } from 'src/app/services/remote/car-brands/car-brands.service';
import { CarColorsService } from 'src/app/services/remote/car-colors/car-colors.service';
import { CarTypesService } from 'src/app/services/remote/car-types/car-types.service';
import { CarUsesService } from 'src/app/services/remote/car-uses/car-uses.service';
import { CitiesService } from 'src/app/services/remote/cities/cities.service';
import { CustomerService } from 'src/app/services/remote/customer/customer.service';
import { StatesService } from 'src/app/services/remote/states/states.service';
import dateFormat from 'dateformat';
import { Router } from '@angular/router';
import { EnvironmentService } from 'src/app/services/infrastructure/environment/environment.service';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.page.html',
  styleUrls: ['./customer-data.page.scss'],
})
export class CustomerDataPage implements OnInit {

  Usuario = '';
  footerState: IonPullUpFooterState;
  formGroup: UntypedFormGroup;
  footerMenuOptions: any = [];
  currentPage: any = 2;
  currentInspection: any = {};
  constantsProvider: any = {};

  states: any = [];
  cities: any = [];

  stateName = '';
  cityName = '';
  stateCode = '';
  cityCode = '';

  strings: any = {};
  documentTypes: any;
  carTypes: any;
  tracks: any;
  sources: any;

  //
  carBrands = [];
  carBrandLines = [];
  carBrandLinesComplete = [];
  carUses = [];
  carColors = [];
  brandName = '';
  brandCode = '';
  colorName = '';
  colorCode = '';
  brandLineName = '';
  districtName = '';
  codLinea = '';
  flag = false;


  constructor(public navController: NavController,
      // public navParams: NavParams,
      // private storageService: StorageService,
      private loadingServiceProvider: LoadingService,
      private citiesServiceProvider: CitiesService,
      private statesServiceProvider: StatesService,
      private alertServiceProvider: AlertService,
      private authService: AuthService,
      public navCtrl: NavController,
      //
      private inspectionProvider: InspectionService,
      private carBrandsServiceProvider: CarBrandsService,
      private carColorsServiceProvider: CarColorsService,
      private carUsesServiceProvider: CarUsesService,
      private carTypesServiceProvider: CarTypesService,
      //
      private customerServiceProvider: CustomerService,
      private contextServiceProvider: ContextService,
      private logInfoClient: LogInfoService,
      private alertCtrl: AlertController,
      private helperStrings: HelperStringsService,
      private router: Router
    ) {

    if (ContextService.footerMenuOptions[this.currentPage - 1]) {
      ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 1;
    }

    console.log('ContextService.currentInspection', ContextService.currentInspection);

    this.constantsProvider = ConstantsService;
    this.footerState = IonPullUpFooterState.Collapsed;
    this.footerMenuOptions = ContextService.footerMenuOptions;
    this.currentInspection = ContextService.currentInspection;

    this.brandName = this.currentInspection.marca;
    this.brandLineName = this.currentInspection.linea;
    this.brandCode = this.currentInspection.marca_codigo;
    this.codLinea = this.currentInspection.linea_codigo;

    this.stateName = this.currentInspection.departamento;
    this.cityName = this.currentInspection.ciudad;
    this.cityCode = this.currentInspection.ciudad_codigo;
    this.stateCode = this.currentInspection.departamento_codigo;

    if(this.currentInspection.origen_veh){
      this.currentInspection.origen_veh = this.currentInspection.origen_veh.toUpperCase();
    }
    
    this.currentInspection.origen = this.currentInspection.origen_veh;

    console.log('this.currentInspection', this.currentInspection);

    if(this.stateCode && this.stateCode.length > 0){
      this.getCities();
    }

    console.log('this.brandCode', this.brandCode);
    console.log('this.brandCode.length ', this.brandCode.length );

    if(this.brandCode && this.brandCode.length > 0){
      this.getCarBrandLines();
    }
  }

  ionViewDidLoad() {

  }

  // INICIO DE COMPONENTES
  ngOnInit() {

    this.strings = ConfigService.strings;
    // this.currentInspection.cliente.codPais = ContextService.location.country;

    // if (ContextService.userSession.tipUsuario === ''){
    //   this.Usuario = 'C';
    // }else{
    //   this.Usuario = ContextService.userSession;
    // }
    // console.log(this.Usuario);
    this.setupForm();

    // if (this.currentInspection.cliente.nomCliente === null || this.currentInspection.cliente.nomCliente === ''){
    //   this.get_Customer();
    // }
    // else{

    // console.log("country", ContextService.location.country);
    // console.log("COSTARICA_CODE", ConstantsService.COSTARICA_CODE);

    if (ContextService.location.country !== ConstantsService.COSTARICA_CODE) {
      this.getDocumentTypes();
      this.getSources();
      this.getCarTypes();
      this.getTracks();
      this.getStates();
      this.getCarBrands();
      this.getCarUses();
      this.getCarColors();
    }
  }

  private getDocumentTypes() {

    this.documentTypes = [];

    if (this.strings.customerDocumentType1 != 'null' && this.strings.customerDocumentType1 != null) {
      this.documentTypes.push({
        'id': this.strings.customerDocumentTypeCode1,
        'name': this.strings.customerDocumentType1
      });
    }

    if (this.strings.customerDocumentType2 != 'null' && this.strings.customerDocumentType2 != null) {
      this.documentTypes.push({
        'id': this.strings.customerDocumentTypeCode2,
        'name': this.strings.customerDocumentType2
      });
    }

    if (this.strings.customerDocumentType3 != 'null' && this.strings.customerDocumentType3 != null) {
      this.documentTypes.push({
        'id': this.strings.customerDocumentTypeCode3,
        'name': this.strings.customerDocumentType3
      });
    }

    if (this.strings.customerDocumentType4 != 'null' && this.strings.customerDocumentType4 != null) {
      this.documentTypes.push({
        'id': this.strings.customerDocumentTypeCode4,
        'name': this.strings.customerDocumentType4
      });
    }

    if (this.strings.customerDocumentType5 != 'null' && this.strings.customerDocumentType5 != null) {
      this.documentTypes.push({
        'id': this.strings.customerDocumentTypeCode5,
        'name': this.strings.customerDocumentType5
      });
    }

    if (this.strings.customerDocumentType6 != 'null' && this.strings.customerDocumentType6 != null) {
      this.documentTypes.push({
        'id': this.strings.customerDocumentTypeCode6,
        'name': this.strings.customerDocumentType6
      });
    }

    if (this.strings.customerDocumentType7 != 'null' && this.strings.customerDocumentType7 != null) {
      this.documentTypes.push({
        'id': this.strings.customerDocumentTypeCode7,
        'name': this.strings.customerDocumentType7
      });
    }
  }

  private getCarTypes() {


    if(this.isCountry([ConstantsService.HONDURAS_CODE, ConstantsService.GUATEMALA_CODE])){
      this.loadingServiceProvider.showLoading();

      this.carTypesServiceProvider.getCarTypes(ContextService.location.country).subscribe(result => {
        if (result.status && result.data != null) {
          this.carTypes = result.data;
        } else {
          this.alertServiceProvider.show('Error', result.data);
        }
  
        this.loadingServiceProvider.hideLoading();
      });
    }
    else{
      this.carTypes = [
        {
          'codigo': '1',
          'nombre': 'Automóvil'
        },
        {
          'codigo': '2',
          'nombre': 'Camioneta'
        },
        {
          'codigo': '3',
          'nombre': 'Pick Up'
        },
        {
          'codigo': '4',
          'nombre': 'Pick-Up Doble cabina'
        },
        {
          'codigo': '5',
          'nombre': 'Microbús'
        },
        {
          'codigo': '6',
          'nombre': 'Panel'
        },
        {
          'codigo': '7',
          'nombre': 'Camión'
        },
        {
          'codigo': '8',
          'nombre': 'Motocicleta'
        },
        {
          'codigo': '9',
          'nombre': 'Otro'
        }
      ];
    }
  }

  private getTracks() {

    // Automóvil, Camioneta, Pick Up, Pick-Up Doble cabina, Microbús, Panel, Camión, Motocicleta, Otro.

    this.tracks = [
      {
        'id': 'Sencilla',
        'name': 'Sencilla'
      },
      {
        'id': '4X4',
        'name': '4X4'
      }
    ];
  }

  private getSources() {
    
    this.sources = [
      {
        'id': 'IMPORTADO',
        'name': 'Importado'
      },
      {
        'id': 'AGENCIA',
        'name': 'Agencia'
      }
    ];
  }

  // CONFIGURACION DEL FORMULARIO Y VALIDACIONES
  private setupForm() {
    this.formGroup = new UntypedFormGroup({
      documentType: new UntypedFormControl('', this.strings.customerDocumentType_Mandatory == '1' ? [Validators.required] : []),
      document: new UntypedFormControl('', this.strings.customerDocument_Mandatory == '1' ? [Validators.required] : []),
      firstName: new UntypedFormControl('', this.strings.customerFirstName_Mandatory == '1' ? [Validators.required] : []),
      lastName: new UntypedFormControl('', this.strings.customerLastName_Mandatory == '1' ? [Validators.required] : []),
      secondLastName: new UntypedFormControl('', this.strings.customerSecondLastName_Mandatory == '1' ? [Validators.required] : []),
      phone: new UntypedFormControl('', this.strings.customerPhone_Mandatory == '1' ? Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9]*'), Validators.required]) : []),
      email: new UntypedFormControl('', this.strings.customerEmail_Mandatory == '1' ?
        [Validators.required, FormValidatorService.emailCheck()] :
        [FormValidatorService.emailCheck()]),
      city: new UntypedFormControl('', this.strings.customerCity_Mandatory == '1' ? [Validators.required] : []),
      address: new UntypedFormControl('', this.strings.customerAddress_Mandatory == '1' ? [Validators.required] : []),

      state: new UntypedFormControl('', []),
      cityCode: new UntypedFormControl('', []),
      districtCode: new UntypedFormControl('', []),

      carType: new UntypedFormControl('', []),
      carSource: new UntypedFormControl('', []),
      tracks: new UntypedFormControl('', []),


      plate: new UntypedFormControl('', this.strings.carInfoPlate_Mandatory == '1' ? [Validators.required] : []),

      brand: new UntypedFormControl('', []),
      brandLine: new UntypedFormControl('', []),

      vin: new UntypedFormControl('', this.strings.carInfoVin_Mandatory == '1' ? [Validators.required] : []),
      model: new UntypedFormControl('', this.strings.carInfoModel_Mandatory == '1' ? [Validators.required] : []),
      countryUnionCode: new UntypedFormControl('', this.strings.carInfoCountryUnionCode_Mandatory == '1' ? [Validators.required] : []),
      motor: new UntypedFormControl('', this.strings.carInfoMotor_Mandatory == '1' ? [Validators.required] : []),
      chasis: new UntypedFormControl('', this.strings.carInfoChasis_Mandatory == '1' ? [Validators.required] : []),
      uses: new UntypedFormControl('', this.strings.carInfoUses_Mandatory == '1' ? [Validators.required] : []),

      color: new UntypedFormControl('', this.strings.carInfoColor_Mandatory == '1' ? [Validators.required] : []),
      
      version: new UntypedFormControl('', this.strings.carInfoColor_Mandatory == '1' ? [Validators.required] : []),

      km: new UntypedFormControl('', this.strings.carInfoVin_Mandatory == '1' ? [Validators.required] : []),
      amount: new UntypedFormControl('', this.strings.carInfoVin_Mandatory == '1' ? [Validators.required] : [])
    });
  }
  
  private getCarBrands() {
    this.loadingServiceProvider.showLoading();

    this.carBrandsServiceProvider.getCarBrands(ContextService.location.country).subscribe(result => {

      console.log('getCarBrands result', result);

      if (result.status && result.data != null) {
        this.carBrands = result.data;
      } else {
        this.alertServiceProvider.show('Error', result.data);
      }

      this.loadingServiceProvider.hideLoading();
    });
  }
  //
  private getCarBrandLines() {
    this.loadingServiceProvider.showLoading();

    this.carBrandsServiceProvider.getCarBrandLines(this.brandCode, ContextService.location.country).subscribe(result => {
      if (result.status && result.data != null) {

        this.carBrandLines = result.data;

      } else {
        // this.alertServiceProvider.show('Error', result.data);
      }

      this.loadingServiceProvider.hideLoading();
    });
  }
  //
  private getCarColors() {
    this.loadingServiceProvider.showLoading();

    this.colorName = this.currentInspection.color;

    this.carColorsServiceProvider.getCarColors(ContextService.location.country).subscribe(result => {
      if (result.status && result.data != null) {
        this.carColors = result.data;

      } else {
        this.alertServiceProvider.show('Error', result.data);
      }

      this.loadingServiceProvider.hideLoading();
    });
  }
  //
  private getCarUses() {
    this.loadingServiceProvider.showLoading();

    this.carUsesServiceProvider.getCarUses(ContextService.location.country).subscribe(result => {
      if (result.status && result.data != null) {
        this.carUses = result.data;
      } else {
        this.alertServiceProvider.show('Error', result.data);
      }

      this.loadingServiceProvider.hideLoading();
    });
  }

  // BOTON ATRAS
  public back() {
    this.navController.pop();
  }

  public getUserType(){
    return ContextService.userSession.userType;
  }

  // BOTON CONTINUAR
  public next() {

    if(this.getUserType() !== 'C' || ContextService.location.country === ConstantsService.GUATEMALA_CODE){
      const data = this.formGroup.value;
      //const CarAgeMax = parseInt(ConfigService.strings.carMaxAge);
      //const EnterAgeCar = parseInt(data.model);

      if(this.isDisabled()){
        ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 2;
        // this.navController.push(CarLegalPicturesPage);
        return this.router.navigateByUrl('/car-legal-pictures');
      }
      else{
        this.updateInspection();
      }
    }
    else{
      ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 2;
      // this.navController.push(CarLegalPicturesPage);
      return this.router.navigateByUrl('/car-legal-pictures');
    }
  }

  NextFinish () {

    console.log('ContextService.currentInspection', ContextService.currentInspection);

    this.loadingServiceProvider.hideLoading();
    // this.navController.push(CarLegalPicturesPage);
    return this.router.navigateByUrl('/car-legal-pictures');
  }

  public updateInspection() {

    var body = ContextService.currentInspection;
    body.ciudad = this.cityName;
    body.ciudad_codigo = this.cityCode;
    body.departamento = this.stateName;
    body.departamento_codigo = this.stateCode;
    body.marca = this.brandName;
    body.linea = this.brandLineName;
    body.color = this.colorName;
    body.color_codigo = this.colorCode;
    body.marca_codigo = this.brandCode;
    body.linea_codigo = this.codLinea;
    body.pais = ContextService.location.country;

    const currentYear = parseInt(dateFormat(new Date(), 'yyyy')) + 1;
    const carModel = parseInt(body.modelo);

    // if(carModel > currentYear) {
    //   this.alertServiceProvider.show('Error', 'El modelo no puede ser mayor al año');
    //   return;
    // }


    this.loadingServiceProvider.showLoading();



    if(!body.origen || body.origen.length == 0){
      body.origen = body.origen_veh;
    }

    if(!body.origen_veh || body.origen_veh.length == 0){
      body.origen_veh = body.origen;
    }

    body.version_cod = body.linea_codigo;
    body.version_codigo = body.version_cod;
    body.version = body.linea;
    
    const filteredUse = this.carUses.filter(item => {
      return item.codigo === body.uso_cod;
    });

    if (filteredUse.length > 0) {
      body.uso = filteredUse[0].descripcion;
    }

    const filteredType = this.carTypes.filter(item => {
      return item.codigo === body.tipo_codigo;
    });

    if (filteredType.length > 0) {
      body.tipo = filteredType[0].nombre;
    }

    body.tipo_cod = body.tipo_codigo;
    body.tipo_desc = body.tipo;
    body.marca_cod = body.marca_codigo;
    body.color_cod = body.color_codigo;

    console.log('updateInspection body: ', body);

    this.inspectionProvider.updateInspection(body).subscribe(result => {
          this.loadingServiceProvider.hideLoading();

          console.log('updateInspection result', result);
  
          if(result.responseData && !result.responseData.error) {
            ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 2;
            // this.navController.push(CarLegalPicturesPage);
            return this.router.navigateByUrl('/car-legal-pictures');
          }
          else{
            this.alertServiceProvider.show('', 'No se pudo actualizar la cotización');
          }
        },
        error => {
          this.loadingServiceProvider.hideLoading();
          this.alertServiceProvider.show('Error', error);
        }
      );
  }

  footerExpanded() {
    // console.log('Footer expanded!');
  }

  footerCollapsed() {
    // console.log('Footer collapsed!');
  }

  toggleFooter() {
    this.footerState = this.footerState == IonPullUpFooterState.Collapsed ?
      IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }

  public onFocusInput() {
    this.footerState = IonPullUpFooterState.Collapsed;
  }

  public isDisabled() {
    // return false;
    return ContextService.location.country === ConstantsService.COSTARICA_CODE
  }

  public openList(event: Event, controller: any, name: any, list: any, callback: any, loadAtStart: boolean) {
    // this.navController.push(ModalSelectPage, {listName: name, itemList: list,
    //   controllerSrc: controller, callbackList: callback, loadAtStart: loadAtStart}); 

    ContextService.ModalSelectParametes = {
      listName: name, 
      itemList: list,
      controllerSrc: controller, 
      callbackList: callback, 
      loadAtStart: loadAtStart
    };

    return this.router.navigateByUrl('/modal-select');

  }

  // SE OBTIENE ESTADOS Y CIUDADES
  public callbackList(item, listName, controller) {

    if (listName == 'states') {
      // controller.currentInspection.cliente.codProv = item.codigo;
      controller.stateCode = item.codigo;
      controller.stateName = item.descripcion;
      // controller.currentInspection.cliente.codLocalidad = null;
      // controller.currentInspection.cliente.nomCiudad = '';
      controller.cityCode = '';
      controller.cityName = '';
      controller.getCities();
    } else if (listName == 'cities') {
      // controller.currentInspection.cliente.codLocalidad = item.codLocalidad;
      // controller.currentInspection.cliente.nomCiudad = item.nomLocalidad;
      controller.cityCode = item.codigo;
      controller.cityName = item.descripcion;
    } else if (listName == 'brands') {
      // controller.currentInspection.riesgo.codMarca = item.codMarca;
      controller.brandCode = item.codigo;
      controller.brandName = item.descripcion;
      controller.codLinea = null;
      controller.brandLineName = '';
      controller.getCarBrandLines();
      // controller.currentInspection.riesgo.codGremioPais = '';
    } else if (listName == 'colors') {
      controller.colorCode = item.codigo as string;
      controller.colorName = item.descripcion; 

      console.log('colors selected item: ', item);
      console.log('colors selected controller.colorCode: ', controller.colorCode);

    } else if (listName == 'brandLines') {
      controller.codLinea = item.codigo;
      controller.brandLineName = item.descripcion;
      // controller.codGremioPais = item.codGremioLinea;
    }
  }

  // OBTENER ESTADOS
  private getStates() {
    this.loadingServiceProvider.showLoading();

    this.statesServiceProvider.getStates(
      ContextService.location.country
    ).subscribe(result => {

      console.log('getStates result', result);

      if (result.status && result.data != null) {
        this.states = result.data;

        // const filtered = this.states.filter(item => {
        //   return item['codProv'] === this.currentInspection.cliente.codProv;
        // });

        // if (filtered.length > 0) {
        //   this.getCities();
        //   this.stateName = filtered[0].nomProv;
        // }

      } else {
        this.alertServiceProvider.show('Error', result.data);
      }
      this.loadingServiceProvider.hideLoading();
    });
  }

  // LLAMADO DESDE EL CALLBACKLIST PARA OBTENER CIUDADES
  private getCities() {

    this.loadingServiceProvider.showLoading();

    this.citiesServiceProvider.getCities(
      ContextService.location.country,
      this.stateCode
    ).subscribe(result => {
      if (result.status && result.data != null) {
        this.cities = result.data;

        // console.log(this.currentInspection.cliente.codLocalidad);

        // const filtered = this.cities.filter(item => {
        //   return item['codLocalidad'] === this.currentInspection.cliente.codLocalidad;
        // });

        // if (filtered.length > 0) {
        //   this.cityName = filtered[0].nomLocalidad;
        //   this.currentInspection.cliente.codLocalidad = filtered[0].codLocalidad;
        //   this.currentInspection.cliente.nomCiudad = this.cityName;
        // }
      } else {
        this.alertServiceProvider.show('Error', result.data);
      }

      this.loadingServiceProvider.hideLoading();
    });
  }

  public isCountry(list) {

    let exist = false;

    if(list && list.length > 0){
      list.forEach(element => {
        if(ContextService.location.country === element){
          exist = true;
        }
      });
    }

    return exist;
    // return ContextService.location.country === ConstantsService.GUATEMALA_CODE;
  }

  public isReadOnly(){
    return false;
  }

}
