import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivroListaComponent } from './features/livros/livro-lista/livro-lista.component';
import { LivroDadosComponent } from './features/livros/livro-dados/livro-dados.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/livros',
    pathMatch: 'full'
  },
  {
    path: 'livros',
    component: LivroListaComponent
  },
  {
    path: 'livros/novo',
    component: LivroDadosComponent
  },
  {
    
    path: 'livros/editar/:id',
    component: LivroDadosComponent  
  },
  {
    path: '**',
    redirectTo: '/livros'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
