import { Component, inject, signal } from '@angular/core';
import { LojaService } from '../services/loja-service';
import { Produto } from '../models/produto';

@Component({
  imports: [],
  selector: 'app-produtos',
  styleUrl: './produtos.scss',
  templateUrl: './produtos.html',
})
export class Produtos {
  produtos = signal<Produto[]>([]);

  lojaService = inject(LojaService);

  constructor() {
    this.lojaService.obterProdutos().subscribe((res: Produto[]) => {
      this.produtos.set(res);
    });
  }
}