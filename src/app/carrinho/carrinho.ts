import { Component, inject } from '@angular/core';
import { CarrinhoService } from '../services/carrinho-service';

@Component({
  selector: 'app-carrinho',
  imports: [],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho {
  readonly #carrinhoService = inject(CarrinhoService);

  quantidadeTotal = this.#carrinhoService.quantidadeTotal;
}