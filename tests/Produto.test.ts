// src/produto.test.ts
import { Valida_Caractere, Valida_Estoque, Valida_Preco } from "../consts";
import { Produto } from "../src/Produto";

describe('Classe Produto', () => {
    let produto: Produto;

    beforeEach(() => {
        produto = new Produto('Camiseta', 25.99, 50);
    });

    describe('Produto', () => {

        it('Deve criar um produto com nome, preço e estoque corretos', () => {
            expect(produto.nome).toBe('Camiseta');
            expect(produto.preco).toBe(25.99);
            expect(produto.estoque).toBe(50);
        });

        it("Deve criar um produto com um nome válido", () =>{

            const produtoTeste = new Produto("Laptop",0,0)

            expect(produtoTeste.nome).toBe("Laptop")

        });

        it("O nome do produto deve possuir pelo menos 3 caracteres na sua criação através do construtor", ()=>{

            expect(()=>{

            new Produto("TV",0,0);

            }).toThrow(Valida_Caractere)
        });

        it("Deve conseguir cadastrar um produto com preço positivo", ()=>{

            const produtoTeste = new Produto("Laptop", 50, 0)

            expect(produtoTeste.preco).toBe(50)

        })

        it("Deve manter o zero e retornar erro ao tentar cadastrar produto com preço negativo", ()=>{
        
            expect(()=>{
                const produtoTeste = new Produto("Laptop", -10, 0)
                expect(produtoTeste.preco).toBe(0);
            }).toThrow(Valida_Preco);
            
        })

        it("Deve permitir cadastrar produto com estoque maior ou igual a 0", ()=>{

            const produtoTeste = new Produto("Laptop", 10, 5)
            const produtoTeste2 = new Produto("Ventilador", 15, 0)

            expect(produtoTeste.estoque).toBe(5)
            expect(produtoTeste2.estoque).toBe(0)

        })

        it("Não deve permitir cadastrar produto com estoque menor que 0", ()=>{

            expect(()=>{

                const produtoTeste = new Produto("Laptop", 10, -1)

            }).toThrow(Valida_Estoque)

        })

        it("Deve ter preço promocional nulo na sua criação", ()=>{

            const produtoTeste = new Produto("Laptop", 20, 0)

            expect(produtoTeste.precoPromocional).toBeNull();

        })

    }
    );

    describe('Método definirPrecoPromocional', () => {

        test('Deve definir o preço promocional casos seja menor que o preço original e não negativo', () => {

        const produtoTeste = new Produto("Notebook", 100, 0)
        produtoTeste.definirPrecoPromocional(20.00);
            
        expect(produtoTeste.precoPromocional).toBe(20.00); 
        });

        test('Não deve definir o preço promocional se for maior ou igual ao preço original', () => {
            
            const produtoTeste = new Produto("Computador", 100, 0)
            produtoTeste.definirPrecoPromocional(150);

            expect(produtoTeste.precoPromocional).toBeNull();

        });

        test('Não deve definir o preço promocional se o novo preço for negativo', () => {
            
            const produtoTeste = new Produto("Computador", 100, 0)
            produtoTeste.definirPrecoPromocional(-150)
            expect(produtoTeste.precoPromocional).toBeNull(); //substituir por asserção correta
        });
    });

    describe('Método obterPrecoFinal', () => {
        test('Deve retornar o preço promocional se estiver definido', () => {

            const produtoTeste = new Produto("Televisão", 100, 0)

            produtoTeste.definirPrecoPromocional(20.00)
            const precoFinal = produtoTeste.obterPrecoFinal()

            expect(precoFinal).toBe(20.00);
            ; //substituir por asserção correta
        });

        test('deve retornar o preço original se o preço promocional não estiver definido', () => {
            const produtoTeste = new Produto("Televisao", 1000, 0)

            const precoFinal = produtoTeste.obterPrecoFinal()

            expect(precoFinal).toBe(1000);
        });
    });

    describe('Método vender', () => {
        test('Deve realizar a venda e atualizar o estoque corretamente', () => {
            // Montar cenário
            const produtoTeste = new Produto("Cadeira", 20, 10)
            
            produtoTeste.vender(5)

            expect(produtoTeste.estoque).toBe(5)

        });

        test('Deve retornar "Estoque insuficiente." se a quantidade vendida for maior que o estoque', () => {
            const mensagem = produto.vender(60);

            expect(produto.estoque).toBe(50);
            expect(mensagem).toBe('Estoque insuficiente.');
        });

        test('Deve retornar "Quantidade inválida." se a quantidade vendida for zero ou negativa', () => {
            // Montar cenário
            const produtoTeste = new Produto("Pote", 10, 0)

            const resultadoZerado = produtoTeste.vender(0)
            const resultadoNegativo = produtoTeste.vender(-2)

            expect(resultadoZerado).toBe("Quantidade inválida.")
            expect(resultadoNegativo).toBe("Quantidade inválida.")

        });
    });

    describe('Método adicionarEstoque', () => {
        test('Deve adicionar a quantidade ao estoque corretamente', () => {
            const mensagem = produto.adicionarEstoque(20);

            expect(produto.estoque).toBe(70);
            expect(mensagem).toBe('Adicionado 20 unidades de Camiseta ao estoque. Novo estoque: 70.');
        });

        test('Deve retornar "Quantidade inválida." se a quantidade adicionada for negativa', () => {
            // Montar cenário
            const produtoTeste = new Produto("Batatas", 10, 50)
            const mensagem = produtoTeste.adicionarEstoque(-20)

            expect(mensagem).toBe("Quantidade inválida.")

        });
    });
});