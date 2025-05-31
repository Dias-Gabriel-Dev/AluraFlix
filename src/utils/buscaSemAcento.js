export function semAcentoNaBusca(str) {
    if (!str) return '';
    const mapa = {
        a: '[aáàãâä]',
        e: '[eéèêë]',
        i: '[iíìîï]',
        o: '[oóòõôö]',
        u: '[uúùûü]',
        c: '[cç]',
        A: '[AÁÀÃÂÄ]',
        E: '[EÉÈÊË]',
        I: '[IÍÌÎÏ]',
        O: '[OÓÒÕÔÖ]',
        U: '[UÚÙÛÜ]',
        C: '[CÇ]'
    };
    return str
        .split('')
        .map(l => mapa[l] || l)
        .join('');
}