const path = require('path')
const Product = require('../models/product');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
var fileupload = require("express-fileupload");
app.use(fileupload());
// setting view engine
// userRoute.set('views', './views/service')
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));\

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const addProduct = async (req, res) => {

  let ts = Date.now();

  let date_time = new Date(ts);
  let date = date_time.getDate();
  let month = date_time.getMonth() + 1;
  let year = date_time.getFullYear();

  if (req.files) {
    let dataImage = req.files.image.data
    const data = req.body


    const product = new Product({
      productname: data.productname,
      image: dataImage,
      companyId: req.session.user_id,
      detail: data.detail,
      category: data.category,
      date: year + "-" + month + "-" + date,
      priceDetails: data.priceDetails,
      address: data.address,
      state: data.city_state,
      country: data.country,
      region: data.region,
      pincode: data.pincode,

    });

    const productData = await product.save()
    if (productData) {
      res.render('addProduct', { message: "your request has been successfully completed ", req: req })
    }
    else {
      res.render('addProduct', { message: "your request has been failed", req: req })

    }
  }

}


const getProduct = async (req, res) => {
  try {
    var search = '';

    var category = '';

    if (req.query.category) {
      category = req.query.category;
      console.log(category);
    }
    if (req.query.search) {
      search = req.query.search;
      // console.log(search);
    }
    var products = await Product.find({
      $or: [
        { productname: { $regex: '.*' + search + '.*', $options: 'i' } },

      ]
    });

    products = products.reverse()

    var newProduct = [];
    var p;
    if (category != '') {

      products.forEach(p => {
        if (p.category == category) {
          newProduct.push(p)
        }
      })

      products = newProduct;
    }

    var page = 0;

    if (req.query.page) {
      // console.log("YEs")
      page = req.query.page;
      page--
    }
    // console.log(page)

    if (page * 10 > products.length) {
      res.render('404')
    }

    const chunk = products.slice(page * 10, page * 10 + 10);

    var totalPage = Math.floor(products.length / 10) + 1;

    var currentPage = page + 1;
    // console.log(products)
    // res.render('temp',{image: data.toString('base64')})
    res.render('getProduct', { products: chunk, req: req, totalPage: totalPage, currentPage: currentPage, category: category })
  }
  catch (error) {
    res.redirect('/404')
    console.log(error.message);
  }

}

const oneProduct = async (req, res) => {
  const productId = req.query.id

  try {
    const product = await Product.findOne({ _id: productId });


    res.render('getOneProduct', { product: product, req: req })
  }
  catch (error) {
    res.redirect('/404')
    
    console.log(error.message);
  }
}

const deleteProduct = async (req, res) => {

  try {

    var product_id = req.query.id
    var cid = req.query.cid
    // console.log(product_id + " " + cid)
    if (cid == req.session.user_id) {

      var status = await Product.deleteOne({ _id: product_id });
      console.log(status)
    }
    res.redirect('/getProduct')
  }

  catch (error) {
    res.redirect('/404')
    
    console.log(error.message);
  }

}

module.exports = { addProduct, getProduct, oneProduct, deleteProduct }