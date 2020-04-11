import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadStudentVideoPage } from './upload-student-video.page';

describe('UploadStudentVideoPage', () => {
  let component: UploadStudentVideoPage;
  let fixture: ComponentFixture<UploadStudentVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadStudentVideoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadStudentVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
