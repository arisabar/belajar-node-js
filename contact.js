const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const chalk = require("chalk");
const validator = require("validator");
const { constants } = require("buffer");

//todo membuat folder data jika belum ada
const dirPath = "./data/";

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
//todo membuat file contacts.json jika belum ada
const dataPath = "./data/contacts.json";

if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

//todo membaca isi contacts json dan mengembalikan isi kontak
const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);

  return contacts;
};

//todo function menyimpan contact
const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };

  //   const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  //   const contacts = JSON.parse(fileBuffer);

  const contacts = loadContact();

  //* cek duplikat
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

//todo function list contact
const listContact = () => {
  const contacts = loadContact();

  console.log(chalk.green.inverse.bold("Data nama dan no HP"));

  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};

//todo function detail contact
const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
    return false;
  }

  console.log(chalk.cyan.inverse.bold(contact.nama));
  if (contact.email) {
    console.log(contact.email);
  }
  console.log(contact.noHp);
};

//todo function delete contact
const deleteContact = (nama) => {
  const contacts = loadContact();
  //menggunakan array baru
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(chalk.green.inverse.bold(`kontak ${nama} berhasil di hapus`));
};
module.exports = { simpanContact, listContact, detailContact, deleteContact };
