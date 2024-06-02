import {
  FavoritosProvider,
  useProdutoFavorito,
} from "@/app/State/FavoritosProvider";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import { mockProdutos } from "@/app/mocks/produtos";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemFavorito from "./ItemFavorito";

jest.mock("../../State/FavoritosProvider", () => ({
  ...jest.requireActual("../../State/FavoritosProvider"),
  useProdutoFavorito: jest.fn(),
}));

describe("ItemFavorito", () => {
  it("should correctly render favorite product information", () => {
    const useProdutoFavoritoMock = useProdutoFavorito as jest.Mock;
    useProdutoFavoritoMock.mockReturnValue(false);

    const itemFavorito = mockProdutos[0];
    const { nome, descricao, fotos, preco, desconto } = itemFavorito;

    const valorComDesconto = calculaValorComPorcentagemDeDesconto(
      Number(preco),
      desconto
    ).toFixed(2);

    render(
      <FavoritosProvider>
        <table>
          <tbody>
            <ItemFavorito itemFavorito={itemFavorito} setFavoritos={() => {}} />
          </tbody>
        </table>
      </FavoritosProvider>
    );

    expect(screen.getByText(nome)).toBeInTheDocument();
    expect(screen.getByText(descricao)).toBeInTheDocument();
    expect(screen.getByText(`R$ ${valorComDesconto}`)).toBeInTheDocument();
    expect(screen.getByText(`${desconto}%`)).toBeInTheDocument();
    expect(screen.getByAltText(fotos[0].titulo)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call the remove function when clicking the 'Remover' button", async () => {
    const setFavoritos = jest.fn();
    const useProdutoFavoritoMock = useProdutoFavorito as jest.Mock;
    useProdutoFavoritoMock.mockReturnValue({
      favoritos: mockProdutos[0],
      setFavoritos,
    });
    const itemFavorito = mockProdutos[0];

    render(
      <FavoritosProvider>
        <table>
          <tbody>
            <ItemFavorito
              itemFavorito={itemFavorito}
              setFavoritos={setFavoritos}
            />
          </tbody>
        </table>
      </FavoritosProvider>
    );

    const botaoRemover = screen.getByRole("button", {
      name: /Remover/i,
    });

    await userEvent.click(botaoRemover);

    expect(setFavoritos).toHaveBeenCalledTimes(1);

    setFavoritos.mockImplementation((updateFn) => {
      const favoritos = [itemFavorito];
      const novosFavoritos = updateFn(favoritos);
      expect(novosFavoritos).not.toContain(itemFavorito);
    });

    await userEvent.click(botaoRemover);
  });

  it("should render correctly when the product does not have a discount", () => {
    const itemFavoritoSemDesconto = { ...mockProdutos[0], desconto: 0 };
    const { nome, descricao, fotos, preco } = itemFavoritoSemDesconto;

    render(
      <FavoritosProvider>
        <table>
          <tbody>
            <ItemFavorito
              itemFavorito={itemFavoritoSemDesconto}
              setFavoritos={() => {}}
            />
          </tbody>
        </table>
      </FavoritosProvider>
    );

    expect(screen.getByText(nome)).toBeInTheDocument();
    expect(screen.getByText(descricao)).toBeInTheDocument();
    expect(
      screen.getByText(`R$ ${Number(preco).toFixed(2)}`)
    ).toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
    expect(screen.getByAltText(fotos[0].titulo)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render correctly when the product has multiple images", () => {
    const itemFavoritoComMultiplasImagens = {
      ...mockProdutos[0],
      fotos: [
        {
          src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/notebook-2.jpg",
          titulo: "notebook-4",
        },
        {
          src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/smartwatch-2.jpg",
          titulo: "smartwatch-3",
        },
      ],
    };
    const { nome, descricao, fotos, preco, desconto } =
      itemFavoritoComMultiplasImagens;

    const precoComDesconto = calculaValorComPorcentagemDeDesconto(
      Number(preco),
      desconto
    ).toFixed(2);

    render(
      <FavoritosProvider>
        <table>
          <tbody>
            <ItemFavorito
              itemFavorito={itemFavoritoComMultiplasImagens}
              setFavoritos={() => {}}
            />
          </tbody>
        </table>
      </FavoritosProvider>
    );

    expect(screen.getByText(nome)).toBeInTheDocument();
    expect(screen.getByText(descricao)).toBeInTheDocument();
    expect(screen.getByText(`R$ ${precoComDesconto}`)).toBeInTheDocument();
    expect(screen.getByText(`${desconto}%`)).toBeInTheDocument();
    expect(screen.getByAltText(fotos[0].titulo)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
