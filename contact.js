const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const { stdin, stdout } = require("process");
const readline = require("readline");

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

const dirPath = "./data/";

//* membuat folder data jika belum ada
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const pertanyaan = (tanya) => {
  return new Promise((resolve, rejects) => {
    rl.question(tanya, (tanyakan) => {
      resolve(tanyakan);
    });
  });
};

const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };

  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log("file was created!");

  rl.close();
};

module.exports = { pertanyaan, simpanContact };
