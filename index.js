import express from 'express'

const app = express();
const port = 4200;
app.use(express.json());

let data = [];
let ID = 1;


//Creationl
app.post('/post',(req,res) =>{
    const {name ,age} = req.body;
    const postData = { id : ID++ ,name,age};
    data.push(postData);
    res.status(201).send(postData);
} )


//Get all data
app.get('/get',(req,res) =>{
    res.status(200).send(data);
})

//Get data with id
app.get('/get/:id',(req,res) =>{
    const findData = data.find( search => search.id === parseInt(req.params.id));
    console.log(findData);
    if (!findData){
        return res.status(404).send('No data available');
    }
    res.status(200).send(findData);
})

//Updation for particular data
app.put('/get/:id',(req,res) =>{
    const putData = data.find(find => find.id === parseInt(req.params.id));
    if (!putData){
        return res.status(404).send('Invalid request');
    }
    const {name,age} = req.body;
    putData.name = name;
    putData.age = age;
    res.status(201).send(putData);
})

//Deletion for individual data
app.delete('/get/:id',(req,res) =>{
    const deleteData = data.find( data => data.id === parseInt(req.params.id));
    console.log(deleteData);
    if (!deleteData){
        return res.status(404).send('Invalid Request');
    }
    data.splice(deleteData,1);
    res.status(204).send('Deleted Successfully');
})

app.get('/',(req,res) => {
    res.send('Hello Express');
})

app.get('/login',(req,res) => {
    res.send('Welcome to login page');
})

app.listen(port,() =>{
    console.log(`Server is running at port:${port}...`);
})