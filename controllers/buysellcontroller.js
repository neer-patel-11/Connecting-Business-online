const bsmodel = require('../models/buysellModel');
const path = require('path')
const express = require('express');
const app = express();
// setting view engine
// userRoute.set('views', './views/service')
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// current timestamp in milliseconds

const buysellRequest = async (req, res) => {

  let ts = Date.now();

  let date_time = new Date(ts);
  let date = date_time.getDate();
  let month = date_time.getMonth() + 1;
  let year = date_time.getFullYear();

  // // prints date & time in YYYY-MM-DD format
  // console.log(date_time)
  // console.log(year + "-" + month + "-" + date);

  const data = req.body;
  try {
    const BS = new bsmodel({
      companyId: req.session.user_id,
      productname: data.productname,
      detail: data.detail,
      category: data.category,
      quantity: data.quantity,
      contactname: data.contactname,
      email: data.email,
      contactnumber: data.contactnumber,
      address: data.address,
      state: data.city_state,
      country: data.country,
      region: data.region,
      pincode: data.pincode,
      date: year + "-" + month + "-" + date

    });

    const userData = await BS.save();
    if (userData) {

      res.render('buysell', { message: "your request has been successfully completed ", req: req })
    }
    else {
      res.render('buysell', { message: "your request has been failed", req: req })
    }
  } catch (error) {
    // console.log("hecjdncks")
    console.log(error.message);
    res.redirect('/404')
    
  }
}


const buysellList = async (req, res) => {
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
    var bsData = await bsmodel.find({
      $or: [
        { productname: { $regex: '.*' + search + '.*', $options: 'i' } }
      ]
    });
    bsData = bsData.reverse()
    var newBsData = [];
    var b;
    if (category != '') {

      bsData.forEach(b => {
        if (b.category == category) {
          newBsData.push(b)
        }
      })

      bsData = newBsData;
    }

    var page = 0;

    if (req.query.page) {
      // console.log("YEs")
      page = req.query.page;
      page--
    }
    console.log(page)

    if (page * 10 > bsData.length) {
      res.render('404')
    }

    const chunk = bsData.slice(page * 10, page * 10 + 10);
    // console.log(chunk)
    var totalPage = Math.floor(bsData.length / 10) + 1;

    var currentPage = page + 1;

    res.render('service', { bsData: chunk, req: req, totalPage: totalPage, currentPage: currentPage, category: category })
  }
  catch (error) {
    console.log(error.message);
    res.redirect('/404')
    
  }

}

const buysellProduct = async (req, res) => {
  const productId = req.query.id

  try {
    const bsData = await bsmodel.findOne({ _id: productId });


    res.render('getBSProduct', { bsData: bsData, req: req })
  }
  catch (error) {
    console.log(error.message);
    res.redirect('/404')
    
  }

}

const deleteBSProduct = async (req, res) => {
  try {
    var product_id = req.query.id
    // console.log(product_id)
    var status = await bsmodel.deleteOne({ _id: product_id });
    console.log(status)
    res.redirect('/service')
  }

  catch (error) {
    console.log(error.message);
    res.redirect('/404')
    
  }

}


module.exports = { buysellRequest, buysellList, buysellProduct, deleteBSProduct }