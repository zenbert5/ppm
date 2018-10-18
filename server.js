/*
 * MEAN angular - (project) product manager
 * oct 16, 2018
 * shawn chen
 * codingDojo SJ
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const version = '1.0';

app.use(bodyParser.json());
app.use(express.static(__dirname + '/ppm/dist/ppm'));

app.listen(8000, function () {
    console.log(`product manager v.${version} - listening on port 8000`);
})

mongoose.connect('mongodb://localhost/coins', { useNewUrlParser: true });
const productSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Product title cannot be empty'], minlength: [4, 'Name must be 4 characters or longer'] },
    price: { type: Number, required: [true, 'Price cannot be empty'] },
    url: { type: String, required: [true, 'Image link cannot be blank'] }
}, { timestamps: true })

const Product = mongoose.model('products', productSchema);


// fetch all products
app.get('/allProducts', (req, res) => {
    Product.find({}, (err, data) => {
        if (err) {
            console.log('Encountered error getting all products');
            res.json(err);
        }
        else {
            console.log('Successfully fetched all products -> ', data);
            console.log(data);
            res.json(data);
        }
    })
})


// fetch one product based on id
app.get('/fetchProduct/:id', (req, res) => {
    Product.findOne({_id: req.params.id}, (err, data) => {
        if (err) {
            console.log('Encountered error fetching a product');
            res.json(err);
        }
        else {
            console.log('Successfully fetched product -> ', data);
            res.json(data);
        }
    })
})

// update a product
app.put('/updateProduct', (req, res) => {
    Product.findByIdAndUpdate({_id: req.body._id}, {$set: {title: req.body.title, price: req.body.price, url: req.body.url}}, (err, data) => {
        if (err) {
            console.log('Encountered error updating a product');
            res.json(err);
        }
        else {
            console.log('Successfully updated product -> ', data);
            res.json(data);
        }
    })
})

// destroy a product
app.delete('/destroy/:id', (req, res) => {
    Product.findByIdAndRemove({_id: req.params.id}, (err, data) => {
        if (err) {
            console.log('Encountered error deleting a product');
            res.json(err);
        }
        else {
            console.log('Successfully deleted a product -> ', data);
            res.json(data);
        }
    })
})

// route to add product 
app.post('/addProduct', (req, res) => {
    Product.create(req.body, (err, data) => {
        if (err) {
            console.log('Encountered error creating product');
            res.json(err);
        }
        else {
            console.log('Successfully added product -> ', data);
            res.json(data);
        }
    })
})

// resolve data to angular - index.html
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve('./ppm/dist/ppm/index.html'));
});