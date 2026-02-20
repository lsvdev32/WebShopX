import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'
import '../utils/cloudinary.config.js'

/**
 * Sube un archivo a Cloudinary usando streams para manejar archivos grandes eficientemente.
 * Convierte el buffer del archivo (de multer) en un stream y lo procesa con Cloudinary.
 * @param {Object} file - Archivo procesado por multer middleware
 * @param {Buffer} file.buffer - Datos binarios del archivo
 * @param {string} file.mimetype - Tipo MIME del archivo (ej: 'image/jpeg')
 * @param {string} file.originalname - Nombre original del archivo
 * @param {number} file.size - Tamaño del archivo en bytes
 * @returns {Promise<Object>} Resultado de la subida con URL y metadatos
 * @throws {Error} Si ocurre un error durante la subida
 */
export const streamUpload = (file) => {
  return new Promise((resolve, reject) => {
    // Crea un stream de subida a Cloudinary con callback
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        // Subida exitosa: result contiene URL, public_id, dimensiones, etc.
        resolve(result)
      } else {
        // Error durante la subida: problemas de red, formato inválido, etc.
        reject(error)
      }
    })

    // streamifier convierte el buffer en un stream legible y lo envía a Cloudinary
    // pipe() conecta el stream de lectura con el stream de escritura
    streamifier.createReadStream(file.buffer).pipe(stream)
  })
}
