import { Injectable } from '@angular/core';
import { Editora } from '../models/editora.model';


@Injectable({
  providedIn: 'root'
})
export class ControleEditoraService {

  
  private editoras: Editora[] = [
    new Editora(1, 'Novatec'),
    new Editora(2, 'Casa do Código'),
    new Editora(3, 'O\'Reilly'),
    new Editora(4, 'Packt Publishing'),
  ];

  
  private proximoCod: number = 5;

  
  getEditoras(): Editora[] {
    return [...this.editoras];
  }

  
  getEditoraPorCodigo(cod: number): Editora | undefined {
    return this.editoras.find((e: Editora) => e.codEditora === cod);
  }

  
  getNomeEditora(cod: number): string {
    const editora = this.getEditoraPorCodigo(cod);
    return editora ? editora.nomeEditora : 'Editora não encontrada';
  }

  incluirEditora(nomeEditora: string): Editora | null {
    
    const nomeTrimmed = nomeEditora.trim();
    if (!nomeTrimmed) {
      console.warn('ControleEditoraService: tentativa de incluir editora sem nome.');
      return null;
    }

    const novaEditora = new Editora(this.proximoCod++, nomeTrimmed);
    this.editoras.push(novaEditora);
    return novaEditora;
  }

  excluirEditora(codEditora: number): boolean {
    const indice = this.editoras.findIndex((e: Editora) => e.codEditora === codEditora);

    if (indice === -1) {
      console.warn(`ControleEditoraService: editora com código ${codEditora} não encontrada.`);
      return false;
    }

    this.editoras.splice(indice, 1);
    return true;
  }
}
