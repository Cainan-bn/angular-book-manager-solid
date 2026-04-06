import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../../../core/models/livro.model';
import { Editora } from '../../../core/models/editora.model';
import { ControleLivrosService } from '../../../core/services/controle-livros.service';
import { ControleEditoraService } from '../../../core/services/controle-editora.service';


@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})
export class LivroDadosComponent implements OnInit {

  livroForm: Omit<Livro, 'codLivro'> = {
    titulo: '',
    resumo: '',
    autores: [],
    codEditora: 0,
    anoPublicacao: new Date().getFullYear()
  };

  autoresTexto: string = '';
  editoras: Editora[] = [];
  mensagemErro: string = '';

  
  codLivroEditando: number | null = null;

  get modoEdicao(): boolean {
    return this.codLivroEditando !== null;
  }

  constructor(
    private controleLivros: ControleLivrosService,
    private controleEditora: ControleEditoraService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editoras = this.controleEditora.getEditoras();
    this.detectarModo();
  }

  private detectarModo(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) return; 

    const cod = Number(idParam);

    if (isNaN(cod)) {
      console.warn('LivroDadosComponent: ID inválido na URL:', idParam);
      this.router.navigate(['/livros']);
      return;
    }

    const livroExistente = this.controleLivros.getLivroPorCodigo(cod);

    if (!livroExistente) {
      console.warn('LivroDadosComponent: livro não encontrado para edição. ID:', cod);
      this.router.navigate(['/livros']);
      return;
    }

    
    this.codLivroEditando = cod;
    this.livroForm = {
      titulo: livroExistente.titulo,
      resumo: livroExistente.resumo,
      autores: [...livroExistente.autores], 
      codEditora: livroExistente.codEditora,
      anoPublicacao: livroExistente.anoPublicacao
    };
    this.autoresTexto = livroExistente.autores.join(', ');
  }

  salvarLivro(): void {
    if (!this.livroForm.titulo.trim()) {
      this.mensagemErro = 'O título do livro é obrigatório.';
      return;
    }
    if (this.livroForm.codEditora === 0) {
      this.mensagemErro = 'Selecione uma editora.';
      return;
    }
    if (!this.autoresTexto.trim()) {
      this.mensagemErro = 'Informe pelo menos um autor.';
      return;
    }

    this.livroForm.autores = this.autoresTexto
      .split(',')
      .map((a: string) => a.trim())
      .filter((a: string) => a.length > 0);

    this.livroForm.codEditora = Number(this.livroForm.codEditora);

    this.modoEdicao ? this.executarEdicao() : this.executarCadastro();
  }

  private executarCadastro(): void {
    const novoLivro = this.controleLivros.incluirLivro(this.livroForm);
    novoLivro
      ? this.router.navigate(['/livros'])
      : (this.mensagemErro = 'Erro ao salvar o livro. Verifique os dados e tente novamente.');
  }

  private executarEdicao(): void {
    const livroAtualizado = new Livro(
      this.codLivroEditando!,
      this.livroForm.titulo,
      this.livroForm.resumo,
      this.livroForm.autores,
      this.livroForm.codEditora,
      this.livroForm.anoPublicacao
    );

    const sucesso = this.controleLivros.atualizarLivro(livroAtualizado);
    sucesso
      ? this.router.navigate(['/livros'])
      : (this.mensagemErro = 'Erro ao atualizar o livro. Tente novamente.');
  }

  cancelar(): void {
    this.router.navigate(['/livros']);
  }

  limparErro(): void {
    this.mensagemErro = '';
  }
}
