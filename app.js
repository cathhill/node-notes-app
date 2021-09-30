const chalk = require("chalk");
const yargs = require("yargs");
const yargsParser = require("yargs-parser");
const notes = require("./notes");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      //demandOption means title is required to run
      demandOption: true,
      // type of title required is a string, otherwise defaults to boolean if no text required
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      //demandOption means title is required to run
      demandOption: true,
      // type of title required is a string, otherwise defaults to boolean if no text required
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// Create list command
yargs.command({
  command: "list",
  describe: "List a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      // type of title required is a string, otherwise defaults to boolean if no text required
      type: "string",
    },
  },
  handler() {
    notes.listNotes();
  },
});

// Create read command

yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
