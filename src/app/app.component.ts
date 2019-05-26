import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DatabaseProvider } from '../providers/database/database';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;

  public pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public dbProvider: DatabaseProvider) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
    });
    dbProvider.createDatabase()
      .then(() => {
      })
      .catch(() => {
      });

    this.pages = [
      //{ title: 'Home', component: HomePage },
      //{ title: 'Login', component: 'LoginPage'},
      { title: 'Atendimentos', component: 'ProdutoPage' },
      { title: 'Contato', component: 'EmailPage' },    
      { title: 'Consulta', component: 'ApiPage'},
      { title: 'Mapa', component: 'MapPage'},  
      { title: 'Raças', component: 'CategoriaPage' },
      { title: 'Pipe', component: 'PipePage' },
      { title: 'Fechar', component: 'Fechar' }
    ];
  }

  openPage(page) {
    if (page.title == "Fechar") {
      this.platform.exitApp();
    }
    else {
      this.nav.setRoot(page.component);
    }
  }
}