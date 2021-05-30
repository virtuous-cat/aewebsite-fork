const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require ('./models/product');

mongoose.connect('mongodb://localhost:27017/articulate-eyewear', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database Connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products })
})

app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.post('/products', async (req, res) => {
    const product = new Product(req.body.product);
    await product.save();
    res.redirect(`/products`)
})

app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product })
})

app.patch('/products/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, { ...req.body.product });
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products')
})

app.listen(3000, () => {
    console.log('Serving on 3000')
})