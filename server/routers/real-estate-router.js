
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RentalSchema = new Schema({rent: Number, sqft: Number, city: String});
var ListingSchema = new Schema({cost: Number, sqft: Number, city: String});

var Rental = mongoose.model('Rentals', RentalSchema, 'rentals');
var Listing = mongoose.model('Listings', ListingSchema, 'listings');


//Rentals Routes:
router.get('/rentals', function(req, res) {
  Rental.find({}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops');
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});

router.post('/rentals', function(req, res) {
  console.log(req.body);
  var property = new Rental(req.body);
  property.save(function(err, data) {
    if (err) {
      console.log('ooooops');
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/rentals/:id', function(req, res) {
  var propertyId = req.params.id;
  //the _id needn't be in quotes, but if the thing's name had a dot, we would need quotes:
  Rental.findByIdAndRemove({"_id": propertyId}, function(err, data) {
    if (err) {
      console.log('noooo');
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/rentals/:id', function(req, res) {
  var propertyId = req.params.id;
  console.log(req.body);

  Rental.findByIdAndUpdate({"_id": propertyId}, {
    "rent": req.body.rent,
    "sqft": req.body.sqft,
    "city": req.body.city
  }, function(err, data) {
    if (err) {
      console.log('noooo', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


//Listing Routes:
router.get('/listings', function(req, res) {
  Listing.find({}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops');
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});

router.post('/listings', function(req, res) {
  console.log(req.body);
  var property = new Listing(req.body);
  property.save(function(err, data) {
    if (err) {
      console.log('ooooops');
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});



module.exports = router;
