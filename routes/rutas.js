import { Router } from "express";
import {
  nuevoContacto,
  mostrarContactos,
  buscarContactoPorID,
  editarContacto,
  borrarContacto,
  buscarContacto
} from "../bd/contactosBD.js";

const router = Router();

var artistas = ["van gogh", "beethoven", "mozart", "da vinci"];

// Página principal
router.get("/", (req, res) => {
  res.render("home", { artistas });
});

// Página info
router.get("/info/:c", (req, res) => {
  const c = req.params.c;
  console.log(c);
  res.render("info", { c });
});

// Página de contacto
router.get("/contactanos", (req, res) => {
  res.render("contactanos");
});

router.post("/contactanos", async (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  console.log("Nombre: " + nombre + " Edad: " + edad);

  const respuestaMongo = await nuevoContacto(req.body);
  console.log(respuestaMongo);

  res.render("recibirDatos", { nombre, edad });
});

// Mostrar contactos
router.get("/mostrarContactos", async (req, res) => {
  const contactosBD = await mostrarContactos();
  res.render("mostrarContactos", { contactosBD });
});

// Editar contacto
router.get("/editarContacto/:id", async (req, res) => {
  const id = req.params.id;
  const contactoBD = await buscarContactoPorID(id);
  res.render("editarContacto", { contactoBD });
});

router.post("/editarContacto", async (req, res) => {
  const respuestaMongo = await editarContacto(req.body);
  console.log(respuestaMongo);
  res.redirect("/mostrarContactos");
});

// Borrar contacto
router.get("/borrarContacto/:id", async (req, res) => {
  const id = req.params.id;
  const respuestaMongo = await borrarContacto(id);
  res.redirect("/mostrarContactos");
});

// Buscar contacto
router.post("/buscarContacto", async (req, res) => {
  const nombre = req.body.nombre;
  const contactosBD = await buscarContacto(nombre);
  res.render("mostrarContactos", { contactosBD });
});

export default router;
