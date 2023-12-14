const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const port = 8000;

async function main() {
    await mongoose.connect('mongodb://localhost:27017/notes');
    console.log('Connected to MongoDB');
}

const taskSchema = new mongoose.Schema({
    title: String,
    create_date: { type: Date, default: Date.now },
    description: String,
    completed: { type: Boolean, default: false },
    completed_date: { type: Date, default: null },
});

const tasks = mongoose.model('tasks', taskSchema);

const getTasks = async () => {
    data = await tasks.find();
    return data;
}
const getUncompletedTasks = async () => {
    data = await tasks.find({ completed: false });
    return data;
}

const createTask = async (newTask) => {
    const task = new tasks(newTask);
    task.completed = false
    task.completed_date = null
    await task.save();
    return task;
}

const searchByQuery = async (query) => {
    const regex = new RegExp(query, 'i');
    const data = await tasks.find({
        title: { $regex: regex },
        completed: false
    });
    return data;
};

// function to mark task as complete
const updateTask = async (taskID) => {
    const date = new Date()
    const task = await tasks.findByIdAndUpdate(taskID, { completed: true, completed_date: date });
    return task
}

const deleteTask = async (taskTitle) => {
    const task = await tasks.deleteOne({ title: taskTitle });
    return task
}

const getMonthlyTasksStats = async (year) => {
    try {
        const startDate = new Date(`${Number(year)}-01-01T00:00:00.000Z`);
        const endDate = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);

        const tasksArr = await tasks.find({
            completed: true,
            create_date: {
                $gte: startDate,
                $lt: endDate,
            },
        });

        const monthlyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i = 0; i < tasksArr.length; i++) {
            const month = new Date(tasksArr[i].create_date).getMonth();
            monthlyData[month]++;
        }

        return { completedTasksPerMonth: monthlyData };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getOverallStats = async (year) => {
    const startDate = new Date(`${Number(year)}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);

    const tasksCompletedCount = await tasks.countDocuments({
        completed: true,
        create_date: {
            $gte: startDate,
            $lt: endDate,
        },
    });

    const tasksUncompletedCount = await tasks.countDocuments({
        completed: false,
        create_date: {
            $gte: startDate,
            $lt: endDate,
        },
    });

    const data = {
        completed: tasksCompletedCount,
        uncompleted: tasksUncompletedCount,
        ratio: tasksCompletedCount / (tasksCompletedCount + tasksUncompletedCount),
    };

    return data;
};
main();

app.get('/tasks', async (req, res) => {
    try {
        const { query } = req.query;
        let tasks;

        if (query) {
            tasks = await searchByQuery(query);
        } else {
            tasks = await getTasks();
        }
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/tasks/monthly/:year', async (req, res) => {
    try {
        const data = await getMonthlyTasksStats(req.params.year)
        res.status(200).json(data)
    } catch (err) {
        console.log('Error while fetching tasks: ', err)
    }
})

app.get('/tasks/stats/:year', async (req, res) => {
    try {
        const data = await getOverallStats(req.params.year)
        res.status(200).json(data)
    } catch (err) {
        console.log('Error while fetching tasks: ', err)
    }
})



app.get('/tasks/uncompleted', async (req, res) => {
    try {
        const tasks = await getUncompletedTasks();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const newNote = req.body;
        const creadedNote = createTask(newNote)
        res.status(201).json(creadedNote)
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.patch('/tasks/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await updateTask(taskId);
        res.status(200).json(task) //200 ok for updating a task
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/tasks/:taskTitle', async (req, res) => {
    try {
        const taskTitle = req.params.taskTitle;
        await deleteTask(taskTitle);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
