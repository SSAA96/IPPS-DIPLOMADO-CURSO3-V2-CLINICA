import * as service from '../services/auth.service.js'

export const registrar = async ( req, res ) =>{
    // si faltan datos → ValidationError (400) y email repetido → 11000 (409),
    // los traduce el middleware de errores de server.js
    const resultado = await service.registrar( req.body ?? {} )
    res.status(201).json(resultado)
}

export const login = async (req, res)=>{
    const { email, password } = req.body ?? {}

    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: 'Debes enviar email y password' })
    }

    const resultado = await service.login(email.toLowerCase(), password)
    if (!resultado) {
        return res.status(401).json({ error: 'Email o contraseña incorrectos' })
    }

    res.json(resultado)
}
