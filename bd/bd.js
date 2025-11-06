// bd/bd.js
import mongoose from "mongoose";
import 'dotenv/config'; // Carga las variables de entorno automáticamente

async function conectarBD() {
  try {
    const respuestaMongo = await mongoose.connect(process.env.SECRET_MONGO);
    // Para pruebas locales, puedes usar:
    // mongoose.connect("mongodb://localhost:27017/backend1")
    console.log(" Conexion con MongoDB Atlas");
  } catch (err) {
    console.log(" Error: " + err);
  }
}

export default conectarBD;
