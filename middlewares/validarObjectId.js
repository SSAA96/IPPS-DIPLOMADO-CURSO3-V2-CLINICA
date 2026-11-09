import mongoose from 'mongoose'

// Si el :id no tiene formato de ObjectId, ese documento no puede existir:
// cortamos aquí con un 400 y no seguimos hasta el controller ni la base de datos.
export const validarObjectId = (req, res, next) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: `Id con formato inválido: ${id}` })
  }
  next()
}
