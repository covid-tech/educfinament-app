import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadAvatarPagePage } from './upload-avatar-page.page';

describe('UploadAvatarPagePage', () => {
  let component: UploadAvatarPagePage;
  let fixture: ComponentFixture<UploadAvatarPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAvatarPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadAvatarPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
