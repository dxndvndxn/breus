const fs = require('fs');
const INDEX = 'index.html';
const paths = fs.readdirSync("build", { withFileTypes: true })
  .filter(d => d.isFile() && d.name.includes('html') && d.name !== INDEX)
  .map(d => d.name);

paths.forEach((path) => {
  const dir = path.replace(/.html/, '');
  fs.mkdir(`build/${dir}/`, (err) => {
    if(err) throw err; // не удалось создать папку

    fs.rename(`build/${path}`, `build/${dir}/${INDEX}`, (err) => {
      if(err) throw err; // не удалось переместить файл
      console.log('Файл успешно перемещён');
    });
  });
});




