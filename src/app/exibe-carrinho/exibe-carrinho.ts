import { Component, inject } from '@angular/core';
import { CarrinhoService } from '../services/carrinho-service';

@Component({
  selector: 'app-exibe-carrinho',
  imports: [],
  templateUrl: './exibe-carrinho.html',
  styleUrl: './exibe-carrinho.scss',
})
export class ExibeCarrinho {
  readonly #carrinhoService = inject(CarrinhoService);

  itens = this.#carrinhoService.itens;
  total = this.#carrinhoService.total;

  aumentar(itemId: number) {
    this.#carrinhoService.aumentarQuantidade(itemId);
  }

  diminuir(itemId: number) {
    this.#carrinhoService.diminuirQuantidade(itemId);
  }

  remover(itemId: number) {
    this.#carrinhoService.removerItem(itemId);
  }
}