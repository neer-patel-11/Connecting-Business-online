const express = require('express');
const generalRoute = express();
const { buysellRequest, buysellList, buysellProduct, deleteBSProduct } = require('../controllers/buysellcontroller');
const { sendMessage } = require('../controllers/contactcontroller');
const { addProduct, getProduct, oneProduct, deleteProduct } = require('../controllers/productcontroller');
const auth = require('../middleware/auth');
var fileupload = require("express-fileupload");
generalRoute.use(fileupload());
generalRoute.set('view engine', 'ejs');

generalRoute.get('/about', (req, res) => {
  res.render('about', { req: req })
});


generalRoute.get('/home', (req, res) => {
  res.render('home', { req: req })
});


generalRoute.get('/', (req, res) => {
  res.render('home', { req: req })
});


generalRoute.get('/service', (req, res) => {

  buysellList(req, res)

});


generalRoute.get('/getBSProduct', (req, res) => {

  buysellProduct(req, res)

});



generalRoute.get('/contact', (req, res) => {
  res.render('contact', { req: req, message: "If Mail received then message send successfully" })
});




generalRoute.post('/contact', (req, res) => {
  sendMessage(req, res)

});


generalRoute.get('/buysell', (req, res) => {
  console.log("buy")
  res.render('buysell', { req: req })
});



generalRoute.post('/buysell', auth.isLogin, buysellRequest);


generalRoute.get('/addProduct', (req, res) => {
  res.render('addProduct', { req: req })
});


generalRoute.post('/addProduct', auth.isLogin, addProduct)

generalRoute.post('/404', (req, res) => {
  res.render('404')
});

generalRoute.get('/404', (req, res) => {
  res.render('404')
});




generalRoute.get('/getProduct', (req, res) => {
  getProduct(req, res);

});

generalRoute.get('/oneProduct', auth.isLogin, oneProduct);

generalRoute.get('/deletProduct', auth.isLogin, deleteProduct);

generalRoute.get('/deletBSProduct', auth.isLogin, deleteBSProduct);





module.exports = generalRoute;
