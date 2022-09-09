import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaCreateComponent } from './components/views/categoria/categoria-create/categoria-create.component';
import { CategoriaReadComponent } from './components/views/categoria/categoria-read/categoria-read.component';
import { CategoriaUpdateComponent } from './components/views/categoria/categoria-update/categoria-update.component';
import { HomeComponent } from './components/views/home/home.component';
import { LivroCreateComponent } from './components/views/livros/livro-create/livro-create.component';
import { LivroLerComponent } from './components/views/livros/livro-ler/livro-ler.component';
import { LivroUpdateComponent } from './components/views/livros/livro-update/livro-update.component';
import { LivrosReadComponent } from './components/views/livros/livros-read/livros-read.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'categorias',
    component: CategoriaReadComponent
  },
  {
    path: 'categorias/create',
    component: CategoriaCreateComponent
  },
  {
    path: 'categorias/update/:id',
    component: CategoriaUpdateComponent
  },
  {
    path: 'livros/:id',
    component: LivrosReadComponent
  },
  {
    path: 'livros/:id/add',
    component: LivroCreateComponent
  },
  {
    path: 'livros/:id/update/:bid',
    component: LivroUpdateComponent
  },
  {
    path: 'livros/:id/:bid/ler',
    component: LivroLerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
