/*
class Produto {
  ...
}

class Verdureira {
  ...
}
*/


/*function filtrarEPaginar<T>(
  itens: T[],
  filtro: (item: T) => boolean,
  pagina: number,
  tamanhoPagina: number
): { itens: T[]; total: number } {
  const itensFiltrados = itens.filter(filtro);

  const inicio = (pagina - 1) * tamanhoPagina;
  const fim = inicio + tamanhoPagina;

  return {
    itens: itensFiltrados.slice(inicio, fim),
    total: itensFiltrados.length
  };
}
*/

/*2.1. Change Detection e OnPush

O componente abaixo usa ChangeDetectionStrategy.OnPush, mas o nome não é exibido na tela. Identifique o problema, explique o motivo e proponha a correção — sem alterar a estratégia, sem modificar PessoaService e sem remover o setInterval.


import { ChangeDetectionStrategy, Component, Injectable, OnInit, OnDestroy } from '@angular/core';

import { of, Subscription } from 'rxjs';

import { delay } from 'rxjs/operators';


@Injectable()

class PessoaService {

/** @description Mock de uma busca em API com retorno em 0.5 segundos */

buscarPorId(id: number) {

return of({ id, nome: 'João' }).pipe(delay(500));

}

}


/*@Component({

selector: 'app-root',

providers: [PessoaService],

changeDetection: ChangeDetectionStrategy.OnPush,

template: `<h1>{{ texto }}</h1>`,

})

export class AppComponent implements OnInit, OnDestroy {

texto: string;

contador = 0;

subscriptionBuscarPessoa: Subscription;

constructor(private readonly pessoaService: PessoaService) {}


ngOnInit(): void {

this.subscriptionBuscarPessoa = this.pessoaService.buscarPorId(1).subscribe((pessoa) => {

this.texto = `Nome: ${pessoa.nome}`;

});


setInterval(() => this.contador++, 1000);

}


ngOnDestroy(): void {

/** ... */

  }
}

//Problema:
//O componente usa ChangeDetectionStrategy.OnPush. Quando texto é atualizado dentro do subscribe, o Angular não detecta automaticamente essa mudança para atualizar a tela.

//Motivo:
//Com OnPush, a detecção de mudanças não ocorre para qualquer alteração de propriedade. O componente precisa ser explicitamente marcado para verificação.

//Correção:
//Injetar ChangeDetectorRef e chamar:



/*import { switchMap, map } from 'rxjs/operators';

ngOnInit(): void {
  const pessoaId = 1;

  this.subscription = this.pessoaService.buscarPorId(pessoaId).pipe(
    switchMap(pessoa =>
      this.pessoaService.buscarQuantidadeFamiliares(pessoaId).pipe(
        map(qtd => `Nome: ${pessoa.nome} | familiares: ${qtd}`)
      )
    )
  ).subscribe(texto => {
    this.texto = texto;
  });
}

/*

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  finalize
} from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-busca',
  template: `
    <input [formControl]="buscaControl" placeholder="Pesquisar..." />

    <p *ngIf="loading">Carregando...</p>

    <ul>
      <li *ngFor="let item of resultados">
        {{ item.nome }}
      </li>
    </ul>
  `
})
export class BuscaComponent implements OnInit, OnDestroy {
  buscaControl = new FormControl('');
  resultados: any[] = [];
  loading = false;

  private destroy$ = new Subject<void>();

  constructor(private readonly pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.buscaControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(termo => {
        this.loading = true;

        return this.pessoaService.buscar(termo).pipe(
          finalize(() => {
            this.loading = false;
          })
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe(resultado => {
      this.resultados = resultado;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
