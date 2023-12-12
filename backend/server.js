const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

const port = 8000;

async function main() {
    await mongoose.connect('mongodb://localhost:27017/notes');
    console.log('Connected to MongoDB');
}

const noteSchema = new mongoose.Schema({
    title: String,
    create_date: String,
    description: String,
    completed: Boolean,
    completed_date: String,
});

const Notes = mongoose.model('notes', noteSchema);

const getNotes = async () => {
    data = await Notes.find();
    return data;
}
const getUncompletedNotes = async () => {
    data = await Notes.find({ completed: false });
    return data;
}

const createNote = async (newNote) => {
    const note = new Notes(newNote);
    await note.save();
    return note;
}

const searchByQuery = async (query) => {
    const regex = new RegExp(query, 'i');
    const data = await Notes.find({
        $or: [
            { title: { $regex: regex } },
            { description: { $regex: regex } },
        ],
    });

    return data;
};

const updateNote = async (noteId) => {
    const note = await Notes.findByIdAndUpdate({ "_id": noteId, completed: false }, { completed: true });
    note.save()
}

const deleteNote = async (taskTitle) => {
    const note = await Notes.deleteOne({ title: taskTitle });
    console.log(note);
}

main();

app.get('/notes', async (req, res) => {
    try {
        const { query } = req.query;
        let notes;

        if (query) {
            notes = await searchByQuery(query);
        } else {
            notes = await getNotes();
        }

        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.get('/notes/uncompleted', async (req, res) => {
    try {
        const notes = await getUncompletedNotes();
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/notes', async (req, res) => {
    try {
        const newNote = req.body;
        const createdNote = await createNote(newNote);
        res.status(201).json(createdNote); // 201 Created status for successful creation
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.patch('/notes/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        console.log(taskId)
        await updateNote(taskId);
        res.status(200) //200 ok for updating a note
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/notes/:taskTitle', async (req, res) => {
    try {
        const taskTitle = req.params.taskTitle;
        await deleteNote(taskTitle);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
