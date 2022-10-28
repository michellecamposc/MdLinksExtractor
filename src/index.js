#!/usr/bin/env node

//Módulos y librerias para utilizar y leer documentos
const fileSystem = require("fs");
const path = require("path");
const colors = require("colors");
const fetch = require("node-fetch");

//Lector de las rutas
const userPath = process.argv[2]; // Muestra la ruta ingresada por el usuario
console.log("Ruta que ingresó el usuario".blue, userPath);

//La ruta existe
const pathExists = fileSystem.existsSync(userPath);
console.log("La ruta ingresada existe?".green, pathExists);

//Convierte una ruta relativa a absoluta
const absolutePath = path.isAbsolute(userPath) === true ? userPath : path.resolve(userPath);
console.log("Ruta relativa transformada a absoluta".magenta, absolutePath);

//Verifica si la ruta es un directorio o archivo
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

//Extensión del archivo
const fileExtension = () => {
  return path.extname(absolutePath) === ".md";
};
console.log("La extensión del archivo es Markdown?".yellow, fileExtension());

//Si la ruta es un directorio leer y mostrar sus archivos
const readDirectoryFiles = (absolutePath) => {
  return new Promise((resolve, reject) => {
    const arrFiles = [];
    fileSystem.readdir(absolutePath, "utf8", (err, files) => {
      if (err) {
        reject("Error".red, err);
      }
      files.forEach((file) => {
        if (path.extname(file) === ".md") {
          console.log("Archivo Markdown encontrado".rainbow, file);
          arrFiles.push(file);
        }
      });
      resolve(arrFiles);
    });
  });
};

//Extraer links Markdown de los archivos
const getLinks = (absolutePath) => {
  return new Promise((resolve, reject) => {
    const arrLink = [];
    const regexLink = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
    fileSystem.readFile(absolutePath, "utf-8", (err, data) => {
      if (err) {
        reject("Error".red, err);
      } else if (data.match(regexLink) === null) {
        reject("No se encontraron links en el documento".red);
      } else if (data) {
        data.match(regexLink).forEach((link) => {
          arrLink.push(link);
        });
        resolve(arrLink);
      }
    });
  });
};

getLinks(absolutePath)
  .then((links) => {
    console.log(links);

    validateLinks(links).then(console.log);

  })
  .catch((err) => {
    console.log("Error", err);
  });


//Función para validar los links
const validateLinks = (links) => {
  const arrStatus = links.map((link) => {
    return fetch(link)
      .then((response) => {
        const status = response.status === 200 ? "Ok" : "Fail";
        const data = {
          File: absolutePath,
          Href: response.url,
          Status: status,
        };
        return data;
      })
      .catch((err) => {
        const status = response.status === 200 ? "Ok" : "Fail";
        const data = {
          Href: response.url,
          Status: "Error con la petición fetch" + status, err,
          File: absolutePath,
        };
        return data;
      });
  });
  return Promise.all(arrStatus);
  //Promise.allSettled
};


module.exports = { pathExists, absolutePath, directoryOrFile, fileExtension, readDirectoryFiles, getLinks, validateLinks };
