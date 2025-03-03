import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarMoreLegalPicturesPage } from './car-more-legal-pictures.page';

describe('CarMoreLegalPicturesPage', () => {
  let component: CarMoreLegalPicturesPage;
  let fixture: ComponentFixture<CarMoreLegalPicturesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CarMoreLegalPicturesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarMoreLegalPicturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
