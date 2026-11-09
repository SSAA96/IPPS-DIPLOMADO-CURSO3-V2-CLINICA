import { Router } from "express"
import { proteger } from "../middlewares/proteger.js"
import { validarObjectId } from "../middlewares/validarObjectId.js"

import * as controller from '../controllers/medico.controller.js'

export const medicoRoutes = Router()

medicoRoutes.use(proteger)

medicoRoutes.get('/', controller.listar)
medicoRoutes.get('/perfil', controller.perfil)
medicoRoutes.get('/:id', validarObjectId, controller.buscarPorId)
medicoRoutes.get('/:id/pacientes', validarObjectId, controller.pacientesDe)
