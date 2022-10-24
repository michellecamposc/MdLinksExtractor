const { colors } = require("colors");
const { mdLinks } = require("./src/md-links.js")

//Muestra el estado de los links encontrados
const linkStatus = (array) => {
  const totalLinks = array.length;
  const links = array.map((link) => link.href);
  const uniqueLinks = new Set(links);
  return `
Total: ${totalLinks}
Unique: ${uniqueLinks.size}
`;
};

//Muestra links rotos
const brokenLinks = (array) => {
  const linkMessages = array.filter((link) => link.Message === "fail");
  return `Broken: ${linkMessages.length}
`;
};

//--stats / stats --validate
const [, , , ...args] = process.argv;
const options = { validate, stats }
const validate = args.includes("--validate");
const stats = args.includes("--stats");

const status = linkStatus();
const broken = brokenLinks();

if (args.length === 1) {
  mdLinks(userPath, { validate: false })
    .then(res => console.log(res))
    .catch((err) => {
      console.log("Error".red, err);
    });
} else {
  //Validate & Stats obtenemos estadísticas generales
  if (validate && stats) {
    mdLinks(userPath, { validate: true })
      .then(res => {
        console.log(status.rainbow, res)
        console.log(broken.red, res)
      })
      .catch((err) => {
        console.log("Error".red, err);
      });
    //En el caso de validate
  } else if (options.validate) {
    mdLinks(userPath, { validate: true })
      .then(res => console.log(broken.red, status.rainbow, res))
      .catch((err) => console.log("Error".red, err))
    //En el caso de stats
  } else if (options.stats) {
    mdLinks(userPath, { validate: true })
      .then(res => console.table(broken.red, status.rainbow, res))
      .catch((err) => console.log("Error".red, err))
  }
}


module.exports = { linkStatus, brokenLinks };

