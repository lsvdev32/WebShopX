# 🛒 WebShopX

WebShopX es un **Ecommerce Full Stack** desarrollado como proyecto personal utilizando el **stack MERN**.  
Es una tienda online **genérica, escalable y adaptable** a cualquier nicho de mercado.

El proyecto se encuentra en un estado avanzado y está diseñado para seguir evolucionando con mejoras y nuevas funcionalidades en el futuro.

---

## 🚀 Características principales

- 🔐 Autenticación completa (login, registro y recuperación de contraseña)
- 👥 Gestión de roles (Administrador y Usuario)
- 🛍️ Carrito de compras persistente
- 💳 Proceso de checkout
- 💰 Pasarela de pagos integrada con **PayPal**
- 📦 Gestión de productos (CRUD)
- 👤 Gestión de usuarios
- 📄 Órdenes e historial de compras
- 🖼️ Subida y gestión de imágenes con **Cloudinary**
- 🔔 Sistema de notificaciones
- 🔒 Protección de rutas y control de acceso por roles

---

## 🧱 Stack tecnológico

### Frontend
- **React** + **Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **Context API**
- Arquitectura basada en **features + componentes reutilizables**

### Backend
- **Node.js**
- **Express.js**
- Arquitectura **MVC**
- Lógica de negocio desacoplada mediante **services**
- Autenticación con **JWT**
- Encriptación de contraseñas con **Bcrypt**
- Middlewares para protección de rutas y roles

### Base de datos
- **MongoDB Atlas**
- **Mongoose**

### Servicios externos
- **Cloudinary** (gestión de imágenes)
- **PayPal API** (procesamiento de pagos)

---

## 🔐 Autenticación y seguridad

- Autenticación basada en **JWT**
- Persistencia de sesión mediante **LocalStorage**
- Contraseñas cifradas con **Bcrypt**
- Protección de rutas con **middlewares**
- Control de acceso por roles (Admin / Usuario)

---

## 📄 Documentación de la API

El backend cuenta con **documentación de la API**, facilitando el consumo, prueba y mantenimiento de los endpoints relacionados con:

- Autenticación
- Usuarios
- Productos
- Órdenes
- Pagos

---

## 🖼️ Capturas de pantalla

A continuación se muestran algunas vistas principales de la aplicación WebShopX:

### 🏠 Página de inicio
<img width="1897" height="2187" alt="Image" src="https://github.com/user-attachments/assets/97cd821f-5285-46fd-9feb-8d8df0d7065a" />

<img width="1897" height="2183" alt="Image" src="https://github.com/user-attachments/assets/75983982-c3e4-4103-b682-12bd72d29e64" />

---
### 🔐 Autenticación de usuarios
<img width="1920" height="877" alt="Image" src="https://github.com/user-attachments/assets/1a972566-18cf-4be6-8349-a9cac4905126" />

<img width="1920" height="877" alt="Image" src="https://github.com/user-attachments/assets/c74c9523-1a5f-4e2c-badc-79c017ea820e" />

---
### 🛍️ Detalle de producto
<img width="1898" height="1986" alt="Image" src="https://github.com/user-attachments/assets/0d23df20-3374-4b75-9e63-76d7acf4f2ad" />

---
### 🛒 Carrito de compras
<img width="1920" height="877" alt="Image" src="https://github.com/user-attachments/assets/88b5dac8-4c3a-40cc-ad22-def942a09cf9" />

---
### 💳 Checkout y pago
<img width="1895" height="1346" alt="Image" src="https://github.com/user-attachments/assets/789e094c-de85-424c-89e6-5bfbee5e5195" />

---
### ⚙️ Panel de administración
<img width="1898" height="1289" alt="Image" src="https://github.com/user-attachments/assets/059dd493-64d9-4130-a88e-b81a020a3ae5" />

<img width="1920" height="877" alt="Image" src="https://github.com/user-attachments/assets/c57c1d57-ddf0-4531-9e56-74d9353724f6" />
