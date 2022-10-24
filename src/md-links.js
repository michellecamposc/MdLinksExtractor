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
      if (options.validate === true) {
        resolve(arrLinks);
      } else {
        const linkStatusArr = validateLinks(arrLinks);
        resolve(linkStatusArr);
      }
    }
  });

module.exports = { mdLinks };

//mdlinks src/test.md
//mdlinks src/cli.js