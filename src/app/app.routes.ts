import { Routes } from '@angular/router';
import { Produtos } from './produtos/produtos';
import { ProdutoDetalhe } from './produto-detalhe/produto-detalhe';
import { ExibeCarrinho } from './exibe-carrinho/exibe-carrinho';

export const routes: Routes = [
    {path: "produtos", component: Produtos },
    { path: "produtos/:id", component: ProdutoDetalhe},
    { path: "", redirectTo: "/produtos", pathMatch: "full"},
    { path: 'carrinho', component: ExibeCarrinho }

];