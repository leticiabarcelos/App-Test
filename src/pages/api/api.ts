import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider} from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-api',
  templateUrl: 'api.html',
})
export class ApiPage {
  address:string="";
  cep;
  errorMessage;
    constructor(public navCtrl: NavController, private rest:ApiProvider) {
      
    }
  
    GetAddress(){  
      this.rest.GetAddress(this.cep)
      
      .subscribe(
          (data)=>{
          this.address = data;
          console.log(data);
          if(data.logradouro == ""){
              this.errorMessage = "Cidade com CEP único!"
            }
          },
          (error)=>{
            this.errorMessage ="Cep inválido!";
          })
    }
  }