import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Livro } from '../../core/models/livro.model';


@Injectable({
  providedIn: 'root'
})
export class QuickViewService {

  
  private livroSelecionadoSubject = new BehaviorSubject<Livro | null>(null);

 
  readonly livroSelecionado$: Observable<Livro | null> =
    this.livroSelecionadoSubject.asObservable();

  
  abrir(livro: Livro): void {
    this.livroSelecionadoSubject.next(livro);
    
    document.body.classList.add('modal-open-qv');
  }


  fechar(): void {
    this.livroSelecionadoSubject.next(null);
    document.body.classList.remove('modal-open-qv');
  }

  
  get estaAberto(): boolean {
    return this.livroSelecionadoSubject.getValue() !== null;
  }
}
