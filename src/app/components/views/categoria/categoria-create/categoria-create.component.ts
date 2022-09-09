import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { mensagem } from 'src/app/app.component';
import { Class } from 'src/app/components/snackTypes';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private route: Router, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  voltar() {
    this.route.navigate(['categorias'])
  }

  create(): void {

    this.service.create(this.categoria).subscribe((resposta) => {
      mensagem('Categoria criada com sucesso!', Class.OK, this.snack)
      this.route.navigate(['categorias'])
    }, err => {
      for (let i in err.error.messages) {
        mensagem(err.error.messages[i].message, Class.ERRO, this.snack)
      }
    });
  }
}
