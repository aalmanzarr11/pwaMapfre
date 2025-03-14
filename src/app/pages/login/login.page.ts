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
import { TokenForm } from 'src/app/shared/Dtos/Requests/tokenForm.dto';
import { environment } from 'src/environments/environment';

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
  termsFile = ''; 
  registerCredentials :TokenForm=new TokenForm(); 
  currentType=''

  constructor( 
    private authService: AuthService, 
    private loadingServiceProvider: LoadingService,
    private alertServiceProvider: AlertService,
    private helperStrings: HelperStringsService, 
    private userWebService: UserinfoWebService,
    private router: Router,
    public formBuilder: UntypedFormBuilder) { 
  }

  ionViewDidLoad() {
    // ConfigServiceProvider
    // this.headerColor.tint('#becb29');
    // this.statusBar.backgroundColorByHexString('#ffffff');
  }

  // INICIO DE COMPONENTES
  ngOnInit() { 
    this.formGroup = this.formBuilder.group({
      Username: new UntypedFormControl('', [Validators.required]),
      Password: new UntypedFormControl('', [Validators.required]),
      userType: new UntypedFormControl('', [Validators.required])
    });

    this.strings = ConfigService.strings;
    this.termsFile = 'assets/docs/' + this.strings.privacy_file;
 
    
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
 

    this.DetectOS();
 
  }

  // NO ESTA HABILITADO PARA CREAR CUENTAS
  public createAccount() {
    // this.navController.push('RegisterPage');
    return this.router.navigateByUrl('/register');
  }

  public submitForm() {
 
    this.token();
 
  }
  triggerEvent(){ 
    if(this.currentType=="C"){ 
      this.registerCredentials.Username=""
      this.registerCredentials.Password=""
    }
    this.currentType=this.registerCredentials.userType 
  }

  token() {
    console.log(this.registerCredentials)
    if (!this.formGroup.valid && this.registerCredentials.userType != 'C') {
      this.alertServiceProvider.show('', this.strings.generalFormValidationError);
      return;
    }

    if (!this.isMobile && EnvironmentService.isProduction) {
      // this.alertServiceProvider.show('', 'Por integridad de la información lo invitamos a realizar su inspección desde un smartphone');
      // return; 
    }


    if(this.registerCredentials.userType == 'C'){ 
      this.registerCredentials=new TokenForm(environment.user,environment.pss,"C");
    }
      this.loadingServiceProvider.showLoading();

      this.registerCredentials.grantType = this.strings.grant_type;
      this.authService.token(this.registerCredentials).subscribe(result => { 
  
        this.loadingServiceProvider.hideLoading();
  
        if (result !== null && result.data) {
  
          if(result.data.access_token){
            ContextService.apiToken = result.data.access_token;
            this.accessSuccess(result);
          }
          else{
            const description = result.error? result.error: "Se presentó un error, por favor intente nuevamente";
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

      localStorage.setItem('user', this.registerCredentials.Username);

      ContextService.userSession.nomUsuario = this.registerCredentials.Username;
      ContextService.userSession.userType = this.registerCredentials.userType;
      ContextService.userSession.userTypeName = userTypeName;

      // Guardando parametros de usuario para PWA
      this.userWebService.username = this.registerCredentials.Username;
      // this.userWebService.namecompleteduser = result.data.usuario.nomTercero;
      // this.userWebService.apellidocompleteuser = result.data.usuario.ape1Tercero;

      ////console.log('ContextServiceProvider.location.country', ContextService.location.country);

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

    ////console.log(navigator.userAgent);
    ////console.log(navigator.platform);
    if ( /Mobile|Android|iPhone/i.test(navigator.userAgent) ) {
       if (navigator.platform.indexOf('Android') != -1) { this.OSName = 'Android', this.isMobile = true; }
       if (navigator.platform.indexOf('Linux') != -1) { this.OSName = 'Android', this.isMobile = true; }
       if (navigator.platform.indexOf('null') != -1) { this.OSName = 'Android', this.isMobile = true; }
       if (navigator.platform.indexOf('iPhone') != -1) { this.OSName = 'iOS', this.isMobile = true; }

      ////console.log(this.isMobile);
      ////console.log('Your OS: ' + this.OSName);
    }
  }
 

}
