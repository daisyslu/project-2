let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let Datastore = require('nedb');
const { Server } = require('http');
let db= new Datastore('name.db');
db.loadDatabase();

app.use(bodyParser.json());

let nameTracker = [];

// app.get('/', (req,res)=>{
//     res.send('this is the main page');
// })

//2. add a route on server, that is listening for a post request
app.post('/names', (req,res)=>{
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        names: req.body.number
    }
    //insert name data into the database
    db.insert(obj,(err, newDocs)=>{
        if(err){
            res.json({task:"task failed"});
        }else{
            res.json({task:"success"});
        }
        //console.log('new document inserted');
        //res.json({task:"success"});
    })
    nameTracker.push(obj);
    console.log(nameTracker);
    res.json({task:"success"});
})

app.use('/', express.static('public'));

//add route to get all name track info
app.get('/getNames', (req,res)=>{
//     let obj = {data: nameTracker};
//     res.json(obj);
// })

    db.find({}, (err, docs)=> {
        if(err){
            res.json({task:"task failed"})
        }else{
            let obj = {data: docs};
            res.json(obj);
        }
        //console.log(docs);
    
    })
})

//listen at port 3000
// app.listen(3000, ()=> {
//     console.log('listening at locoalhost:3000');
// })
let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('listening at', port);
})