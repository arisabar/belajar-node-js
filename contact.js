const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const chalk = require("chalk");
const validator = require("validator");

const dirPath = "./data/";

//* membuat folder data jika belum ada
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };

  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);

  //*cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("Contact sudah terdaftar coba gunakan yang lain")
    );
    return false;
  }

  //* cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("email is not valid!"));
      return false;
    }
  }

  //* cek no hp
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.inverse.bold("no hp tidak valid"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(chalk.green.inverse.bold("file was created!"));
};

module.exports = { simpanContact };
