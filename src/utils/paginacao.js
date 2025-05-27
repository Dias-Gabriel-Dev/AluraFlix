export function paginacao(query) {
    const pageValue = parseInt(query.page);
    const pagina = pageValue > 0 ? pageValue : 1;
    let limite = parseInt(query.limit);
    limite = isNaN(limite) ? 5 : Math.max(1, Math.min(limite, 10));
    const proxima = (pagina - 1) * limite;
    return { pagina, limite, proxima };
}