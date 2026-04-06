import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../../models/livro.model';


@Injectable({
  providedIn: 'root'
})
export class LivrosHttpService {

  
  private readonly apiUrl = 'http://localhost:3000/livros';

  
  constructor(private http: HttpClient) {}

 
  getLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  getLivroPorCodigo(cod: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${cod}`);
  }

  
  incluirLivro(livro: Omit<Livro, 'codLivro'>): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro);
  }

  
  atualizarLivro(livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/${livro.codLivro}`, livro);
  }

  
  excluirLivro(codLivro: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codLivro}`);
  }
}
