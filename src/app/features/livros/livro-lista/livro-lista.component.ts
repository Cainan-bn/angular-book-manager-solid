import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from '../../../core/models/livro.model';
import { ControleLivrosService } from '../../../core/services/controle-livros.service';
import { ControleEditoraService } from '../../../core/services/controle-editora.service';
import { QuickViewService } from '../../../shared/services/quick-view.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {

  protected todosLivros: Livro[] = [];
  livrosFiltrados: Livro[] = [];
  termoBusca: string = '';
  mensagemFeedback: string = '';
  tipoFeedback: 'success' | 'danger' | '' = '';

  constructor(
    private controleLivros: ControleLivrosService,
    private controleEditora: ControleEditoraService,
    private router: Router,
    private quickViewService: QuickViewService   // ← injetado
  ) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    this.todosLivros = this.controleLivros.getLivros();
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
    const termo = this.termoBusca.trim().toLowerCase();
    if (!termo) {
      this.livrosFiltrados = [...this.todosLivros];
      return;
    }
    this.livrosFiltrados = this.todosLivros.filter((livro: Livro) => {
      const nomeEditora = this.controleEditora.getNomeEditora(livro.codEditora).toLowerCase();
      return (
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autores.some((a: string) => a.toLowerCase().includes(termo)) ||
        nomeEditora.includes(termo)
      );
    });
  }

  limparBusca(): void {
    this.termoBusca = '';
    this.aplicarFiltro();
  }

  /**
   * Abre o Quick View para o livro clicado.
   * Delega ao serviço — o componente não sabe COMO o modal funciona,
   * só sabe que deve pedir ao serviço para abri-lo. (SOLID: SRP)
   */
  abrirQuickView(livro: Livro): void {
    this.quickViewService.abrir(livro);
  }

  getNomeEditora(codEditora: number): string {
    return this.controleEditora.getNomeEditora(codEditora);
  }

  getAutores(autores: string[]): string {
    return autores.join('; ');
  }

  navegarParaCadastro(): void {
    this.router.navigate(['/livros/novo']);
  }

  navegarParaEdicao(codLivro: number): void {
    this.router.navigate(['/livros/editar', codLivro]);
  }

  excluirLivro(codLivro: number, tituloLivro: string): void {
    const confirmar = window.confirm(
      `Deseja realmente excluir o livro "${tituloLivro}"?\nEsta ação não pode ser desfeita.`
    );
    if (!confirmar) return;

    const sucesso = this.controleLivros.excluirLivro(codLivro);
    if (sucesso) {
      this.exibirFeedback(`Livro "${tituloLivro}" excluído com sucesso.`, 'success');
      this.carregarLivros();
    } else {
      this.exibirFeedback('Erro ao excluir o livro. Tente novamente.', 'danger');
    }
  }

  trackByLivroCod(index: number, livro: Livro): number {
    return livro.codLivro;
  }

  private exibirFeedback(mensagem: string, tipo: 'success' | 'danger'): void {
    this.mensagemFeedback = mensagem;
    this.tipoFeedback = tipo;
    setTimeout(() => {
      this.mensagemFeedback = '';
      this.tipoFeedback = '';
    }, 4000);
  }
}
