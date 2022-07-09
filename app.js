const { pertanyaan, simpanContact } = require("./contact");

const main = async () => {
  const nama = await pertanyaan("Masukan Nama : ");
  const email = await pertanyaan("Masukan Email : ");
  const noHp = await pertanyaan("Masukan No HP : ");

  simpanContact(nama, email, noHp);
};

main();
