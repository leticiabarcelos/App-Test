import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { File } from '@ionic-native/file';
import { App } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'modal',
  templateUrl: 'modal.html'
})
export class ModalComponent {

  public pinText: any
  public pinPath: any
  public arquivo: any
  public pinCriado: any
  public retorno: string

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public file: File,
              public app: App){

                this.pinPath = file.dataDirectory;
                this.arquivo = 'salvaPin.txt'
                this.pinCriado = navParams.get('pinText')
  }

  alerta(mensagem) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

SalvarPin(){

    if(this.pinCriado){
      if(this.pinCriado === this.pinText){
        console.log('entrou1');
        this.viewCtrl.dismiss()
        let nav = this.app.getRootNav();
        nav.setRoot('ProdutoPage');
        } else {
        console.log('entrou2');
        this.alerta('PIN inválido')
        this.viewCtrl.dismiss()
      }
    } else {
        this.file.writeFile(this.pinPath, this.arquivo, this.pinText,{replace: true}).then((res) => {
        this.alerta('PIN criado com sucesso!')
        this.viewCtrl.dismiss()
        let nav = this.app.getRootNav();
        nav.setRoot('ProdutoPage');
    }).catch((err) => {
        this.alerta('Erro ao criar o PIN!');
    })
  }
}

fecharModal(){
    this.viewCtrl.dismiss()
  }
}
