import { Component } from '@angular/core';
import { AlertController, MenuController, NavController, Platform } from '@ionic/angular';
import { AlertService } from './services/infrastructure/alert/alert.service';
import { ConfigService } from './services/infrastructure/config/config.service';
import { ConnectionService } from './services/infrastructure/connection/connection.service';

import { ContextService } from './services/infrastructure/context/context.service';
import { HelperStringsService } from './services/infrastructure/helper-strings/helper-strings.service';
import { InspectionService } from './services/remote/inspection/inspection.service';
import { LoadingService } from './services/infrastructure/loading/loading.service'; 
import { StringsService } from './services/remote/strings/strings.service';
import { UserinfoWebService } from './services/remote/userinfo-web/userinfo-web.service';
import dateFormat from 'dateformat';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  currentInspection: any = {};

  // public appPages = [
  //   { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
  //   { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
  //   { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
  //   { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
  //   { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //   { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  // ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(public platform: Platform, 
    public navController: NavController,
    public menuController: MenuController,
    // public statusBar: StatusBar, 
    // public splashScreen: SplashScreen,
    // public cache: CacheService,
    // private network: Network,
    // private geolocation: Geolocation,
    // private connectionService:ConnectionService,
    // public events: Events,
    private userWebService: UserinfoWebService,
    // private emarketInject : EMarketInject,
    private inspectionProvider: InspectionService,
    // private storageService: StorageService,
    private helperStrings: HelperStringsService,
    private alertServiceProvider: AlertService,
    // private EMarketModel: EMarketHelperStringModel,
    private loadingServiceProvider: LoadingService,
    private stringsServiceProvider: StringsService,
    private alertCtrl: AlertController,
    // private emarketInit: InitEMarket,
    // public emarketInsp: EmarketInsp,
    // public emarketModel: EMarketHelperStringModel
  ) {
    this.initializeApp(); 
    ContextService.init();
    this.currentInspection = ContextService.currentInspection;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
          /* Check networkStatus */
      // this.connectionService.initializeNetworkEvents()  
      // })
      // this.events.subscribe('network:online', () => { 
      // }) 

      this.getCurrentLocation();

      // this.splashScreen.hide();
    });

    //this.GetParameters();
    this.session();
  }

  async GetParameters() {

    // this.stringsServiceProvider.GetConsulta().subscribe(res => { 
    //   if (res.status && res.data !== null){ 
    //     this.stringsServiceProvider.PostConsulta(res.data).subscribe(data => { 
    //       if (data.status && data.data !== null) {
    //         sessionStorage.setItem("entry", JSON.stringify(data.data));
    //         this.session();
    //       }
    //     })
    //   }
    // })
  }

  public session() {
    // const entry = sessionStorage.getItem("entry");
    // if (entry) {
    //  let StringValues = JSON.parse(entry); 

    //  const emarketurl=sessionStorage.getItem('emarket');
    //  this.helperStrings.ReturnURL = emarketurl;

    //  this.emarketInject.Descifrar(StringValues.nonce, StringValues.cifrado, StringValues.init_vector).then(res =>{ 
    //   var respose = JSON.parse(JSON.stringify(res)) 
    //   if (respose.status && respose.data !== null) { 
    //     if (this.EMarketModel.cod_placa === undefined || this.emarketModel.cod_docum === undefined) {
    //       return;
    //     }
    //     this.getGlobalStrings('PA');
    //   }
    //  });
    // }
  }

    //Se obtienen los parametros por pais "PA"
  private getGlobalStrings(countryCode: string) {
    this.loadingServiceProvider.showLoading();

    this.stringsServiceProvider
      .getStrings(countryCode)
      .subscribe(result => {
        if (result.status && result.data != null) { 
          ConfigService.strings = result.data;
          ConfigService.apiUrl = ConfigService.strings.servicesURL;

          this.autoInspect();
        } else {
          this.alertServiceProvider.show('Error', result.data);
          this.loadingServiceProvider.hideLoading();
        }
        this.loadingServiceProvider.hideLoading();
      });
  }

  //Se genera la Inspeccion
  public autoInspect() {
    this.helperStrings.UsuarioActivo = 'C';
    ContextService.userSession = {  
        'tipDocum':'',
        'codDocum':'',
        'nomUsuario':'APPAUTI',
        'nomTercero':'',
        'ape1Tercero':'',
        'ape2Tercero':'',
        'txtEmail':'',
        'tipUsuario':''
    };
    // Fix PWA Username
    this.userWebService.username = "APPAUTI";
    this.userWebService.namecompleteduser = "";
    this.userWebService.apellidocompleteuser = "";

    this.getInspectionNumber();
  }
  
  //Metodo para Crear la Inspeccion
  public getInspectionNumber() {

    this.loadingServiceProvider.showLoading();

    this.inspectionProvider.getInspectionNumber().subscribe(result => {
      if (result.status && result.data != null) {
        this.currentInspection.inspeccion.numInsp = result.data.num_insp;
        this.currentInspection.inspeccion.fecInsp = dateFormat(new Date(), "ddmmyyyy");
        this.currentInspection.inspeccion.horaInsp = dateFormat(new Date(), "HH:MM");
        this.currentInspection.new = true;
        // this.emarketInsp.Current = this.currentInspection;
        // this.storageService.saveInspection(this.emarketInsp.Current);
        // this.emarketInject.getCarCexper(this.EMarketModel.cod_placa, this.helperStrings.UsuarioActivo);
      }
      else {
        this.alertServiceProvider.show("Error", result.data);
      }

      this.loadingServiceProvider.hideLoading();
    });
  }

  getCurrentLocation() {
    // this.geolocation
    //   .getCurrentPosition()
    //   .then(() => { 
    //       ContextServiceProvider.location = {
    //         'country': ConstantsProvider.PANAMA_CODE,
    //         'lat': 0,
    //         'long': 0
    //       };
    //     })
    //   .catch(error => { 
    //   });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
  }

  logout() {

    this.menuController.close();
    
    setTimeout( () => {
      this.navController.navigateRoot('login');
      ContextService.userSession = {};
      // this.emarketInit.Enabled = false;
    }, 100);

    
  }

  gotoInspections() {
    // this.navCtrl.push(CarLegalPicturesPage);
    // this.nav.setRoot(InspectionListPage);
  }

  gotoEnterCar() {

    this.menuController.close();
    this.navController.navigateRoot('enter-car');

    // setTimeout( () => {
    //   // this.nav.setRoot(EnterCarPage);
    // }, 100);
  }

  gotoSearchInspection() {
    // setTimeout( () => {
    //   // this.nav.setRoot(EnterCarPage);
    // }, 100);
  }

  public getUserFullName(){
    return ContextService.userSession != null ? 
          this.userWebService.namecompleteduser:
           '';
  }

  public getUserType(){
    return ContextService.userSession != null ? 
    ContextService.userSession.tipUsuario:
           '';
  }

  public isMenuVisible(){
    return ContextService.isMenuVisible;
  }

  public getUsername(){
    return ContextService.userSession != null ? 
    ContextService.userSession.nomUsuario:
           '';
  }

  public getInspectionNum() {
 

   return ContextService.currentInspection != null && ContextService.currentInspection.numeroCotizacion ?
   ContextService.currentInspection.numeroCotizacion :
          '';

 }

  // alertConfirm(msg:string) {
  //   let alert = this.alertCtrl.create({
  //     title: 'Información',
  //     message: msg,
  //     buttons: [
  //       {
  //         text: 'Aceptar',
  //         handler: () => { 
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }
  public getTermsConditions(){
    return 'assets/docs/' + ConfigService.strings.privacy_file;
  }

}
