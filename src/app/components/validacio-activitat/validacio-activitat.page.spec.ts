import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidacioActivitatPage } from './validacio-activitat.page';

describe('ValidacioActivitatPage', () => {
  let component: ValidacioActivitatPage;
  let fixture: ComponentFixture<ValidacioActivitatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacioActivitatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidacioActivitatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
