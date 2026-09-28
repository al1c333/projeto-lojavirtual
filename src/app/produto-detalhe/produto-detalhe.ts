import { Component, inject, input, OnInit, signal } from '@angular/core';
import { LojaService } from '../services/loja-service';
import { Produto } from '../models/produto';
import { CarrinhoService } from '../services/carrinho-service';
@Component({
  imports: [],
  selector: 'app-produto-detalhe',
  styleUrl: './produto-detalhe.scss',
  templateUrl: './produto-detalhe.html',
})
export class ProdutoDetalhe implements OnInit {
  id = input.required<number>();
  produto = signal<Produto | undefined>(undefined);

  readonly #lojaService = inject(LojaService);
  readonly #carrinho = inject(CarrinhoService);

  ngOnInit(): void {
    this.detalharProduto();
  }

  detalharProduto() {
    this.#lojaService.obterProdutoPorId(this.id()).subscribe(prod => {
      this.produto.set(prod);
    });
  }

  adicionar() {
    const produto = this.produto();
    if (produto) {
      const it: Omit<Produto, 'id'> = {
        produto,
        quantidade: 1,
        nome: '',
        descricao: '',
        preco: 0,
        foto: ''
      };
      this.#carrinho.adicionarItem(it);
    }
    console.log(this.#carrinho.itens());
  }
}