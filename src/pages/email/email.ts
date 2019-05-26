import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage {

  public email: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public emailCtrl: EmailComposer) {
  }

  enviarEmailDinamico(){
    this.emailCtrl.open({
      to: this.email,
      isHtml: true
    });
  }
}
