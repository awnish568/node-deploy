require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());
const productRouter = require('./routes/product')


// Deploying MERN app on live cloud server
// Till now we have used the absolute path in the react app to get the database from the server to deploy on live server
// but this will not be valid when deploying in live server as domain name will change from localhost to something else
// so we will delete the part http://localhost:8080 and now the url contains part starting with slash ie
// ('http://localhost:8080/products'  into  '/products') so they will add the root directory in front of themselves
// And since we have now made some changes in our code so again we will have to make its build and add to NodeJS
// Note that even if we have changed the url then also code works for local database. strange!!

// Till now we used local mongoDB database server and used following code to connect to local mongoDB database server 
// main().catch(err => console.log(err));
// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
//   console.log('database connected')
// }

// but now we will connect to the mongoDB atlas(online database). To connect to the altas we use following code
// also since url is a sensitive info so we also hide it like below
main().catch(err => console.log(err));
async function main() {
  // await mongoose.connect('mongodb+srv://akm_8480:DuVzX4568VD69jkN@cluster0.dqgpm7m.mongodb.net/ecommerce?retryWrites=true&w=majority');
  // Instead of above code we use the following to hide url
  await mongoose.connect(process.env.MONGO_URL);
  console.log('database connected')
}


server.use('/products', productRouter.router);
// above line of code hosts the mongoDB atlas server database at http://localhost:8080/products

server.use(express.static('build'));     //  Connecting API with React

const path = require('path')
server.use('*', (req, res) => {        // route for addProduct
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})



server.listen(process.env.PORT, () => {
  console.log('server started');
});  



// To deploy on the versel we go to option add new project in versel. then we fill project name and set the environment
// variables as .env file is not uploaded on github (like node_modiles) for safety puprpses. generally we don't need to add
// port to the environment variable on versel becoz they themselves create it

// note that when we deploy on the versel and if any error occurs (visiting the functions option under deployments tab
// we get errors) then we need to edit the code in vs code and upload to github(and from there versel automatically deploy
// it again). This process of figuring out error and edtiting is very tiresome.

// note that vercel have its own configuration and if we don't add this to our project then our deployment will not
// work propelry eg if we have public directory in the project then it will simply staticallly host it instead of 
// deploying the nodeJS application
// Inside the configuration we have two things - builds and routes.
// build tells all the server types. Inside build we say that dynamic server is node and build is static
// routes tells that if url starts with slash then go to the destination given with route.
// and now since w ehave decided staic and dynamic differently so in routing we now have to decide which should go to the
// nodeJS or should go to the static
// eg here if route is /products or /products/(.*) then go to index.js (ie dynamic) but if route is (.*) ie anything else
// than /products or /products/(.*) then go to build(ie static)
// above (.*) means any url