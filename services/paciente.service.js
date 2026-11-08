import { Paciente } from '../models/paciente.model.js'

export const crear = (datos) => Paciente.create(datos)

export const listar = (medicoId, prevision) => {
    const filtro = { medico: medicoId }
    if (prevision) filtro.prevision = prevision
    return Paciente.find(filtro)
}

export const buscarPorId = (id) => Paciente.findById(id)

export const actualizar = (paciente, datos) => {
    paciente.set(datos)
    return paciente.save()
}

export const eliminar = (paciente) => paciente.deleteOne()
