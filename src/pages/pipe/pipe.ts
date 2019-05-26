import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pipe',
  templateUrl: 'pipe.html',
})
export class PipePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public toLowerCase : any = 'LETÍCIA';
}
