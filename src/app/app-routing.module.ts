import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'folder/Inbox',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule),
  },
  {
    path: 'select-country',
    loadChildren: () => import('./pages/select-country/select-country.module').then( m => m.SelectCountryPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'instructions',
    loadChildren: () => import('./pages/instructions/instructions.module').then( m => m.InstructionsPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'enter-car',
    loadChildren: () => import('./pages/enter-car/enter-car.module').then( m => m.EnterCarPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'inspection-list',
    loadChildren: () => import('./pages/inspection-list/inspection-list.module').then( m => m.InspectionListPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'customer-data',
    loadChildren: () => import('./pages/customer-data/customer-data.module').then( m => m.CustomerDataPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'car-legal-pictures',
    loadChildren: () => import('./pages/car-legal-pictures/car-legal-pictures.module').then( m => m.CarLegalPicturesPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'modal-select',
    loadChildren: () => import('./pages/modal-select/modal-select.module').then( m => m.ModalSelectPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'car-more-legal-pictures',
    loadChildren: () => import('./pages/car-more-legal-pictures/car-more-legal-pictures.module').then( m => m.CarMoreLegalPicturesPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'car-take-legal-pictures',
    loadChildren: () => import('./pages/car-take-legal-pictures/car-take-legal-pictures.module').then( m => m.CarTakeLegalPicturesPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'car-pictures',
    loadChildren: () => import('./pages/car-pictures/car-pictures.module').then( m => m.CarPicturesPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'take-picture',
    loadChildren: () => import('./pages/take-picture/take-picture.module').then( m => m.TakePicturePageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'car-accessories',
    loadChildren: () => import('./pages/car-accessories/car-accessories.module').then( m => m.CarAccessoriesPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'car-damage',
    loadChildren: () => import('./pages/car-damage/car-damage.module').then( m => m.CarDamagePageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'accept-inspection',
    loadChildren: () => import('./pages/accept-inspection/accept-inspection.module').then( m => m.AcceptInspectionPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'car-accessory',
    loadChildren: () => import('./pages/car-accessory/car-accessory.module').then( m => m.CarAccessoryPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'car-inspection-success',
    loadChildren: () => import('./pages/car-inspection-success/car-inspection-success.module').then( m => m.CarInspectionSuccessPageModule),
    canLoad: [IntroGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
