const fs = require("fs");
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

rl.question("Masukan Nama anda : ", (nama) => {
  rl.question("Masukan Email : ", (email) => {
    const contact = { nama, email };
    const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");

    const contacts = JSON.parse(fileBuffer);

    contacts.push(contact);

    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

    console.log("file was created!");

    rl.close();
  });
});
