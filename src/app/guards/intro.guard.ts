import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from '../services/infrastructure/context/context.service';
// import { Storage } from '@capacitor/storage';
// import { Storage } from '@ionic/storage';
 
 
export const INTRO_KEY = 'intro-seen';
 
@Injectable({
  providedIn: 'root'
})
export class IntroGuard  {
 
  constructor(private router: Router) { }
 
  async canLoad(): Promise<boolean> {
      const hasSeenIntro = ContextService.hasSeenIntro; //await Storage.get({key: INTRO_KEY});      
      if (hasSeenIntro) {
        return true;
      } else {
        this.router.navigateByUrl('/', { replaceUrl:true });
        return false;
      }
  }
}