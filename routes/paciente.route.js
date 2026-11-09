import { Router } from "express"
import { proteger } from "../middlewares/proteger.js"
import { validarObjectId } from "../middlewares/validarObjectId.js"

import * as controller from '../controllers/paciente.controller.js'

export const pacienteRoutes = Router()

pacienteRoutes.use(proteger)

pacienteRoutes.post('/', controller.crear)
pacienteRoutes.get('/', controller.listar)
pacienteRoutes.get('/:id', validarObjectId, controller.buscarPorId)
pacienteRoutes.put('/:id', validarObjectId, controller.actualizar)
pacienteRoutes.delete('/:id', validarObjectId, controller.eliminar)
