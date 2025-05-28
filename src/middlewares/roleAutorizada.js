export function roleAutorizada(...rolesPermitidos) {
    return (req, res, next) => {
        if (!req.usuario || !rolesPermitidos.includes(req.usuario.role)) {
            return res.status(403).json({ message: 'Acesso negado: permissão insuficiente'});
        }
        next();
    }
}