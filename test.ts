class Produto {
  constructor(
    public id: number,
    public descricao: string,
    public quantidadeEstoque: number
  ) {}
}

class Verdureira {
  produtos: Produto[] = [
    new Produto(1, 'Maçã', 20),
    new Produto(2, 'Laranja', 0),
    new Produto(3, 'Limão', 20)
  ];

  private buscarProduto(id: number): Produto | undefined {
    return this.produtos.find(produto => produto.id === id);
  }

  getDescricaoProduto(produtoId: number): string {
    const produto = this.buscarProduto(produtoId);

    if (!produto) {
      return 'Produto não encontrado';
    }

    return `${produto.id} - ${produto.descricao} (${produto.quantidadeEstoque}x)`;
  }

  hasEstoqueProduto(produtoId: number): boolean {
    const produto = this.buscarProduto(produtoId);

    if (!produto) {
      return false;
    }

    return produto.quantidadeEstoque > 0;
  }
}