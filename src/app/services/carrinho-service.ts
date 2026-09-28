import { Injectable, signal, computed } from '@angular/core';
import { Produto } from '../models/produto';
import { Service } from '@angular/core';

@Service()

export class CarrinhoService {
  readonly #itens = signal<Produto[]>([]);
  readonly itens = this.#itens.asReadonly();

    readonly quantidadeTotal = computed(() =>
    this.#itens().reduce((total, item) => total + item.quantidade, 0));
  total: any;

  adicionarItem(item: Omit<Produto, 'id'>): boolean {
    const existente = this.#itens().find(i => i.produto.id === item.produto.id);

    if (existente) {
      return this.aumentarQuantidade(existente.id);
    }

    const novoItem: Produto = {
      id: Date.now(),
      produto: item.produto,
      quantidade: item.quantidade,
      nome: '',
      descricao: '',
      preco: 0,
      foto: ''
    };

    this.#itens.update(itens => [...itens, novoItem]);
    return true;
  }

  aumentarQuantidade(itemId: number): boolean {
    let alterado = false;
    this.#itens.update(itens =>
      itens.map(item => {
        if (item.id === itemId) {
          alterado = true;
          return { ...item, quantidade: item.quantidade + 1 };
        }
        return item;
      })
    );
    return alterado;
  }

  diminuirQuantidade(itemId: number): boolean {
    let alterado = false;
    this.#itens.update(itens =>
      itens
        .map(item => {
          if (item.id === itemId) {
            alterado = true;
            return { ...item, quantidade: item.quantidade - 1 };
          }
          return item;
        })
        .filter(item => item.quantidade > 0)
    );
    return alterado;
  }

  removerItem(itemId: number): boolean {
    const tinhaItem = this.#itens().some(item => item.id === itemId);
    this.#itens.update(itens => itens.filter(item => item.id !== itemId));
    return tinhaItem;
  }

  obterTotal(): number {
    return this.#itens().reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0
    );
  }
}