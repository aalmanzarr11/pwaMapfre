import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';

@Component({
  selector: 'app-modal-select',
  templateUrl: './modal-select.page.html',
  styleUrls: ['./modal-select.page.scss'],
})
export class ModalSelectPage implements OnInit {

  // inspections: any;
  itemList: any;
  itemListFiltered: any;
  listName: any;
  listDisplayName: any;
  callbackList: any;
  controllerSrc: any;
  loadAtStart: boolean;
  searchTerm: string = null;
  strings: any = {};

  constructor(
      public navCtrl: NavController, 
              // public navParams: NavParams, 
      private loadingServiceProvider: LoadingService
    ) {
    
      //console.log('ContextService.ModalSelectParametes', ContextService.ModalSelectParametes);
    
      this.listName = ContextService.ModalSelectParametes.listName; //navParams.get("listName");
      this.callbackList = ContextService.ModalSelectParametes.callbackList; //navParams.get("callbackList");
      this.controllerSrc = ContextService.ModalSelectParametes.controllerSrc; //navParams.get("controllerSrc");
      this.loadAtStart = ContextService.ModalSelectParametes.loadAtStart; //navParams.get("loadAtStart");



  }

  ionViewDidLoad() {
    

  }

  ngOnInit() {
    this.strings = ConfigService.strings;

    this.loadingServiceProvider.showLoading();
    //console.log(this.listName);

    if(this.listName == 'brands'){
      this.listDisplayName = this.strings.generalBrand;
    }
    else if(this.listName == 'colors'){
      this.listDisplayName = this.strings.generalColor;
    }
    else if(this.listName == 'brandLines'){
      this.listDisplayName = this.strings.generalBrandLines;
    }
    else if(this.listName == 'subparts'){
      this.listDisplayName = this.strings.generalSubparts;
    }
    else if(this.listName == 'accessories'){
      this.listDisplayName = this.strings.generalAccesories;
    }
    else if(this.listName == 'states'){
      this.listDisplayName = this.strings.generalStates;
    }
    else if(this.listName == 'cities'){
      this.listDisplayName = this.strings.generalCities;
    }

    setTimeout( () => {
      this.itemList = ContextService.ModalSelectParametes.itemList; //this.navParams.get("itemList");
      
      // if(this.listName == 'brandLines'){
      //   this.itemList = this.itemList.filter(item => {
      //     return item['codMarca'].toLowerCase() === this.controllerSrc.currentInspection.riesgo.codMarca.toLowerCase();
      //   });
      // }

      // //console.log(this.itemList);

      if(this.loadAtStart){
        this.itemListFiltered = this.itemList;
      }

      //console.log('itemListFiltered: ', this.itemListFiltered);
      //console.log('itemList: ', this.itemList);

      this.loadingServiceProvider.hideLoading();
    }, 500);
  }

  public selectItem(item:any){
    this.callbackList(item, this.listName, this.controllerSrc);
    this.back();
  }

  public getItemLabel(item:any){

    let label = '';
    
    if(this.listName == 'brands'){
      label = item.descripcion;
    }
    else if(this.listName == 'colors'){
      label = item.descripcion;
    }
    else if(this.listName == 'brandLines'){
      label = item.descripcion;
    }
    else if(this.listName == 'subparts'){
      label = item.nombrePieza;
    }
    else if(this.listName == 'accessories'){
      label = item.descAccesorio;
    }
    else if(this.listName == 'states'){
      label = item.descripcion;
    }
    else if(this.listName == 'cities'){
      label = item.descripcion;
    }

    return label;
  }

  public onInputSearch($event){
   
    if(this.searchTerm != null && this.searchTerm.length > 2 && this.itemList != null){
      this.itemListFiltered = this.itemList.filter(item => {
        let str = '';
      
        if(this.listName == 'brands'){
          str = item.descripcion;
        }
        else if(this.listName == 'colors'){
          str = item.descripcion;
        }
        else if(this.listName == 'brandLines'){
          str = item.descripcion;
        }
        else if(this.listName == 'subparts'){
          str = item.nombrePieza;
        }
        else if(this.listName == 'accessories'){
          str = item.descAccesorio;
        }
        else if(this.listName == 'states'){
          str = item.descripcion;
        }
        else if(this.listName == 'cities'){
          str = item.descripcion;
        }
  
        return str.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0;
  
      });

      this.itemListFiltered = this.itemListFiltered.slice(0, 100);
    }
    else{
      this.itemListFiltered = this.loadAtStart ? this.itemList : [];
    }
    
    //console.log('this.itemListFiltered.length: ', this.itemListFiltered.length);

  }

  public onCancelSearch($event){
    this.itemListFiltered = this.loadAtStart ? this.itemList : [];

    //console.log('onCancelSearch this.itemListFiltered: ', this.itemListFiltered);
  }

  public back() {
    this.navCtrl.pop();
  }

}
