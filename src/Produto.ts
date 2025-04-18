import { Valida_Caractere, Valida_Estoque, Valida_Preco } from "../consts";

// src/produto.ts
class Produto {
    nome: string = "";
    preco: number = 0;
    estoque: number = 0; 
    precoPromocional: number | null = null;
    descontoPercentual: number | null = null;
    constructor(nome: string, preco: number, estoque: number) {
      if(nome.length < 3 ){
        throw new Error(Valida_Caractere)
      }
      this.nome = nome;
      if(preco > 0){
        this.preco = preco;
      } else if( preco < 0){
        this.preco = 0
        throw new Error(Valida_Preco)
      }
      
      if(estoque >= 0){

        this.estoque = estoque;

      } else{
        this.estoque = 0
        throw new Error(Valida_Estoque)
      }

    }
  
    definirPrecoPromocional(novoPreco: number): void {
      if (novoPreco < this.preco && novoPreco >= 0) {
        this.precoPromocional = novoPreco;
      } else {
        this.precoPromocional = null;
      }
    }
  
    obterPrecoFinal(): number {
      
      let precoBase = this.precoPromocional ?? this.preco;
    
      
      if (this.descontoPercentual != null) {
        const desconto = (precoBase * this.descontoPercentual) / 100;
        precoBase -= desconto;
      }
    
      return precoBase;
    }



  
    vender(quantidade: number): string {
      if (quantidade <= 0) {
        return "Quantidade inválida.";
      }
      if (quantidade > this.estoque) {
        return "Estoque insuficiente.";
      }
      this.estoque -= quantidade;
      return `Venda de ${quantidade} unidades de ${this.nome} realizada. Estoque restante: ${this.estoque}.`;
    }
  
    adicionarEstoque(quantidade: number): string {
      if (quantidade <= 0) {
        return "Quantidade inválida.";
      }
      this.estoque += quantidade;
      return `Adicionado ${quantidade} unidades de ${this.nome} ao estoque. Novo estoque: ${this.estoque}.`;
    }

    aplicarDesconto(percentual: number) : string {

    if(percentual <= 0 || percentual > 100){
      this.descontoPercentual = null;
      return "Percentual de desconto inválido";
    }
    this.descontoPercentual = percentual;

    return `Desconto de ${percentual}% aplicado.`


    }



  }

  
  export { Produto };