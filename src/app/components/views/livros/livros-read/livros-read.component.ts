import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { mensagem } from 'src/app/app.component';
import { Class } from 'src/app/components/snackTypes';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
var ID = '';
@Component({
  selector: 'app-livros-read',
  templateUrl: './livros-read.component.html',
  styleUrls: ['./livros-read.component.css']
})

export class LivrosReadComponent implements OnInit {
  searchText: string = '';
  pesquisar: boolean = false;

  menu: boolean = false;
  carregado: boolean = false;
  ID: String = ''
  url: String = 'https://images-na.ssl-images-amazon.com/images/I/51nNwwVSclL.jpg';

  public livros: Livro[] = [];
  constructor(private service: LivroService, private routeActive: ActivatedRoute, private dialog: MatDialog) {
    this.ID = String(this.routeActive.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.findAll();

  }


  togglePesquisa() {
    this.pesquisar = !this.pesquisar;
    this.searchText = '';
  }





  findAll() {
    this.service.findAllByCategory(this.ID).subscribe((resposta) => {
      this.livros = resposta;
      this.carregado = true;
    })

  }


  criarLivros(book: Livro) {
    let container = document.getElementById('container');

    let bloco = document.createElement('div');
    bloco.classList.add('bloco');

    container?.appendChild(bloco);

    let photo = document.createElement('div');
    photo.classList.add('photo');
    photo.style.backgroundImage = `url('${book.urlCapa}')`;
    photo.style.backgroundSize = 'cover';

    bloco.appendChild(photo);

    let desc = document.createElement('div');
    desc.classList.add('desc');
    bloco.appendChild(desc);
  }


  isCarregadoAndVazio(): boolean {
    return this.livros.length == 0 && this.carregado;
  }


  getImg(livro: Livro): String {
    const img = new Image();
    img.src = String(livro.urlCapa);
    img.onerror = () => {
      livro.urlCapa = 'https://img.freepik.com/premium-psd/book-cover-mockup-template_68185-415.jpg?w=2000'
    }
    return livro.urlCapa;
  }

  delete(id: any) {
    ID = id;
    this.openDialog('1ms', '1ms');
  }

  //Abre uma caixa de dialogo para confirmar se deseja ou não deletar a categoria
  //O conteudo mostrado na caixa de dialogo é o que está no Componente CategoriaDelete
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LivroDeleteComponent, {
      width: '40rem',
      panelClass: "custom",
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}



@Component({
  selector: 'app-livro-delete',
  templateUrl: '../livro-delete/livro-delete.component.html',
  styleUrls: ['../livro-delete/livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  constructor(private dialog: MatDialog, private service: LivroService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  close() {
    this.dialog.closeAll();
  }

  delete() {
    this.service.delete(ID).subscribe(() => {
      this.close();
      document.location.reload();
      mensagem("Produto deletado com sucesso.", Class.OK, this.snack)
    }, err => {
      this.close();
      for (let i in err.error.messages) {
        mensagem(err.error.messages[i].message, Class.ERRO, this.snack)
      }
    })
  }


}
