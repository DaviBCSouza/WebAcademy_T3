"use strict";
// Classe CarrinhoCompras
class CarrinhoCompras {
    constructor() {
        this.itens = [];
    }
    // Método para adicionar um item ao carrinho
    adicionarItem(item) {
        this.itens.push(item);
    }
    // Método para remover um item do carrinho
    removerItem(index) {
        this.itens.splice(index, 1);
        this.mostrarCarrinho();
    }
    // Método para calcular o total dos preços de todos os itens no carrinho
    getTotal() {
        return this.itens.reduce((total, item) => total + item.preco, 0);
    }
    // Método para mostrar visualmente o carrinho na página
    mostrarCarrinho() {
        const itemCarrinho = document.getElementById("carrinho");
        let itemTotal = document.getElementById("total");
        if (itemCarrinho && itemTotal) {
            itemCarrinho.innerHTML = "";
            this.itens.forEach((item, index) => {
                let li = document.createElement("li");
                li.textContent = `✦ ${item.modelo} - R$${item.preco}`;
                let botaoRemover = document.createElement("button");
                botaoRemover.textContent = "Remover";
                botaoRemover.onclick = () => this.removerItem(index);
                li.appendChild(botaoRemover);
                itemCarrinho.appendChild(li);
            });
            // Atualiza o total na página
            itemTotal.textContent = this.getTotal().toString();
        }
    }
}
// Defindo as classes de tipos de produtos
class TV {
    constructor(modelo, fabricante, preco, resolucao, polegadas) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.preco = preco;
        this.resolucao = resolucao;
        this.polegadas = polegadas;
    }
}
class Celular {
    constructor(modelo, fabricante, preco, memoria) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.preco = preco;
        this.memoria = memoria;
    }
}
class Bicicleta {
    constructor(modelo, fabricante, preco, aro) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.preco = preco;
        this.aro = aro;
    }
}
// Instância do carrinho de compras
let carrinho = new CarrinhoCompras();
// Função para alternar a exibição do formulário de adicionar produtos
function alternarForm() {
    let formProdutos = document.getElementById("formAdicionarProdutos");
    let botaoExibir = document.querySelector("button");
    formProdutos.style.display =
        formProdutos.style.display === "none" ? "block" : "none";
    // Modificando o comportamento do botão "Adicionar Produto ao Carrinho"
    botaoExibir.textContent =
        formProdutos.style.display === "none"
            ? "Adicionar Produto ao Carrinho"
            : "Fechar Carrinho";
    botaoExibir.classList.toggle("botaoAtivo", formProdutos.style.display === "block");
}
// Função para exibir os campos adicionais no formulário com base no tipo de produto selecionado
function mostrarCamposAdicionais() {
    let tipoProduto = document.getElementById("tipoProduto").value;
    let camposAdicionais = document.getElementById("camposAdicionais");
    camposAdicionais.innerHTML = "";
    switch (tipoProduto) {
        case "TV":
            camposAdicionais.innerHTML = `
            <label for="resolucao">Resolução:</label>
            <input type="text" id="resolucao">
            <label for="polegadas">Tamanho (polegadas):</label>
            <input type="number" id="polegadas" min="1">
          `;
            break;
        case "Celular":
            camposAdicionais.innerHTML = `
            <label for="memoria">Memória:</label>
            <input type="number" id="memoria" min="1">
          `;
            break;
        case "Bicicleta":
            camposAdicionais.innerHTML = `
            <label for="aro">Aro:</label>
            <input type="number" id="aro" min="1">
          `;
            break;
        default:
            alert("Tipo de Produto Inválido!");
    }
}
// Função para adicionar um produto ao carrinho
function adicionarCarrinho() {
    let form = document.getElementById("formProdutos");
    let tipoProduto = document.getElementById("tipoProduto").value;
    let modelo = document.getElementById("modelo").value.trim();
    let fabricante = document.getElementById("fabricante").value.trim();
    let preco = parseFloat(document.getElementById("preco").value.trim());
    if (!modelo || !fabricante || isNaN(preco)) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }
    let Produto;
    switch (tipoProduto) {
        case "TV":
            let resolucao = document.getElementById("resolucao").value.trim();
            let polegadas = parseFloat(document.getElementById("polegadas").value.trim());
            if (!resolucao || isNaN(polegadas)) {
                alert("Preencha todos os campos obrigatórios!");
                return;
            }
            Produto = new TV(`${modelo} ${fabricante} ${resolucao} ${polegadas}''`, fabricante, preco, resolucao, polegadas);
            break;
        case "Celular":
            let memoria = document.getElementById("memoria").value.trim();
            if (!memoria) {
                alert("Preencha todos os campos obrigatórios!");
                return;
            }
            Produto = new Celular(`${fabricante} ${modelo} ${memoria}GB`, fabricante, preco, memoria);
            break;
        case "Bicicleta":
            let aro = parseFloat(document.getElementById("aro").value.trim());
            if (isNaN(aro)) {
                alert("Preencha todos os campos obrigatórios!");
                return;
            }
            Produto = new Bicicleta(`${modelo} ${fabricante} Aro ${aro}`, fabricante, preco, aro);
            break;
        default:
            alert("Tipo de produto não selecionado ou inválido!");
            throw new Error("Tipo de Produto Inválido!");
    }
    carrinho.adicionarItem(Produto); // Adiciona o produto ao carrinho
    form.reset(); // Limpa os campos do formulário
    carrinho.mostrarCarrinho(); // Atualiza a exibição do carrinho na página
}
