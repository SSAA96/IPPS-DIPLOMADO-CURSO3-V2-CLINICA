import { Paciente } from '../models/paciente.model.js'

// El médico tratante siempre es el del token: se ignora el "medico" que venga en los datos
export const crear = (datos, medicoId) => {
    const { medico, ...resto } = datos
    return Paciente.create({ ...resto, medico: medicoId })
}

export const listar = (medicoId, prevision) => {
    const filtro = { medico: medicoId }
    if (prevision) filtro.prevision = prevision
    return Paciente.find(filtro)
}

export const buscarPorId = (id) => Paciente.findById(id)

// Regla de negocio: solo el médico tratante puede modificar o eliminar a su paciente.
export const esTratante = (paciente, medicoId) => paciente.medico.toString() === medicoId

export const actualizar = (paciente, datos) => {
    const { medico, ...resto } = datos
    paciente.set(resto)
    return paciente.save()
}

export const eliminar = (paciente) => paciente.deleteOne()
