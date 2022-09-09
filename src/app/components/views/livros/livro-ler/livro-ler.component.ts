import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-ler',
  templateUrl: './livro-ler.component.html',
  styleUrls: ['./livro-ler.component.css']
})
export class LivroLerComponent implements OnInit {
  id: String = '';
  catID: String = '';
  livro: Livro = {
    id: '',
    titulo: '',
    urlCapa: '',
    autor: '',
    texto: ''
  }
  constructor(private router: Router, private aRoute: ActivatedRoute, private service: LivroService) { }

  ngOnInit(): void {
    this.id = this.aRoute.snapshot.paramMap.get('bid')!;
    this.catID = this.aRoute.snapshot.paramMap.get('id')!;
    this.find();
  }

  find() {
    this.service.findBookById(this.id).subscribe((res) => {
      this.livro = res;
    })
  }

  voltar() {
    this.router.navigate([`/livros/${this.catID}`])
  }
}
