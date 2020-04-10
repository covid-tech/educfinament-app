import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';

import { UserManagerAPIClient } from 'services/UserManagerAPIClient';
import { OrganitzacioManagerAPIClient } from 'services/OrganitzacioManagerAPIClient';
import { TokenInterceptor } from 'services/token.interceptor';
import { ActivitatManagerAPIClient } from 'services/ActivitatManagerAPIClient';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    VideoEditor,
    File,
    Camera,
    UserManagerAPIClient,
    ActivitatManagerAPIClient,
    OrganitzacioManagerAPIClient,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
