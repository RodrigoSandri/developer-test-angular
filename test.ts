/*
class Produto {
  ...
}

class Verdureira {
  ...
}
*/


function filtrarEPaginar<T>(
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