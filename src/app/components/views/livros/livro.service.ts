import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient) { }


  findAllByCategory(id: String): Observable<Livro[]> {
    const url = `${this.baseUrl}livros?categoria=${id}`
    return this.http.get<Livro[]>(url);
  }

  findBookById(id: String): Observable<Livro> {
    const url = `${this.baseUrl}livros/${id}`;
    return this.http.get<Livro>(url);
  }

  create(livro: Livro, cat_id: String): Observable<Livro>{
    const url = `${this.baseUrl}livros?categoria=${cat_id}`
    return this.http.post<Livro>(url, livro);
  }

  delete(id: String): Observable<void>{
    const url = `${this.baseUrl}livros/${id}`

    return this.http.delete<void>(url);
  }

  update(livro: Livro): Observable<Livro>{
    const url = `${this.baseUrl}livros/${livro.id}`

    return this.http.put<Livro>(url, livro);
  }
}
