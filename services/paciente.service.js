import { Paciente } from '../models/paciente.model.js'

export const crear = (datos) => Paciente.create(datos)

// "mis pacientes": siempre filtrados por el médico que hace la petición
export const listar = (medicoId, prevision) => {
    const filtro = { medico: medicoId }
    if (prevision) filtro.prevision = prevision
    return Paciente.find(filtro)
}

export const buscarPorId = (id) => Paciente.findById(id)

// set + save: así también corren las validaciones del modelo (400) y el unique del rut (409)
export const actualizar = (paciente, datos) => {
    paciente.set(datos)
    return paciente.save()
}

export const eliminar = (paciente) => paciente.deleteOne()
