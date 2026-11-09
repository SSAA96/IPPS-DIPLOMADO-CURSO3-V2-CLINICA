import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { conectar } from './config/db.js'

import { authRoutes } from './routes/auth.routes.js'
import { medicoRoutes } from './routes/medico.routes.js'
import { pacienteRoutes } from './routes/paciente.route.js'

const app = express()


app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)

app.use('/medicos', medicoRoutes)
app.use('/pacientes', pacienteRoutes)

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    }
    if (err.name === 'CastError') {
        return res.status(400).json({ error: `Id con formato inválido: ${err.value}` })
    }
    if (err.code === 11000) {
        const campo = Object.keys(err.keyValue)[0]
        return res.status(409).json({ error: `Ya existe un registro con ese ${campo}` })
    }
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'El body no es un JSON válido' })
    }
    console.error(err)
    res.status(500).json({ error: 'Error interno del servidor' })
})

await conectar()

app.listen(3001, ()=>{
    console.log('levantamos la api en http://localhost:3001')
})
