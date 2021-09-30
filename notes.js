const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  //this line replaced by the one below as find stops when it finds what it is looking for whereas filter checks everything:
  //const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title);
  //array filter method
  //const duplicateNotes = notes.filter((note) {
  //checks if new title is same as title already saved in file, if it does it returns true = duplicate, otherwise returns false and leaves duplicates file empty. Then it runs again with the next object.
  //  return note.title === title;
  // });
  //duplicate length === 0 means no duplicates were found so can safely add the note
  debugger;
  //!duplicateNote means if there is no duplicate note.
  if (!duplicateNote) {
    //to add to the array = change the note
    notes.push({
      title: title,
      body: body,
    });
    //save note with new data
    saveNotes(notes);
    console.log(chalk.bgGreen("New note added!"));
  } else {
    //if found duplicate
    console.log(chalk.bgRed("Note title taken!"));
  }
};

const saveNotes = (notes) => {
  //stringify the data
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  //if any of the lines within 'try' cause an error, it will skip to 'catch' instead and return an empty array
  try {
    //load in the data
    const dataBuffer = fs.readFileSync("notes.json");
    //convert into a string
    const dataJSON = dataBuffer.toString();
    //parse it
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  //array filter method
  const notesToKeep = notes.filter((note) => note.title !== title);

  //returns only the notes that don't match the remove request.

  if (notes.length > notesToKeep.length) {
    console.log(chalk.bgGreen("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.bgRed("No note found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.bgBlue("Your notes:"));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  // searches for a note where the title matches and returns true if it finds it. This means "note" exists. If doesn't find a match, "note" doesn't exist.
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.bold.bgBlueBright(title));
    console.log(note.body);
  } else {
    console.log(chalk.bgRed("Note not found!"));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
