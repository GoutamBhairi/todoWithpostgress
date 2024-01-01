const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json());

//routes//

//create//
app.post("/todos",async (req,res)=>{
    try{
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING * ",[description]) ;
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.msg)
    }
});
//update//
app.put("/todos/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updatetodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id]);
        res.json("todo is updated");
    } catch (err) {
        console.error(err.message);
    }

});
//delete//
app.delete("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const deletetodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
        res.json("Todo is deleted")
    } catch (err) {
        console.error(err.message);
        
    }
})
//get all//

app.get("/todos",async (req,res)=>{
    try {
        const allTodos = await pool.query("select * FROM todo");
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message);
        
    }
});

//get particular todo
app.get("/todos/:id",async (req,res)=>{
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1 ",[id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000,() => {
    console.log("app started at port 5000");
});