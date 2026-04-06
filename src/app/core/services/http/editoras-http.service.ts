import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editora } from '../../models/editora.model';

@Injectable({
  providedIn: 'root'
})
export class EditorasHttpService {

  private readonly apiUrl = 'http://localhost:3000/editoras';

  constructor(private http: HttpClient) {}

  getEditoras(): Observable<Editora[]> {
    return this.http.get<Editora[]>(this.apiUrl);

    
  }

  incluirEditora(nomeEditora: string): Observable<Editora> {
    return this.http.post<Editora>(this.apiUrl, { nomeEditora });
  }

  excluirEditora(codEditora: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codEditora}`);
  }
}
