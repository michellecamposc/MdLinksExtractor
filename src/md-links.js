#!/usr/bin/env node
const api = require("./src/index.js");
//const api = { pathExists, absolutePath, directoryOrFile, fileExtension, readDirectoryFiles, getLinks, validateLinks } = require("./src/index.js");

const mdLinks = (absolutePath, options) =>
  new Promise((resolve, rejected) => {
    if (!api.existPath(absolutePath)) {
      rejected('Does not exist'.red);
    } else {
      const allPaths = api.getLinks(absolutePath);
      let arrLinks = [];
      allPaths.forEach(link => {
        const validLinks = api.getLinks(link);
        arrLinks = arrLinks.concat(validateLinks(validLinks))
      })
      if (!(options.validate)) {
        resolve(arrLinks);
      } else {
        const statusLink = validateLinks(arrLinks);
        resolve(statusLink);
      }
    }
  });

module.exports = { mdLinks };

//mdlinks src/test.md
//mdlinks src/md-links.jss