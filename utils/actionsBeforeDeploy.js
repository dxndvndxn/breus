const fs = require("fs");
const cheerio = require("cheerio");
const INDEX = "index.html";
// Получаем имена файлов html, кроме index
const paths = fs
  .readdirSync("build", { withFileTypes: true })
  .filter((d) => d.isFile() && d.name.includes("html") && d.name !== INDEX)
  .map((d) => d.name);

// Убираем <script> из html файлов, так как подргужаем файл js самостоятельно для процентнтой загрузки
fs.readdirSync("build", { withFileTypes: true })
  .filter((d) => d.isFile() && d.name.includes("html"))
  .forEach((file) => {
    const pathToFile = `./build/${file.name}`;
    const buffer = fs.readFileSync(pathToFile);
    const html = cheerio.load(buffer);
    html(".to-replace").replaceWith("");
    fs.writeFile(pathToFile, html.html(), (err) => {
      if (err) throw err;
      console.log("The file was saved!");
    });
  });

paths.forEach((path) => {
  const dir = path.replace(/.html/, "");
  // Создаем папку на основе имение файла
  fs.mkdir(`build/${dir}/`, (err) => {
    if (err) throw err; // не удалось создать папку
    // Перемещаем файл в папку
    fs.rename(`build/${path}`, `build/${dir}/${INDEX}`, (err) => {
      if (err) throw err; // не удалось переместить файл
      console.log("Файл успешно перемещён");
    });
  });
});
