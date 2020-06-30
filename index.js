const express = require('express');
const app = express();
app.use(express.json({limit: '1mb'}));
const Datastore = require('nedb');


app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('lib'));


const database = new Datastore('database.db');
database.loadDatabase();


app.get('/highscores',(req,res) => {
    database.find({}).sort({"score":-1}).exec(function(err,data)    {
        if(err) {
            res.end();
            return;
        }
        res.json(data);
    });
});

app.post('/highscores',(req,res) => {
    console.log('I got a request!');
    const data = req.body;
    database.insert(data);
    res.json(data);
});

