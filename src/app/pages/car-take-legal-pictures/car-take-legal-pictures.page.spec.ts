import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarTakeLegalPicturesPage } from './car-take-legal-pictures.page';

describe('CarTakeLegalPicturesPage', () => {
  let component: CarTakeLegalPicturesPage;
  let fixture: ComponentFixture<CarTakeLegalPicturesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CarTakeLegalPicturesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarTakeLegalPicturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
