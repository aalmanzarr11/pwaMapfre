import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput, IonSelect, IonText } from '@ionic/angular';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ConstantsService } from 'src/app/services/infrastructure/constants/constants.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { EnvironmentService } from 'src/app/services/infrastructure/environment/environment.service';
import { HelperStringsService } from 'src/app/services/infrastructure/helper-strings/helper-strings.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { AuthService } from 'src/app/services/remote/auth/auth.service';
import { UserinfoWebService } from 'src/app/services/remote/userinfo-web/userinfo-web.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // @ViewChild('emailInput') emailInput: IonInput;
  // @ViewChild('passwordInput') passwordInput: IonInput;
  // @ViewChild('userTypeSelect') userTypeSelect: IonSelect;

  formGroup: UntypedFormGroup;
  strings: any = {};
  userTypes: any;
  OSName = 'Unknown OS';
  isMobile = false;
  registerCredentials_PRO  = { email: '', password: '', userType : '', grantType: '' };
  // registerCredentials_PRO = { email: 'cso_sa07@yahoo.com', password: '542823a4e9acbac64ec21659c5a7c415', userType: 'P', grantType: '' };

  // registerCredentials_PRO  = { email: 'UTEST1', password: '123456', userType : 'I' };
  // registerCredentials_DEV = { email: '', password: '', userType : '', grantType: '' };


  // El Salvador
  // registerCredentials_DEV = { email: 'dortega', password: 'Mapfre123', userType: 'P', grantType: '' };
  // registerCredentials_DEV = { email: 'interTest', password: 'Mapfre$123', userType: 'I', grantType: '' };
  // registerCredentials_DEV = { email: 'eamenji', password: 'Mapfre$123', userType: 'C', grantType: '' };

  // HONDURAS
  registerCredentials_DEV = { email: 'AGENTE2006', password: '*Alfa123', userType: 'I', grantType: '' };
  // registerCredentials_DEV = { email: 'LGLEON1', password: '*Alfa123', userType: 'P', grantType: '' };
  // registerCredentials_DEV = { email: 'AGENTE2006', password: '*Alfa123', userType: 'I', grantType: '' };
  // registerCredentials_DEV = { email: 'OSLOPEZ', password: '*Alfa123', userType: 'I', grantType: '' };
  // registerCredentials_DEV = { email: 'KDIAZ', password: '*Alfa123', userType: 'C', grantType: '' };
  // registerCredentials_DEV = { email: '423205', password: '*Alfa123', userType: 'C', grantType: '' };


  // Panamá
  // registerCredentials_DEV = { email: 'UTEST1', password: '123456', userType : 'I' }; 
  // registerCredentials_DEV = { email: 'UTEST2', password: 'Test123456', userType : 'I' };
  // registerCredentials_DEV = { email: 'UTEST3', password: '123456', userType : 'P' };
  // registerCredentials_DEV = { email: 'UTEST4', password: 'Test123456', userType : 'P' };

 // Guatemala
  // registerCredentials_DEV = { email: 'grodriguez', password: 'Mapfregt01', userType : 'P', grantType: '' };


  // CR
  // registerCredentials_DEV = { email: 'perito.pwa', password: 'PWAPerit21.', userType: 'P', grantType: '' };
  // registerCredentials_DEV = { email: 'intermediario.pwa', password: 'PWAInterm21.', userType: 'I', grantType: '' };


  // NICARAGUA
  // registerCredentials_DEV = { email: 'cso_sa07@yahoo.com', password: '542823a4e9acbac64ec21659c5a7c415', userType: 'P', grantType: '' };


  // registerCredentials_DEV = { email: '', password: '', userType: 'P', grantType: '' };



  termsFile = '';
  // termsFile = this.isCurrentCountryPA() ? 'assets/docs/MAPFRE-PANAMA-S.A.-POLITICA-DE-PRIVACIDAD-01-02-2021.pdf' : 
  //   'assets/docs/Politica_privacidad_MAPFRE_Guatemala.pdf';

  registerCredentials = EnvironmentService.isProduction ?
                        this.registerCredentials_PRO : this.registerCredentials_DEV;


  constructor(
    // private navController: NavController,
    private authService: AuthService,
    // private contextService: ContextServiceProvider,
    private loadingServiceProvider: LoadingService,
    private alertServiceProvider: AlertService,
    private helperStrings: HelperStringsService,
    // public keyboard: Keyboard,
    private userWebService: UserinfoWebService,
    private router: Router,
    public formBuilder: UntypedFormBuilder) {
      // console.log(keyboard);
  }

  ionViewDidLoad() {
    // ConfigServiceProvider
    // this.headerColor.tint('#becb29');
    // this.statusBar.backgroundColorByHexString('#ffffff');
  }

  // INICIO DE COMPONENTES
  ngOnInit() {
    // this.formGroup = new FormGroup({
      // email: new FormControl('', [Validators.required]),
      // password: new FormControl('', [Validators.required]),
      // userType: new FormControl('', [Validators.required])
    // });

    this.formGroup = this.formBuilder.group({
      email: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required]),
      userType: new UntypedFormControl('', [Validators.required])
    });

    this.strings = ConfigService.strings;
    this.termsFile = 'assets/docs/' + this.strings.privacy_file;

    // console.log('this.strings:', this.strings);
    // console.log('ContextServiceProvider.location.country', ContextServiceProvider.location.country);
    
    this.userTypes = this.strings.userTypes;


    // this.userTypes = [
    //   {
    //     'id' : 'P',
    //     'name' : this.strings.loginLabelUserTypeInspector
    //   },
    //   {
    //     'id' : 'I',
    //     'name' : this.strings.loginLabelUserTypeInter
    //   },
    //   {
    //     'id' : 'C',
    //     'name' : this.strings.loginLabelUserTypeCustomer
    //   }
    // ];

    console.log('ContextServiceProvider.location.country', ContextService.location.country);

    this.DetectOS();

    console.log('ContextServiceProvider.location.country', ContextService.location.country);
  }

  // NO ESTA HABILITADO PARA CREAR CUENTAS
  public createAccount() {
    // this.navController.push('RegisterPage');
    return this.router.navigateByUrl('/register');
  }

  public submitForm() {

    console.log('ContextServiceProvider.location.country', ContextService.location.country);

    // if (this.registerCredentials.userType == 'C') {
    //   this.autoInspect()
    // } else {
    //   this.token();
    // }

    this.token();

    // console.log('ConfigServiceProvider.strings.countryName', ConfigServiceProvider.strings.countryName);
    // ConfigServiceProvider.strings
  }

  public submitFormClient() {

    console.log('submitFormClient');

    ContextService.userSession.userType = 'C';
    this.helperStrings.UsuarioActivo = ContextService.userSession.userType;
    this.registerCredentials.userType = ContextService.userSession.userType;
    this.token();
    // setTimeout(this.token.bind(this), 500);
  }

  token() {

    console.log('token');

    if (!this.formGroup.valid && this.registerCredentials.userType != 'C') {
      this.alertServiceProvider.show('', this.strings.generalFormValidationError);
      return;
    }

    if (!this.isMobile && EnvironmentService.isProduction) {
      // this.alertServiceProvider.show('', 'Por integridad de la información lo invitamos a realizar su inspección desde un smartphone');
      // return; 
    }


    if(this.registerCredentials.userType != 'C'){
      this.loadingServiceProvider.showLoading();

      this.registerCredentials.grantType = this.strings.grant_type;
      this.authService.token(this.registerCredentials).subscribe(result => {
  
        console.log('ContextServiceProvider.location.country', ContextService.location.country);
        
        console.log('token result', result);
        console.log('token result.data.access_token', result.data.access_token);
  
  
        this.loadingServiceProvider.hideLoading();
  
        if (result !== null && result.data) {
  
          if(result.data.access_token){
            ContextService.apiToken = result.data.access_token;
            this.accessSuccess(result);
          }
          else{
            const description = result.data.error_description ? result.data.error_description : "Se presentó un error, por favor intente nuevamente";
            this.alertServiceProvider.show('Error', description);
          }
        }
        else {
          this.alertServiceProvider.show('Error', 'Intente nuevamente');
        }

      }
      , error => {
          this.loadingServiceProvider.hideLoading();
          this.alertServiceProvider.show('Error', error);
        }
      );
    }
    else{
 
        this.autoInspect(); 
      
    }

  }

  // // CLASE LLAMADA POR EL BOTON DE LOGIN
  // public login() {

  //   console.log('login registerCredentials', this.registerCredentials);

  //   if (this.registerCredentials.userType === 'C') {

  //     this.autoInspect()
  //   } else {
  //     if (!this.formGroup.valid) {
  //       this.alertServiceProvider.show('', this.strings.generalFormValidationError);
  //       return;
  //     }

  //     // if (!this.isMobile && EnvironmentServiceProvider.isProduction) {
  //     //   this.alertServiceProvider.show('', 'Por integridad de la información lo invitamos a realizar su inspección desde un smartphone');
  //     //   return;
  //     // }

  //     this.loadingServiceProvider.showLoading();

  //     this.authService.login(this.registerCredentials).subscribe(result => {


  //         console.log('result: ', result);
  //         console.log('result.data.acceso: ', result.data.acceso);

  //         this.loadingServiceProvider.hideLoading();
  //         this.accessSuccess(result);
  //       }
  //       , error => {
  //         this.loadingServiceProvider.hideLoading();
  //         this.alertServiceProvider.show('Error', error);
  //       }
  //     );
  //   }
  // }

  public accessSuccess(result) {
  
    let userTypeName = "Cliente";
    
    // se valida el tipo de usuario Perito o Intermediario
    if (this.registerCredentials.userType == 'P') {
      this.helperStrings.UsuarioActivo = 'P';
      userTypeName = "Perito";
    } 
    else {
      this.helperStrings.UsuarioActivo = 'I';
      userTypeName = "Intermediario";
    }

    //  || !EnvironmentServiceProvider.isProduction
    if (result.status) {
    // if (result.acceso  === 'true') {

      localStorage.setItem('user', this.registerCredentials.email);

      ContextService.userSession.nomUsuario = this.registerCredentials.email;
      ContextService.userSession.userType = this.registerCredentials.userType;
      ContextService.userSession.userTypeName = userTypeName;

      // Guardando parametros de usuario para PWA
      this.userWebService.username = this.registerCredentials.email;
      // this.userWebService.namecompleteduser = result.data.usuario.nomTercero;
      // this.userWebService.apellidocompleteuser = result.data.usuario.ape1Tercero;

      console.log('ContextServiceProvider.location.country', ContextService.location.country);

      // this.navController.push(EnterCarPage);
      ContextService.isMenuVisible = true;
      return this.router.navigateByUrl('/enter-car');
    } else {
      // this.alertServiceProvider.show('', this.strings.loginError);
      this.alertServiceProvider.show('', result.data.mensaje);
    }
  }

  // CLASE LLAMADA POR EL BOTON AUTOINSPECCION CLIENTE
  public autoInspect() {
    // if (!this.isMobile && EnvironmentServiceProvider.isProduction) {
    //   this.alertServiceProvider.show('', 'Por integridad de la información lo invitamos a realizar su inspección desde un smartphone');
    //   return;
    // }

    
    
    // ContextServiceProvider.userSession = {
    //     'tipDocum': '',
    //     'codDocum': '',
    //     'nomUsuario': 'APPAUTI',
    //     'nomTercero': '',
    //     'ape1Tercero': '',
    //     'ape2Tercero': '',
    //     'txtEmail': '',
    //     'tipUsuario': ''
    // };
    // Fix PWA Username
    this.userWebService.username = 'APPAUTI';
    this.userWebService.namecompleteduser = '';
    this.userWebService.apellidocompleteuser = '';

    ContextService.userSession.userType = 'C';
    this.helperStrings.UsuarioActivo = ContextService.userSession.userType;

    ContextService.isMenuVisible = true;
    return this.router.navigateByUrl('/enter-car');
  }

  // VALIDACION DE CAMPOS DE USUARIO Y PASSWORD LLAMDA DESDE EL FORMULARIO
  public onKeyupEnter($event: any) {
    const elementName = $event.srcElement.name;

    if (elementName == 'email') {
      setTimeout(() => {
        // this.passwordInput.setFocus();
      }, 150);
    } else if (elementName == 'password') {
      // this.userTypeSelect.open();
      // this.login();
      this.token();
    }
  }

  DetectOS() {

    console.log(navigator.userAgent);
    console.log(navigator.platform);
    if ( /Mobile|Android|iPhone/i.test(navigator.userAgent) ) {
       if (navigator.platform.indexOf('Android') != -1) { this.OSName = 'Android', this.isMobile = true; }
       if (navigator.platform.indexOf('Linux') != -1) { this.OSName = 'Android', this.isMobile = true; }
       if (navigator.platform.indexOf('null') != -1) { this.OSName = 'Android', this.isMobile = true; }
       if (navigator.platform.indexOf('iPhone') != -1) { this.OSName = 'iOS', this.isMobile = true; }

      console.log(this.isMobile);
      console.log('Your OS: ' + this.OSName);
    }
  }

  public isCurrentCountryPA() {
    return ContextService.location.country === ConstantsService.PANAMA_CODE;
  }

}
