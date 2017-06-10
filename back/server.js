import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

const app = express();

const dbName = 'vkgirls';
const dbUrl = 'mongodb://localhost:27017/' + dbName;

/*
function validate(data) {
    app.use(bodyParser());
    let errors = {};
    if (data.title === '') errors.title = "Can't be empty";
    if (data.cover === '') errors.cover = "Can't be empty";
    const isValid = Object.keys(errors).length === 0
    
    return { errors, isValid };
    
}*/


mongodb.MongoClient.connect(dbUrl, function(err,db) {
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator()); // this line must be immediately after any of the bodyParser middlewares!

    app.get('/', (req, res) => {
       db.collection('girls').find({}).toArray((err, girls) => {
           if (err) throw err;
           res.json({girls});
       }) 
    });
    
    
    app.get('/db/girls', (req,res) => {
        db.collection('girls').find({}).toArray((err,girls) => {
            console.log('Database vkgirls, Collection girls')
           res.json({girls});
        });
    });
    
    app.post('/db/girls', (req, res) => {
        
        
        //const {errors, isValid } = validate(req.body);
        
        
        req.checkBody('name', 'Invalid title').notEmpty().isAlpha();
        
        /*req.checkBody('city', 'Invalid city name').isAlpha();
        req.checkBody('country', 'Invalid country name').isAlpha();
        req.checkBody('coverUrl', 'Invalid URL').notEmpty().isURL();*/
        
        
        var inValid = req.validationErrors();
        

        console.log(req.getValidationResult());
        
        
    })
    
    /*
    app.put('/db/girls/:_id', (req, res) => {
       const { errors, isValid } = validate(req.body); 
       
       if (isValid) {
           const { title, cover } = req.body;
           db.collection('girls').findOneAndUpdate(
           { _id: new mongodb.ObjectId(req.params._id) },
           { $set:{ title, cover } },
           { returnOriginal: false },
           (err, result) => {
               if (err) { res.status(500).json({ errors: { global: err }}); return; }
               
               res.json({ game: result.value });
           }
       );
       } else {
           res.status(400).json({ errors });
       }
       
    });*/
    
    app.get('/db/girls/:_id', (req, res) => {
     db.collection('girls').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, game) => {
        if(err) throw err;
       res.json({ game });
     })
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
});
