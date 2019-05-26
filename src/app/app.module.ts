import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http'

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { EmailComposer } from '@ionic-native/email-composer';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { SQLite} from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { ProdutoProvider } from '../providers/produto/produto';
import { CategoriaProvider } from '../providers/categoria/categoria';
import { LoginPage } from '../pages/login/login';
import { ModalComponent } from '../components/modal/modal';
import { GeoAulaProvider } from '../providers/geo-aula/geo-aula';
import { ApiProvider } from '../providers/api/api';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ModalComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    SQLite,
    File,
    Geolocation,
    BarcodeScanner,
    EmailComposer,
    DatabaseProvider,
    ProdutoProvider,
    CategoriaProvider,
    GeoAulaProvider,
    ApiProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
