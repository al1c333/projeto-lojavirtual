import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LojaService } from '../services/loja-service';
import { CarrinhoService } from '../services/carrinho-service';
import { Produto } from '../models/produto';
import { Carrinho } from '../carrinho/carrinho';

@Component({
  selector: 'app-inicio',
  imports: [Carrinho],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio implements OnInit {
  readonly #lojaService = inject(LojaService);
  readonly #carrinhoService = inject(CarrinhoService);
  readonly #router = inject(Router);

  produtos = signal<Produto[]>([]);

  ngOnInit(): void {
    this.#lojaService.obterProdutos().subscribe(lista => {
      this.produtos.set(lista);
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    this.#carrinhoService.adicionarItem({
      produto, quantidade: 1,
      nome: '',
      descricao: '',
      preco: 0,
      foto: ''
    });
  }

  verDetalhe(produtoId: number) {
    this.#router.navigate(['/produtos', produtoId]);
  }
}