import { Router } from "express"
import { proteger } from "../middlewares/proteger.js"

import * as controller from '../controllers/paciente.controller.js'

export const pacienteRoutes = Router()

pacienteRoutes.use(proteger) // 👈 de aquí abajo, todo exige token

pacienteRoutes.post('/', controller.crear)
pacienteRoutes.get('/', controller.listar)
pacienteRoutes.get('/:id', controller.buscarPorId)
pacienteRoutes.put('/:id', controller.actualizar)
pacienteRoutes.delete('/:id', controller.eliminar)
