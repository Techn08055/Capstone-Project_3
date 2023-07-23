import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const taskList = []
const worktaskList = []

function createTask (task, day = 'today'){
    if (day === 'today'){
        taskList.push(task)
        return taskList
    }
    else if (day === 'work'){
        worktaskList.push(task)
        return worktaskList
    }
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'))

app.get("/", (req, res) =>{
    res.render("index.ejs")
})

app.post("/", (req, res) => {
    const task = req.body["myInput"]
    const tasks = createTask(task)
     res.render("index.ejs", {tasks: tasks })
   });

app.get("/work", (req, res) =>{
    res.render("workList.ejs")
})

app.post("/work", (req, res) => {
const task = req.body["myInput"]
const tasks = createTask(task, 'work')
    res.render("workList.ejs", {tasks: tasks })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  