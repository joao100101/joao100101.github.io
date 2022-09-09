import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { mensagem } from 'src/app/app.component';
import { Class } from 'src/app/components/snackTypes';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {
  id: String = ''
  livro: Livro = {
    titulo: '',
    urlCapa: '',
    autor: '',
    texto: ''
  }
  constructor(private router: Router, private aRoute: ActivatedRoute, private service: LivroService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }

  voltar() {
    this.router.navigate([`/livros/${this.id}`])
  }

  create() {
    this.service.create(this.livro, this.id).subscribe(() => {
      this.voltar();
      mensagem('Livro adicionado com sucesso.', Class.OK, this.snack);
    }, err => {
      for (let i in err.error.messages) {
        mensagem(err.error.messages[i].message, Class.ERRO, this.snack)
      }
    })
  }
}
