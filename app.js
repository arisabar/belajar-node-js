//* mengambil argument dari command line

const yargs = require("yargs");
const contacts = require("./contact");

yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHp: {
        describe: "Nomer Handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.noHp);
    },
  })
  .demandCommand();

//* menampilkan nama daftar semua nama dan hp contact
yargs.command({
  command: "list",
  describe: "Menampilkan kontak",
  handler() {
    contacts.listContact();
  },
});

//* menampilkan detail kontak berdasarkan nama
yargs.command({
  command: "detail",
  describe: "Menampilkan detail kontak berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

//* menghapus kontak berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus detail kontak berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();

// const command = process.argv[2];
// if(command === 'add') {

// }else if(command === 'remove') {

// }else if(command === 'list'){

// }

// const { pertanyaan, simpanContact } = require("./contact");

// const main = async () => {
//   const nama = await pertanyaan("Masukan Nama : ");
//   const email = await pertanyaan("Masukan Email : ");
//   const noHp = await pertanyaan("Masukan No HP : ");

//   simpanContact(nama, email, noHp);
// };

// main();
