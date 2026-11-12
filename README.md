# API Clínica

Evaluación integradora · Diplomado Módulo 3 (Backend y APIs REST) — IPSS.

API REST con Node, Express y MongoDB (Mongoose) para médicos y pacientes, protegida con JWT.

## Video

[Ver video 01 - Errores Iniciales en Google Drive](https://drive.google.com/file/d/1kOz3NunSPnV1JfzJ6BJcxq69HOEUNaJ7/view?usp=drive_link) 

[Ver video 02 - Explicación de Middlewares en  Google Drive](https://drive.google.com/file/d/1CEcrEqQYwdvLwql_oMlbSO25aVpEO7r2/view?usp=drive_link) 

[Ver video 03 - Explicación de bycript y flujo en Google Drive](https://drive.google.com/file/d/1uokK81kNa8kQd7I7Q_0Udy0fM3mZ8OQp/view?usp=drive_link) 

## Cómo levantarlo

1. Instalar dependencias:

   ```bash
   yarn
   ```

2. Crear un archivo `.env` en la raíz (copiando `.env.example`) con la URL de MongoDB Atlas:

   ```env
   MONGODB_URI=mongodb+srv://USUARIO:CLAVE@TU-CLUSTER.mongodb.net/clinica
   ```

3. Levantar el servidor:

   ```bash
   yarn dev
   ```

La API queda en **http://localhost:3001**.

## Rutas

Las rutas de `/medicos` y `/pacientes` exigen el header `Authorization: Bearer <token>`.

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | `/auth/registro` | Registra un médico → `201 { medico, token }` |
| POST | `/auth/login` | Inicia sesión → `200 { medico, token }` |
| GET | `/medicos` | Lista de médicos (`?especialidad=Pediatría`) |
| GET | `/medicos/perfil` | El médico del token |
| GET | `/medicos/:id` | Un médico |
| GET | `/medicos/:id/pacientes` | Pacientes de un médico |
| POST | `/pacientes` | Crea un paciente (su médico es el del token) |
| GET | `/pacientes` | Mis pacientes (`?prevision=Isapre`) |
| GET | `/pacientes/:id` | Un paciente |
| PUT | `/pacientes/:id` | Actualiza un paciente (solo el médico tratante) |
| DELETE | `/pacientes/:id` | Elimina un paciente (solo el médico tratante) |

Ejemplo de body para crear un paciente:

```json
{
  "nombre": "Pedro Pérez",
  "rut": "12.345.678-9",
  "fechaNacimiento": "1990-05-10",
  "prevision": "Isapre",
  "telefono": "+56912345678",
  "email": "pedro@mail.cl"
}
```

Los errores responden en JSON `{ "error": "..." }`: `400` datos o id inválidos, `401` sin token o login
incorrecto, `403` el paciente no es tuyo, `404` no existe, `409` email o RUT repetido.
