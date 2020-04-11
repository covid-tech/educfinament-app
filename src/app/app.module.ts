import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';
import { UploadStudentVideoPageModule } from 'pages/upload-student-video/upload-student-video.module';

import { UserManagerAPIClient } from 'services/UserManagerAPIClient';
import { OrganitzacioManagerAPIClient } from 'services/OrganitzacioManagerAPIClient';
import { ActivitatManagerAPIClient } from 'services/ActivitatManagerAPIClient';
import { TokenInterceptor } from 'services/token.interceptor';
import { AndroidPermissionService } from 'services/AndroidPermissionService'
import { GrupManagerAPIClient } from 'services/GrupManagerAPIClient';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    UploadStudentVideoPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    VideoEditor,
    File,
    Camera,
    AndroidPermissions,
    UserManagerAPIClient,
    ActivitatManagerAPIClient,
    OrganitzacioManagerAPIClient,
    GrupManagerAPIClient,
    AndroidPermissionService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
