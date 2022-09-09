import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { mensagem } from 'src/app/app.component';
import { Class } from 'src/app/components/snackTypes';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {
  id: String = ''
  catID: String = '';
  livro: Livro = {
    id: '',
    titulo: '',
    urlCapa: '',
    autor: '',
    texto: ''
  }
  constructor(private router: Router, private aRoute: ActivatedRoute, private service: LivroService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.aRoute.snapshot.paramMap.get('bid')!;
    this.catID = this.aRoute.snapshot.paramMap.get('id')!;
    this.findByID();
  }

  findByID() {
    this.service.findBookById(this.id).subscribe((res) => {
      this.livro = res;
    })
  }

  voltar() {
    this.router.navigate([`/livros/${this.catID}`])
  }

  update() {
    this.service.update(this.livro).subscribe(() => {
      this.voltar();
      mensagem("Livro atualizado com sucesso.", Class.OK, this.snack);
    }, err => {
      for (let i in err.error.messages) {
        mensagem(err.error.messages[i].message, Class.ERRO, this.snack)
      }
    })
  }

}
