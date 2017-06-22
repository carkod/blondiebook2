import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

const app = express();

const dbName = 'vkgirls';
const dbUrl = 'mongodb://localhost:27017/' + dbName;

// Functions
import { Create } from './components/create.js';
import { Validation } from './validation.js';
/*
function validate(data) {
    app.use(bodyParser());
    let errors = {};
    if (data.title === '') errors.title = "Can't be empty";
    if (data.cover === '') errors.cover = "Can't be empty";
    const isValid = Object.keys(errors).length === 0
    
    return { errors, isValid };
    
}*/


mongodb.MongoClient.connect(dbUrl, function(dbError,db) {
    if (!dbError) {
    
    //Parser Middlewares
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator());
    
    
    //start CRUD
    app.get('/', (req, res) => {
       db.collection('girls').find({}).toArray((err, girls) => {
           if (err) throw err;
           res.json({girls});
       }) 
    });
    
    
    app.get('/db/girls', (req,res) => {
        db.collection('girls').find({}).toArray((err,girls) => {
           res.json({girls});
        });
    });
    
    app.post('/db/girls', (req, res) => {
      
        Create(req, res, db);
       
    })
    
    
    app.put('/db/girls/:_id', (req, res) => {
       Validation(req, res);
       
       req.getValidationResult().then(function(result){
        if (false) {
            //If 2 errors, it will show first one, then another once it is solved
            let errors = result.useFirstErrorOnly().array();
            res.status(400).json(errors);
            
        } else {
            const { name, city, country, cover, modifiedAt } = req.body;
            
            db.collection('girls').findOneAndUpdate(
                { _id: new mongodb.ObjectId(req.params._id) },
                { $set: { name, city, country, cover, modifiedAt } },
                { returnNewDocument: true },
                (errata, outcome) => {
                    
                if (errata) {
                    console.log('error!' + errata + outcome)
                  res.status(500).json({ errors: { global: errata }});
                } else {
                    console.log('put executing')
                  res.json({ girl: outcome.value });
                }
                    
                });
        }   
    });
       
    });
    
    
    app.get('/db/girls/:_id', (req, res) => {
    
    if (req.query.params) {
        res.send(req.query.params);
    } else {
        db.collection('girls').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, girl) => {
        if(err) throw err;
       res.json({ girl });
     })   
    }
     
   });

   app.delete('/db/girls/:_id', (req, res) => {
     db.collection('girls').deleteOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, r) => {
        if(err) { res.status(500).json({ errors: { global: err }}); return; }
       res.json({});
     })
   });
   
  
    app.use((req, res) => {
       res.status(404).json({
           errors: {
               global:"Still working on it."
           }
       })
    });
  
    
    const PORT = 8080;
   app.listen(PORT, () => console.log('Server is running on localhost:' + PORT)); 
   
    } else { console.log('database error, check server.js Mongo connect') }
});
