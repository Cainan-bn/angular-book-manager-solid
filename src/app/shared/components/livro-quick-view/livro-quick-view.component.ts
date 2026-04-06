import {
  Component,
  OnInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from '../../../core/models/livro.model';
import { QuickViewService } from '../../services/quick-view.service';
import { ControleEditoraService } from '../../../core/services/controle-editora.service';


@Component({
  selector: 'app-livro-quick-view',
  templateUrl: './livro-quick-view.component.html',
  styleUrls: ['./livro-quick-view.component.css']
})
export class LivroQuickViewComponent implements OnInit, OnDestroy {

  livro: Livro | null = null;

  
  visivel: boolean = false;

  
  animando: boolean = false;

  private subscription!: Subscription;

  constructor(
    private quickViewService: QuickViewService,
    private controleEditora: ControleEditoraService
  ) {}

  ngOnInit(): void {
    
    this.subscription = this.quickViewService.livroSelecionado$.subscribe(
      (livro: Livro | null) => {
        if (livro) {
          this.livro = livro;
          this.visivel = true;
        
          setTimeout(() => (this.animando = true), 10);
        } else {
          this.fecharComAnimacao();
        }
      }
    );
  }

  ngOnDestroy(): void {
    
    this.subscription.unsubscribe();
  }

  getNomeEditora(codEditora: number): string {
    return this.controleEditora.getNomeEditora(codEditora);
  }

  fechar(): void {
    this.quickViewService.fechar();
  }

  private fecharComAnimacao(): void {
    
    this.animando = false;
    
    setTimeout(() => {
      this.visivel = false;
      this.livro = null;
    }, 300);
  }

  
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.visivel) {
      this.fechar();
    }
  }

  
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.fechar();
    }
  }
}
