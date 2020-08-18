// routes.js

const express = require("express");

// express.Router() : Routing refers to how an application's endpoints (URIs) respond to client requests.
// You define routing using methods of the Express app object that correspond to HTTP methods.

const router = express.Router();
const Product = require("../model/product");

// retrieving products list
router.get("/products", (req, res, next) => {
  // res.send("<h1>Retrieving the products list</h1>");

  Product.find(function (err, products) {
    if (err) console.log("routes.js: err to 'find()' products : ", err);
    res.json(products);
  });
});

// add product
router.post("/product", (req, res, next) => {
  // logic to add product

  let newProduct = new Product({
    prodId: req.body.prodId,
    prodName: req.body.prodName,
    price: req.body.price,
  });

  // mongo
  newProduct.save((err, product) => {
    console.log("routes->save(): product : ", product);
    if (err) {
      res.json({ msg: "Failed to add Product" });
    } else {
      //  'msg' for api testing
      //  res.json({ msg: "Product added successfully...!" });

      // or

      // res new product with '_id'
      res.json(product);

      // or

      // fetch all records for new updates
      // Product.find(function (err, products) {
      //   if (err) console.log("routes.js: err to 'find()' products : ", err);
      //   res.json(products);
      // });
    }
  });
});

// delete product
router.delete("/product/:id", (req, res, next) => {
  // logic to delete product

  Product.remove({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// update prod
router.put("/product/:id", (req, res, next) => {
  console.log("req", req.body);
  // logic to update product

  Product.findOne({ _id: req.params.id }, function (err, product) {
    if (err) {
      res.json(err);
    } else {
      product.prodId = req.body.prodId;
      product.prodName = req.body.prodName;
      product.price = req.body.price;

      product.save((err, product) => {
        console.log("findOne->save(): product : ", product);
        if (err) {
          res.json({ msg: "Failed to update Product" });
        } else {
          //  'msg' for api testing
          //  res.json({ msg: "Product updated successfully...!" });

          // or

          // res updated product with '_id'
          res.json(product);

          // or

          // fetch all records for new updates
          // Product.find(function (err, products) {
          //   if (err) console.log("routes.js: err to 'find()' products : ", err);
          //   res.json(products);
          // });
        }
      });
      // res.json(product);
    }
  });
});

module.exports = router;
