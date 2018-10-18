var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();

var dburl = process.env.DBURL || 'mongodb://localhost:27017';
var dbName = process.env.DBNAME || 'demoDb';
var listenPort = process.env.LISTENPORT || 3000;

app.use(bodyParser.json({limit: '15mb'}));
app.use(bodyParser.urlencoded({"extended" : false, limit: '15mb'}));

/* Definição das Rotas */
router.get("/",function(req,res){
    res.json({"error" : false,"message" : ""});
});

console.log("Connecting to MongoDB...")

var MongoClient = require('mongodb').MongoClient;

router.route("/api/audit").post((req,res) => {
    (async () => {
        const client = new MongoClient(dburl);
        try {  
            await client.connect();
            const db = client.db(dbName);
            db.collection('audit').insertOne(req.body);
            res.json({ ok: 1});
            //console.log(await db.collection('audit').find().toArray());
    
        } catch(err) {
            console.log(err.stack)
            res.status(500).json(err);
        }
        client.close();
    })()
    

})


app.use('/',router);

console.log("Starting WebServer...");
app.listen(listenPort);
console.log("Listening to PORT "+listenPort);

