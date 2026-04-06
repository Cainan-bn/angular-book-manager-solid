import { Injectable } from '@angular/core';
import { Livro } from '../models/livro.model';


@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {

  private livros: Livro[] = [
    new Livro(1, 'Clean Code', 'Práticas para escrever código limpo e manutenível.', ['Robert C. Martin'], 1, 2008),
    new Livro(2, 'The Pragmatic Programmer', 'Guia prático de carreira e boas práticas de desenvolvimento.', ['David Thomas', 'Andrew Hunt'], 3, 1999),
    new Livro(3, 'Angular: Do zero à produção', 'Guia completo do framework Angular moderno.', ['Loiane Groner'], 2, 2023),
    new Livro(4, 'You Don\'t Know JS', 'Série aprofundada sobre os fundamentos do JavaScript.', ['Kyle Simpson'], 3, 2015),
  ];

 
  private get proximoCod(): number {
    if (this.livros.length === 0) return 1;
    return Math.max(...this.livros.map((l: Livro) => l.codLivro)) + 1;
  }

  getLivros(): Livro[] {
    return [...this.livros];
  }

  getLivroPorCodigo(cod: number): Livro | undefined {
    return this.livros.find((l: Livro) => l.codLivro === cod);
  }

  
  incluirLivro(dadosLivro: Omit<Livro, 'codLivro'>): Livro | null {
    
    if (!dadosLivro.titulo.trim()) {
      console.warn('ControleLivrosService: título é obrigatório.');
      return null;
    }
    if (dadosLivro.codEditora <= 0) {
      console.warn('ControleLivrosService: editora inválida.');
      return null;
    }

    const novoLivro = new Livro(
      this.proximoCod,
      dadosLivro.titulo.trim(),
      dadosLivro.resumo,
      dadosLivro.autores,
      dadosLivro.codEditora,
      dadosLivro.anoPublicacao
    );

    this.livros.push(novoLivro);
    return novoLivro;
  }

  excluirLivro(codLivro: number): boolean {
    const indice = this.livros.findIndex((l: Livro) => l.codLivro === codLivro);

    if (indice === -1) {
      console.warn(`ControleLivrosService: livro com código ${codLivro} não encontrado.`);
      return false;
    }

    this.livros.splice(indice, 1);
    return true;
  }

  atualizarLivro(livroAtualizado: Livro): boolean {
    const indice = this.livros.findIndex((l: Livro) => l.codLivro === livroAtualizado.codLivro);

    if (indice === -1) {
      console.warn(`ControleLivrosService: livro com código ${livroAtualizado.codLivro} não encontrado para atualização.`);
      return false;
    }

    this.livros[indice] = { ...livroAtualizado };
    return true;
  }
}
