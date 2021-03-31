// call all the required packages
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const fs = require('fs');
const { ObjectId } = require('mongodb');
const cors = require('cors');

//CREATE EXPRESS APP
app.use(bodyParser.urlencoded({ extended: true }));
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    },
});

var upload = multer({ storage: storage });

// ROUTES
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
});

//Uploading multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files;
    if (!files) {
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(files);
});

app.post('/uploadphoto', upload.single('photo'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database

    var finalImg = {
        contentType: req.file.mimetype,
        image: new Buffer(encode_image, 'base64'),
    };
    db.collection('photo').insertOne(finalImg, (err, result) => {
        console.log(result);

        if (err) return console.log(err);

        console.log('saved to database');
        // res.redirect('/photo/' + result.insertedId);
        res.json({ photo: result.insertedId });
    });
});

app.get('/photos', (req, res) => {
    db.collection('photo')
        .find()
        .toArray((err, result) => {
            const imgArray = result.map((element) => element._id);
            console.log(imgArray);

            if (err) return console.log(err);
            res.send(imgArray);
        });
});

app.get('/photo/:id', (req, res) => {
    var filename = req.params.id;

    db.collection('photo').findOne(
        { _id: ObjectId(filename) },
        (err, result) => {
            if (err) return console.log(err);

            res.contentType('image/jpeg');
            res.send(result.image.buffer);
        }
    );
});

// app.listen(5001, () => console.log('Server started on port 3000'));

const MongoClient = require('mongodb').MongoClient;
const myurl =
    'mongodb+srv://nhom_15:cuongtruongduongthang@cluster0.3hlz6.mongodb.net/cafe?retryWrites=true&w=majority';

MongoClient.connect(
    myurl,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    (err, client) => {
        if (err) return console.log(err);
        db = client.db('photo');
        app.listen(5001, () => {
            console.log('listening on 5001');
        });
    }
);
