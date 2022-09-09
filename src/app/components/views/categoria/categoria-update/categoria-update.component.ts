import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { mensagem } from 'src/app/app.component';
import { Class } from 'src/app/components/snackTypes';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

var ID = '';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  constructor(private service: CategoriaService,private router: Router, private activeRoute: ActivatedRoute, private snack: MatSnackBar) { }

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  ngOnInit(): void {
    ID = String(this.activeRoute.snapshot.paramMap.get('id'));
    this.findById(ID)
  }

  findById(id: String){
    this.service.findById(id).subscribe((response) =>{
      this.categoria = response;
    });
  }

  navigate(path?: String):void{
    this.router.navigate([path]);
  }

  update():void{
    this.service.update(ID, this.categoria).subscribe((response) =>{
      this.router.navigate(['/categorias']);
      mensagem('Categoria atualizada com sucesso.', Class.OK, this.snack);
    }, err =>{
      console.log(err);
    });
  }
}
