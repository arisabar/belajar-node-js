//* mengambil argument dari command line

const { argv } = require("yargs");
const yargs = require("yargs");
const { simpanContact } = require("./contact");

yargs.command({
  command: "add",
  discribe: "Menambahkan contact baru",
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
    simpanContact(argv.nama, argv.email, argv.noHp);
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
