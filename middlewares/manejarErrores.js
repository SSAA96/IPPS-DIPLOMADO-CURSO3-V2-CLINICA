export const manejarErrores = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    }
    if (err.name === 'CastError') {
        return res.status(400).json({ error: `Id con formato inválido: ${err.value}` })
    }
    if (err.code === 11000) {
        const campo = Object.keys(err.keyValue)[0]
        return res.status(409).json({ error: `Ya existe un registro con ese ${campo}` })
    }
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'El body no es un JSON válido' })
    }
    console.error(err)
    res.status(500).json({ error: 'Error interno del servidor' })
}
