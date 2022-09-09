import { Pipe, PipeTransform } from '@angular/core';
import { Livro } from './components/views/livros/livro.model';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  transform(items: Livro[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.titulo.toLocaleLowerCase().includes(searchText);
    });
  }
}