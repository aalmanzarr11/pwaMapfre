import { Injectable } from '@angular/core';
import { ContextService } from '../context/context.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public storage: Storage) {}

  public saveInspection = function(inspection : any){

    let storeKey = inspection.inspeccion.codDocum + '-' + inspection.riesgo.codPlaca;

    if(inspection.inspeccion.numInsp){
      this.storage.set(storeKey, inspection);
    }
    
    ContextService.currentInspection = inspection;
  }

  public loadInspection = function(inspection : any, controller : any, loadCallback: (obj:any) => void){

    let storeKey = inspection.inspeccion.codDocum + '-' + inspection.riesgo.codPlaca;

    this.storage.get(storeKey).then((val) => {

      console.log(val);
      // console.log(val);

      if(val){
        ContextService.currentInspection = val;

        let storePartKey = 'part-' + ContextService.currentInspection.inspeccion.codDocum + '-' + 
          ContextService.currentInspection.riesgo.codPlaca;

        // console.log(storePartKey);

        this.storage.get(storePartKey).then((valPart) => {

          // console.log("valPart");
          

          if(valPart){
            ContextService.carParts = valPart;
          }

          // console.log(ContextService.carParts);

          // loadCallback(controller);

          let accessoryPartKey = 'acc-' + ContextService.currentInspection.inspeccion.codDocum + '-' + 
          ContextService.currentInspection.riesgo.codPlaca;

          // console.log(accessoryPartKey);

          this.storage.get(accessoryPartKey).then((valAcce) => {

            // console.log("valAcce");
            // console.log(valAcce);

            if(valAcce){
              ContextService.accessories = valAcce;
            }
            
            loadCallback(controller);
          });

        });
      }
      else{
        loadCallback(controller);
      }
    });
  }

  public removeInspection = function(inspection : any){
    this.storage.remove(inspection.codDocum + '-' + inspection.codPlaca);
  }
 
  public saveCarParts = function(){
    let storeKey = 'part-' + ContextService.currentInspection.inspeccion.codDocum + '-' + 
      ContextService.currentInspection.riesgo.codPlaca;

    this.storage.set(storeKey, ContextService.carParts);

    this.storage.get(storeKey).then((valPart) => {

      // console.log(valPart);

    });

  }

  public saveAccessories = function(){
    let storeKey = 'acc-' + ContextService.currentInspection.inspeccion.codDocum + '-' + 
      ContextService.currentInspection.riesgo.codPlaca;

    this.storage.set(storeKey, ContextService.accessories);
  }
  
}
