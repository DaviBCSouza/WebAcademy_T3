// Interface Produto
interface Produto {
  modelo: string;
  fabricante: string;
  preco: number;
}

// Classe CarrinhoCompras
class CarrinhoCompras<T extends Produto> {
  private itens: T[] = [];

  // Método para adicionar um item ao carrinho
  adicionarItem(item: T): void {
    this.itens.push(item);
  }

  // Método para remover um item do carrinho
  removerItem(index: number): void {
    this.itens.splice(index, 1);
    this.mostrarCarrinho();
  }

  // Método para calcular o total dos preços de todos os itens no carrinho
  getTotal(): number {
    return this.itens.reduce((total, item) => total + item.preco, 0);
  }

  // Método para mostrar visualmente o carrinho na página
  mostrarCarrinho(): void {
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
class TV implements Produto {
  constructor(
    public modelo: string,
    public fabricante: string,
    public preco: number,
    public resolucao: string,
    public polegadas: number
  ) {}
}

class Celular implements Produto {
  constructor(
    public modelo: string,
    public fabricante: string,
    public preco: number,
    public memoria: string
  ) {}
}

class Bicicleta implements Produto {
  constructor(
    public modelo: string,
    public fabricante: string,
    public preco: number,
    public aro: number
  ) {}
}

// Instância do carrinho de compras
let carrinho = new CarrinhoCompras<Produto>();

// Função para alternar a exibição do formulário de adicionar produtos
function alternarForm(): void {
  let formProdutos = document.getElementById(
    "formAdicionarProdutos"
  ) as HTMLDivElement;
  let botaoExibir = document.querySelector("button") as HTMLButtonElement;

  formProdutos.style.display =
    formProdutos.style.display === "none" ? "block" : "none";

  // Modificando o comportamento do botão "Adicionar Produto ao Carrinho"
  botaoExibir.textContent =
    formProdutos.style.display === "none"
      ? "Adicionar Produto ao Carrinho"
      : "Fechar Carrinho";

  botaoExibir.classList.toggle(
    "botaoAtivo",
    formProdutos.style.display === "block"
  );
}

// Função para exibir os campos adicionais no formulário com base no tipo de produto selecionado
function mostrarCamposAdicionais() {
  let tipoProduto = (
    document.getElementById("tipoProduto") as HTMLSelectElement
  ).value;
  let camposAdicionais = document.getElementById("camposAdicionais");

  camposAdicionais!.innerHTML = "";

  switch (tipoProduto) {
    case "TV":
      camposAdicionais!.innerHTML = `
            <label for="resolucao">Resolução:</label>
            <input type="text" id="resolucao">
            <label for="polegadas">Tamanho (polegadas):</label>
            <input type="number" id="polegadas" min="1">
          `;
      break;
    case "Celular":
      camposAdicionais!.innerHTML = `
            <label for="memoria">Memória:</label>
            <input type="number" id="memoria" min="1">
          `;
      break;
    case "Bicicleta":
      camposAdicionais!.innerHTML = `
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
  let form = document.getElementById("formProdutos") as HTMLFormElement;
  let tipoProduto = (
    document.getElementById("tipoProduto") as HTMLSelectElement
  ).value;
  let modelo = (
    document.getElementById("modelo") as HTMLInputElement
  ).value.trim();
  let fabricante = (
    document.getElementById("fabricante") as HTMLInputElement
  ).value.trim();
  let preco = parseFloat(
    (document.getElementById("preco") as HTMLInputElement).value.trim()
  );

  if (!modelo || !fabricante || isNaN(preco)) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  let Produto: Produto;

  switch (tipoProduto) {
    case "TV":
      let resolucao = (
        document.getElementById("resolucao") as HTMLInputElement
      ).value.trim();
      let polegadas = parseFloat(
        (document.getElementById("polegadas") as HTMLInputElement).value.trim()
      );
      if (!resolucao || isNaN(polegadas)) {
        alert("Preencha todos os campos obrigatórios!");
        return;
      }
      Produto = new TV(
        `${modelo} ${fabricante} ${resolucao} ${polegadas}''`,
        fabricante,
        preco,
        resolucao,
        polegadas
      );
      break;
    case "Celular":
      let memoria = (
        document.getElementById("memoria") as HTMLInputElement
      ).value.trim();
      if (!memoria) {
        alert("Preencha todos os campos obrigatórios!");
        return;
      }
      Produto = new Celular(
        `${fabricante} ${modelo} ${memoria}GB`,
        fabricante,
        preco,
        memoria
      );
      break;
    case "Bicicleta":
      let aro = parseFloat(
        (document.getElementById("aro") as HTMLInputElement).value.trim()
      );
      if (isNaN(aro)) {
        alert("Preencha todos os campos obrigatórios!");
        return;
      }
      Produto = new Bicicleta(
        `${modelo} ${fabricante} Aro ${aro}`,
        fabricante,
        preco,
        aro
      );
      break;
    default:
      alert("Tipo de produto não selecionado ou inválido!");
      throw new Error("Tipo de Produto Inválido!");
  }

  carrinho.adicionarItem(Produto); // Adiciona o produto ao carrinho

  form.reset(); // Limpa os campos do formulário

  carrinho.mostrarCarrinho(); // Atualiza a exibição do carrinho na página
}
