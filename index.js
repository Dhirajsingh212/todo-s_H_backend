const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const dotenv=require('dotenv');

dotenv.config({path:'./config.env'});

mongoose.connect(process.env.DB_LOCAL).then(()=>{console.log("db connected sucessfully")});

const todoSchema = new mongoose.Schema({
    task: String
});

const Todo = mongoose.model("Todo",todoSchema);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.post("/api/add", function(req, res){
    
    const todo = new Todo(req.body);
    todo.save();
});

app.get("/api/output",function(req, res){
    Todo.find(function(err, todos){
        if(err){
            console.log(err);
        }else{
            res.send(todos);
        }
    })
})

app.post("/api/delete", function(req, res){
    const todoId = req.body._id;

    Todo.findByIdAndRemove(todoId, function(err){
        if(err)
        {
            console.log(err);
        }
    })
})

app.listen(process.env.PORT, ()=>console.log('server is up'));