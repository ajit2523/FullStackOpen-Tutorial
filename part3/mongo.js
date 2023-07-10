const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://f20201394:${password}@cluster0.oemlv84.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true,
  },
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is Easy",
  important: true,
});

const note2 = new Note({
  content: "Browser can execute only Javascript",
  important: false,
});

const note3 = new Note({
  content: "GET and POST are the most important methods of HTTP protocol",
  important: true,
});

const savePromises = [note.save(), note2.save(), note3.save()];
Promise.all(savePromises)
  .then(() => {
    console.log("All notes saved!");
    return Note.find({important: true});
  })
  .then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
