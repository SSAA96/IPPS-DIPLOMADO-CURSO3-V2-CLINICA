import { Medico } from '../models/medico.model.js'

export const listar = (especialidad) => {
    const filtro = especialidad ? { especialidad } : {}
    return Medico.find(filtro)
}

export const buscarPorId = (id) => Medico.findById(id)
