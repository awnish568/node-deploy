const model = require('../model/product')
const Product = model.Product;
const mongoose = require('mongoose');

// // CREATE
// exports.createProduct = (req, res) => {
//   const product = new Product();  // as soon as we use new keyword an instance(empty copy) get created
//   product.title = 'Phonex21';
//   product.price = 99932;
//   product.rating = 4;
//   // To save this data into the database we need to use save command like previously we used push command.
//   product.save((err, doc) => {
//     console.log({ err, doc })
//     res.status(201).json(doc);
//   })
// };

// Instead of writing the data here we will try to fetch this data from req.body as API 
exports.createProduct = (req, res) => {
  const product = new Product(req.body);  // as soon as we use new keyword an instance(empty copy) get created
  product.save((err, doc) => {        // finding the error usinh callback fn
    console.log({ err, doc })
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(doc);
    }
  })
};

// // note only in create we need to use new keyword to create an instance as we creating a new product. In all other
// // operations we will apply query directly to product model

// READ
exports.getAllProducts = async (req, res) => {    // if we don't write async then it gives error
  // const products = await Product.find({ price: { $gt: 500 } });
  const products = await Product.find();
  res.json(products);
};

exports.getProduct = async (req, res) => {
  // console.log(req.params.id);
  const id = req.params.id;
  // const id =  + req.params.id;          // don't use + sign
  // Earlier we were using + sign to convert the string to number but here we are not using +. This is because here we are
  // using the unique id created by database while requesting in the postman/browser not the id from the data. So if we try
  // to convert this id into number its output will be NaN ie not a number because this id (eg 64b2ff2922e1575a93ac45a2)
  // not only contains digit but also alphabets so it gives output as NaN.
  console.log(id)
  // const product = await Product.find(p => p._id === id);
  // above statement gives error (as it is JS (i think)) but any of the below can be used
  // const product = await Product.findById(id);         // mostly preffered
  // const product = await Product.findById(id).exec();
  const product = await Product.findOne({ _id: id });
  // const product = await Product.findById(mongoose.Types.ObjectId(id))
  res.json(product);
};

exports.replaceProduct = async (req, res) => {s
  const id = req.params.id;
  try{                                      // finding the error using try catch method instead of callback fn
  const doc = await Product.findOneAndReplace({_id:id},req.body,{new:true})
  // in findOneAndReplace method first parameter is for filter, second for replacement, third is options which returns
  // old document if false else return new doc
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};

// // UPDATE
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await Product.findOneAndUpdate({_id:id},req.body,{new:true})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};

// // DELETE
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await Product.findOneAndDelete({_id:id})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};

// therefore we observed that we can perform all the CRUD operation using mongoose also. like we did earlier with 
// terminal directly. benefit is that we use validations (using schemas) which return us custom error and we can use
// this to display in the client frontend which was not possible if we don't use mongoose. so database is created in
// very safe way