import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams, ModalController, AlertController} from 'ionic-angular';
import { ProdutoDto } from '../../Model/produtoDto';
import { ProdutoProvider } from '../../providers/produto/produto';
import { CategoriaProvider } from '../../providers/categoria/categoria';
import { CategoriaDto } from '../../Model/categoriaDto';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  nomeProduto: any;
  codigoBarra: String = "";
  produtos: Array<ProdutoDto>;
  mensagem: String = "Produtos: ";

  categorias: Array<CategoriaDto>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public produtoProvider: ProdutoProvider,
    public categoriaProvider: CategoriaProvider,
    public modalCtrl: ModalController,
    public barCode: BarcodeScanner) {


    this.montarTela();

  }

  montarTela() {
    this.carregarCategorias();
    this.carregarProdutos();
  }

  carregarCategorias() {

    this.categorias = new Array<CategoriaDto>();
    this.categoriaProvider.getAll()
      .then((categorias: Array<CategoriaDto>) => {
        this.categorias = categorias;
      })
      .catch(erro => this.alerta(erro));
  }

  carregarProdutos() {

    this.produtos = new Array<ProdutoDto>();
    this.produtoProvider.getAll(this.codigoBarra)
      .then((produtos: Array<ProdutoDto>) => {
        this.produtos = produtos;
        console.log('Produtos', this.produtos)
      })
      .catch(erro => {
        this.alerta(erro);
      });
  }

  incluir() {
    let produtoDto: ProdutoDto;
    produtoDto = new ProdutoDto();
    produtoDto.idProduto = 0;
    this.abrirTelaProduto(produtoDto, "I");
  }

  editar(produtoDto: ProdutoDto) {
    this.abrirTelaProduto(produtoDto, "A");
  }

  excluir(produtoDto: ProdutoDto) {
    let confirm = this.alertCtrl.create({
      title: 'Atenção',
      message: 'Deseja realmente excluir o produto (' + produtoDto.nomeProduto + ') ?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            return;
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.excluirProduto(produtoDto);
          }
        }
      ]
    });
    confirm.present();
  }
  
  lerCodigoBarra() {
    this.barCode.scan({
      "prompt": "Posicione para ler o código de barras.",
      "orientation": "landscape"
    }).then((res) => {
      this.codigoBarra = res.text;
      this.carregarProdutos();
      if (this.codigoBarra == null)
      {
      this.alertaCodigoDeBarra(`Código de barras: ${res.text}`);
      return;
      }
      else
      {
        this.alertaCodigoDeBarra(`Código de barras: ${res.text}`);
        this.carregarProdutos();
      }
    }).catch((err) => {
      this.alerta('Erro na leitura do código de barra!');
    })
  }

  excluirProduto(produtoDto: ProdutoDto) {
    this.produtoProvider.delete(produtoDto.idProduto)
      .then(ok => this.carregarProdutos())
      .catch(erro => this.alerta(erro));
  }

  abrirTelaProduto(produtoDto: ProdutoDto, acao: String) {
    let modal = this.modalCtrl.create('ProdutoDetalhePage',
      {
        produtoDto: produtoDto,
        acao: acao,
        categorias: this.categorias
      });

    modal.onDidDismiss(data => {

      let produto = new ProdutoDto();
      produto = data.produto;
      if (data.origem == "S") {
        this.salvar(produto);
      }

    });
    modal.present();
  }

  salvar(produto: ProdutoDto) {
    if (produto.idProduto == 0) {
      this.produtoProvider.add(produto)
        .then(ok => {
          this.carregarProdutos();
        })
        .catch(erro => this.alerta(erro));
    }
    else {

      this.produtoProvider.update(produto)
        .then(ok => {
          this.mensagem = this.produtoProvider.Mensagem;
          this.carregarProdutos();
        })
        .catch(erro => {
          this.alerta(erro);
        });
    }
  }

  pesquisar() {
    let prompt = this.alertCtrl.create({
      title: 'Atenção',
      message: "Informe a busca",
      inputs: [
        {
          name: 'Busca',
          placeholder: 'Busca'
        },
      ],
      buttons: [
        {
          text: 'Código de Barra',
          handler: data => {
            this.lerCodigoBarra();
          }
        },
        {
          text: 'Pesquisar',
          handler: data => {
            this.nomeProduto = data.nomeProduto;
            this.carregarProdutos();
          }
        }
      ]
    });
    prompt.present();
  }

  alerta(mensagem) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

  alertaCodigoDeBarra(mensagem) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }
}
