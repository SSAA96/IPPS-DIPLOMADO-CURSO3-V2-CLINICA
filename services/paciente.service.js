import { Paciente } from '../models/paciente.model.js'

export const crear = (datos) => Paciente.create(datos)

export const listar = (medicoId, prevision) => {
    const filtro = { medico: medicoId }
    if (prevision) filtro.prevision = prevision
    return Paciente.find(filtro)
}

export const buscarPorId = (id) => Paciente.findById(id)

// Regla de negocio: solo el médico tratante puede modificar o eliminar a su paciente.
export const esTratante = (paciente, medicoId) => paciente.medico.toString() === medicoId

export const actualizar = (paciente, datos) => {
    paciente.set(datos)
    return paciente.save()
}

export const eliminar = (paciente) => paciente.deleteOne()
