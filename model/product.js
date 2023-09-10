const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema
// It is used to store information and apply conditions for the type of data that we store on the database,
// The permitted Schema Types are: String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, UUID
// Number can also contain decimal numbers eg 7.9
// For URL the data type is string

// const productSchema = new Schema({
//   title: { type: String },
//   description: String,   // note when we have only one field then we can avoid writing the word -> "type"
//   price: { type: Number },
//   discountPercentage: { type: Number },
//   rating: { type: Number}, 
//   brand: { type: String}, 
//   category: { type: String },
//   thumbnail: { type: String },
//   images: [String]  // it is representing array of strings
// });

// note that in the above schema we haven't put any validations, now lets put some
// required means if we don't pass this data set then it will throw error
const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, min: [0, 'wrong price'], required: true },
  discountPercentage: { type: Number, min: [0, 'wrong min discount'], max: [50, 'wrong max discount'] },
  rating: { type: Number, min: [0, 'wrong min rating'], max: [5, 'wrong max rating'], default:0 },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [String]
});

// Model
// Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document.
// Models are responsible for creating and reading documents from the underlying MongoDB database.

// When you call mongoose.model() on a schema, Mongoose compiles a model for you.
exports.Product = mongoose.model('Product', productSchema);
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the
// plural, lowercased version of your model name. Thus, for the example above, the model Product is for the products
// collection in the database.
// note here above line is showing that the schema for product collection is going to be productSchema.
// may be other collecton will have the same schema [ie why we created models]
// The .model() function makes a copy of schema

// the above created Product variable contains all the info about product collection and using it now we can
// perform the CRUD operations and it will be saved to the database. we don't need to now directly interact
// with the database using query in terminal. this is possible as we have connected mongoose to databsae earlier.