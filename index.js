const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://dbUser2:0mDku9yhv04VWJRS@cluster0.a4fg6vr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const userCollection = client.db('nodeMongoCrud').collection('users');
        
        app.get('/users', async(req, res)=>{
            const query = {};
            const cursor = userCollection.find(query);
            // const cursor = userCollection.finOne({_id:id});
            const users = await cursor.toArray();
            res.send(users);
        })

        app.get('/users/:id', async(req, res) =>{
            // const id = req.params.id;
            // const id = mongoose.Types.ObjectId(req.params.id.trim());
            const id = req.params.id;
            // const query = {_id:  new ObjectId(id)};
            const query = {_id: id}
            const user = await userCollection.findOne(query);
            res.send(user);
        })

        app.post('/users', async(req, res)=>{
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        app.delete('/users/:id', async (req, res)=>{
            // const id = req.params.id;
            // const id = mongoose.Types.ObjectId(req.params.id.trim());
            const id = req.params.id;
            const query = {_id: id}
            // const query = { _id:  new ObjectId(id)}
            const result = await userCollection.deleteOne(query);
            console.log(result);
            res.send(result);
            // console.log('trying to del the item');
            // const query = { _id: ObjectId(id) }
            // const result = await userCollection.deleteOne(query);
            // console.log(result);
            // res.send(result)
        });
    }
    finally{

    }

}
run().catch(err => console.log(err))


// dbUser2
// passwprd: 0mDku9yhv04VWJRS
app.get('/', (req, res) =>{
    res.send('Hello from mongodb crud server');
})

app.listen(port, ()=>{
    console.log(`listing to port ${port}`);
})