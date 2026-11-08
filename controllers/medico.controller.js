import * as service from '../services/medico.service.js'

// GET /medicos  y  GET /medicos?especialidad=Pediatría
export const listar = async (req, res) => {
    const medicos = await service.listar(req.query.especialidad)
    res.json(medicos)
}

// GET /medicos/perfil → el médico del token (proteger lo dejó en req.medico)
export const perfil = async (req, res) => {
    const medico = await service.buscarPorId(req.medico.id)
    if (!medico) return res.status(404).json({ error: 'No existe el médico del token' })
    res.json(medico)
}

// GET /medicos/:id  (id con mal formato → CastError → 400 en server.js)
export const buscarPorId = async (req, res) => {
    const medico = await service.buscarPorId(req.params.id)
    if (!medico) return res.status(404).json({ error: `No existe el médico ${req.params.id}` })
    res.json(medico)
}

// GET /medicos/:id/pacientes → [] si no tiene pacientes, 404 si el médico no existe
export const pacientesDe = async (req, res) => {
    const medico = await service.buscarPorId(req.params.id)
    if (!medico) return res.status(404).json({ error: `No existe el médico ${req.params.id}` })

    const pacientes = await service.pacientesDe(req.params.id)
    res.json(pacientes)
}
