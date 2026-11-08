import mongoose from 'mongoose'

const pacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  rut: { type: String, required: true, unique: true, trim: true, uppercase: true }, // 12.345.678-k = 12.345.678-K
  fechaNacimiento: { type: Date, required: true },
  prevision: {
    type: String,
    enum: ['Fonasa', 'Isapre', 'Particular'],
    default: 'Fonasa',
  },
  telefono: { type: String },
  email: { type: String, lowercase: true },
  // médico tratante: en la bd solo se guarda su _id
  medico: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico', required: true },
}, { timestamps: true })

export const Paciente = mongoose.model(
    'Paciente',
    pacienteSchema,
    'pacientes'
)
