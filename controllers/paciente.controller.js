import * as service from '../services/paciente.service.js'

// POST /pacientes → el médico tratante es el del token, se ignora el "medico" del body
export const crear = async (req, res) => {
    const { medico, ...datos } = req.body ?? {}
    const paciente = await service.crear({ ...datos, medico: req.medico.id })
    res.status(201).json(paciente)
}

// GET /pacientes  y  GET /pacientes?prevision=Isapre
export const listar = async (req, res) => {
    const pacientes = await service.listar(req.medico.id, req.query.prevision)
    res.json(pacientes)
}

// GET /pacientes/:id → cualquier médico puede verlo
export const buscarPorId = async (req, res) => {
    const paciente = await service.buscarPorId(req.params.id)
    if (!paciente) return res.status(404).json({ error: `No existe el paciente ${req.params.id}` })
    res.json(paciente)
}

// PUT /pacientes/:id → solo el médico tratante
export const actualizar = async (req, res) => {
    const paciente = await service.buscarPorId(req.params.id)
    if (!paciente) return res.status(404).json({ error: `No existe el paciente ${req.params.id}` })
    if (!service.esTratante(paciente, req.medico.id)) {
        return res.status(403).json({ error: 'Solo el médico tratante puede modificar a este paciente' })
    }

    const { medico, ...datos } = req.body ?? {}
    const actualizado = await service.actualizar(paciente, datos)
    res.json(actualizado)
}

// DELETE /pacientes/:id → solo el médico tratante, 204 sin cuerpo
export const eliminar = async (req, res) => {
    const paciente = await service.buscarPorId(req.params.id)
    if (!paciente) return res.status(404).json({ error: `No existe el paciente ${req.params.id}` })
    if (!service.esTratante(paciente, req.medico.id)) {
        return res.status(403).json({ error: 'Solo el médico tratante puede eliminar a este paciente' })
    }

    await service.eliminar(paciente)
    res.status(204).end()
}
