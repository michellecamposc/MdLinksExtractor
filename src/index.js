#!/usr/bin/env node

//Módulos y librerias para utilizar y leer documentos
const fileSystem = require("fs");
const path = require("path");
const colors = require("colors");

//Lector de las rutas
const userPath = process.argv[2]; // Muestra la ruta ingresada por el usuario
const options = process.argv[3];
console.log("Esta esta la ruta que dió el usuario".blue, userPath);

//Convierte una ruta relativa a absoluta
const absolutePath =
  path.isAbsolute(userPath) === true ? userPath : path.resolve(userPath);
console.log("Ruta relativa transformada".yellow, absolutePath);

//Verificar si la ruta es un directorio o archivo
const directoryOrFile = () => {
  fileSystem.stat(absolutePath, (err, stats) => {
    const file = stats.isFile(absolutePath);
    const directory = stats.isDirectory(absolutePath);
    if (err) {
      reject("Error".red, err);
    }
    if (file) {
      return console.log("Esta ruta es un archivo".yellow + " " + file);
    } else if (directory) {
      return console.log(
        "Esta ruta es un directorio ".yellow + " " + directory
      );
    }
  });
};
directoryOrFile();

//Extensión del archivo
const fileExtension = () => {
  return path.extname(absolutePath) === ".md";
};
console.log("La extensión del archivo es md".yellow, fileExtension());

//Si la ruta es un directorio leer y mostrar sus archivos
const readDirectoryFiles = () => {
  return new Promise((resolve, reject) => {
    const arrFiles = [];
    fileSystem.readdir(userPath, "utf8", (err, files) => {
      if (err) {
        reject("Error".red, err);
      }
      files.forEach((file) => {
        if (path.extname(file) === ".md") {
          console.log("Archivo Markdown  encontrado".rainbow, file);
          arrFiles.push(file);
        }
      });
      resolve(arrFiles);
    });
  });
};
readDirectoryFiles();

//Extraer links markdown de los archivos
const getLinks = () => {
  return new Promise((resolve, reject) => {
    const arrLink = [];
    const regexLink = /\[(\w.+)\]\((https):\/\/[^ "]\S+\)/g;
    fileSystem.readFile(absolutePath, "utf-8", (err, data) => {
      if (err) {
        reject("Error".red, err);
      } else if (data.match(regexLink) === null) {
        reject("No se encontraron links en el documento".red);
      } else if (data) {
        data.match(regexLink).forEach((link) => {
          arrLink.push(link);
          console.log("Estos son los links".rainbow, link);
        });
        resolve("Estos son los links".rainbow, arrLink);
      }
    });
  });
};
console.log(getLinks);
getLinks;

//mdlinks src
