import express from 'express'
import multer from 'multer'
import { uploadImage } from '../controllers/upload.controller.js'
import { isAdmin, isAuth } from '../middleware/auth.js'

const uploadRouter = express.Router()

// Configuración de multer para manejar archivos en memoria
const upload = multer()

uploadRouter.post('/', isAuth, isAdmin, upload.single('file'), uploadImage) // Sube una imagen (solo administradores)
// upload.single('file') - Procesa un archivo con nombre 'file'

export default uploadRouter
