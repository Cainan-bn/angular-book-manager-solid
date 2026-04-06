/**
 * GUIA: Como usar LivrosHttpService em um componente
 *
 * Este arquivo é apenas DIDÁTICO — não é um componente real.
 * Mostra como substituir o serviço em memória pelo serviço HTTP.
 *
 * ─────────────────────────────────────────────────────────────
 * PASSO 1: Substitua a injeção no componente
 * ─────────────────────────────────────────────────────────────
 *
 * ANTES (em memória):
 *   constructor(private controleLivros: ControleLivrosService) {}
 *
 * DEPOIS (HTTP):
 *   constructor(private livrosHttp: LivrosHttpService) {}
 *
 * ─────────────────────────────────────────────────────────────
 * PASSO 2: Adapte o carregamento para usar .subscribe()
 * ─────────────────────────────────────────────────────────────
 *
 * ANTES (síncrono — retorna array direto):
 *   ngOnInit(): void {
 *     this.livros = this.controleLivros.getLivros();
 *   }
 *
 * DEPOIS (assíncrono — Observable):
 *   ngOnInit(): void {
 *     this.livrosHttp.getLivros().subscribe({
 *       next: (livros: Livro[]) => {
 *         this.livros = livros;
 *       },
 *       error: (err: unknown) => {
 *         console.error('Erro ao carregar livros:', err);
 *         this.mensagemErro = 'Não foi possível carregar os livros. Tente novamente.';
 *       }
 *     });
 *   }
 *
 * ─────────────────────────────────────────────────────────────
 * PASSO 3: Exclusão com Observable
 * ─────────────────────────────────────────────────────────────
 *
 * ANTES:
 *   const sucesso = this.controleLivros.excluirLivro(cod);
 *   if (sucesso) { this.carregarLivros(); }
 *
 * DEPOIS:
 *   this.livrosHttp.excluirLivro(cod).subscribe({
 *     next: () => {
 *       this.exibirFeedback('Livro excluído com sucesso.', 'success');
 *       this.carregarLivros(); // Recarrega do servidor
 *     },
 *     error: (err: unknown) => {
 *       console.error('Erro ao excluir:', err);
 *       this.exibirFeedback('Erro ao excluir. Tente novamente.', 'danger');
 *     }
 *   });
 *
 * ─────────────────────────────────────────────────────────────
 * PASSO 4: Boas práticas com Observables
 * ─────────────────────────────────────────────────────────────
 *
 * ⚠️  Memory Leak: Sempre cancele subscriptions quando o componente for destruído.
 *
 * OPÇÃO A — takeUntilDestroyed (Angular 16+, recomendado):
 *   import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
 *
 *   this.livrosHttp.getLivros()
 *     .pipe(takeUntilDestroyed(this.destroyRef))
 *     .subscribe({ next: livros => this.livros = livros });
 *
 * OPÇÃO B — Subject de destruição (compatível com versões anteriores):
 *   private destroy$ = new Subject<void>();
 *
 *   ngOnInit(): void {
 *     this.livrosHttp.getLivros()
 *       .pipe(takeUntil(this.destroy$))
 *       .subscribe({ next: livros => this.livros = livros });
 *   }
 *
 *   ngOnDestroy(): void {
 *     this.destroy$.next();
 *     this.destroy$.complete();
 *   }
 *
 * ─────────────────────────────────────────────────────────────
 * PASSO 5: Subir o JSON Server
 * ─────────────────────────────────────────────────────────────
 *
 * Em um terminal separado, na raiz do projeto:
 *   npx json-server --watch db.json --port 3000
 *
 * Endpoints disponíveis:
 *   GET    http://localhost:3000/livros       → lista todos
 *   GET    http://localhost:3000/livros/1     → busca por ID
 *   POST   http://localhost:3000/livros       → cria novo
 *   PUT    http://localhost:3000/livros/1     → substitui por ID
 *   DELETE http://localhost:3000/livros/1     → remove por ID
 *
 * ─────────────────────────────────────────────────────────────
 * PRÓXIMO PASSO: Async Pipe (mais elegante que .subscribe())
 * ─────────────────────────────────────────────────────────────
 *
 * No componente:
 *   livros$: Observable<Livro[]> = this.livrosHttp.getLivros();
 *   // Sem subscribe! O template faz o trabalho.
 *
 * No template:
 *   <tr *ngFor="let livro of livros$ | async">
 *
 * O AsyncPipe faz .subscribe() e .unsubscribe() automaticamente — zero memory leak.
 * É a forma mais idiomática e segura de lidar com Observables em templates Angular.
 */

export {}; // necessário para o TypeScript reconhecer este arquivo como módulo
