const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
// const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use('/', express.static("public"));

var urlPath = path.join(__dirname, '/public');

app.get("/", function (req, res) {
  res.sendFile(urlPath + '/home.html');
})

var login = true;

var validatelogin = (req, res, next) => {
  if (!login) {
    res.redirect("/login");
  }

  next();
};

app.use('/dashboard', validatelogin, express.static(__dirname + '/client/build'));

app.get('/dashboard*', function (req, res) {
  res.sendFile(path.join(__dirname, '/client/build') + '/index.html');
}
);

app.get("/login", function (req, res) {
  res.render("login", { title: "login" });
});

app.get("/logout", function (req, res) {
  res.render("logout", { title: "logout" });
});

app.get("/freight_forwarding_contact_form", function (req, res) {
  res.render("freight_forwarding_form");
});


const mongodb = 'mongodb+srv://admin:admin@innovantage@cluster0.0sxn0.mongodb.net/innovantage-db?retryWrites=true&w=majority';

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const freightSchema = new Schema({
  _id: { type: String },
  service: { type: String },
  status: { type: String },
  shipment_type: { type: String },
  delivery_incoterms: { type: String },
  user_name: { type: String },
  user_address: { type: String },
  user_country_code: { type: String },
  user_phone_number: { type: String },
  user_email_address: { type: String },
  shipment_address: { type: String },
  code: { type: String },
  shipment_country_code: { type: String },
  shipment_phone_number: { type: String },
  shipment_from: { type: String },
  origin_port: { type: String },
  shipment_to: { type: String },
  destination_port: { type: String },
  shipment_mode: { type: String },
  commodity_name: { type: String },
  commodity_type: { type: String },
  container_type: { type: String },
  shipment_volume: { type: String }
});

const Freight = mongoose.model('User', freightSchema);

const customSchema = new Schema({
  _id: { type: String },
  service: { type: String },
  status: { type: String },
  user_name: { type: String },
  user_address: { type: String },
  user_country_code: { type: String },
  user_phone_number: { type: String },
  user_email_address: { type: String },
});

const Custom = mongoose.model('Custom', customSchema);

function getRandomId(type) {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 9);
  var randomId = nanoid();

  if (type == "freight")
    randomId = 'F' + randomId;

  else if (type == "custom")
    randomId = 'C' + randomId;

  else if (type == "transport")
    randomId = 'T' + randomId;

  else if (type == "warehouse")
    randomId = 'W' + randomId;

  else if (type == "value")
    randomId = 'V' + randomId;

  return randomId;
}

// console.log(getRandomId("value"));

app.post("/freight_forwarding_contact_form", function (req, res) {

  const freightUser = new Freight({

    _id: getRandomId("freight"),
    service: "Freight Forwarding",
    status: "Not Assigned",
    shipment_type: req.body.shipmentType,
    delivery_incoterms: req.body.deliveryIncoterms,
    user_name: req.body.userName,
    user_address: req.body.userAddress,
    user_country_code: req.body.userPhoneCode,
    user_phone_number: req.body.userPhone,
    user_email_address: req.body.userEmail,
    shipment_address: req.body.pickupAddress,
    code: req.body.pickupCode,
    shipment_country_code: req.body.pickupPhoneCode,
    shipment_phone_number: req.body.pickupPhone,
    shipment_from: req.body.pickupFrom,
    origin_port: req.body.originPort,
    shipment_to: req.body.dropTo,
    destination_port: req.body.destinationPort,
    shipment_mode: req.body.shipmentMode,
    commodity_name: req.body.commodityName,
    commodity_type: req.body.commodityType,
    container_type: req.body.containerType,
    shipment_volume: req.body.shipmentVolume
  });

  freightUser.save(function (err, data) {
    if (err)
      res.send("An Error Occured! Please try again.");

    else
      res.send("Data received");
  });
});

app.post("/custom_clearance_contact_form", function (req, res) {
  const customUser = new Custom({
    _id: getRandomId("custom"),
    service: "Custom Clearance",
    user_name: req.body.userName,
    user_address: req.body.userAddress,
    user_country_code: req.body.userPhoneCode,
    user_phone_number: req.body.userPhone,
    user_email_address: req.body.userEmail
  });

  customUser.save(function (err, data) {
    if (err)
      res.send("An Error Occured! Please try again.");

    else
      res.send("Data received");
  });
});


app.get("/api/count/freight_forwarding", function (req, res) {
  Freight.find().countDocuments(function (err, data) {
    if (err)
      res.send(err);

    else
      res.json(data);
  });
});

app.get("/api/freight_forwarding", function (req, res) {
  Freight.find({}, function (err, data) {
    if (err)
      res.send(err);

    else {
      res.send(data);
      console.log(data);
    }
  });
});

app.get("/api/freight_forwarding/:page", function (req, res) {

  var page = req.params.page;
  var pageSize = 10;
  var skipCount = (page - 1) * pageSize;

  Freight.find({}).skip(skipCount).limit(pageSize).exec(function (err, data) {

    console.log(data);

    if (err)
      res.send(err);

    else
      res.send(data);
  });
});

app.get("/api/freight_forwarding/:id", function (req, res) {
  var id = req.params.id;

  Freight.find({ _id: id }, function (err, data) {
    if (err)
      res.send(err);

    else {
      res.send(data);
      console.log(data);
    }
  });
});


app.get("/api/custom_clearance", function (req, res) {
  Custom.find({}, function (err, data) {
    if (err)
      res.send(err);

    else {
      res.send(data);
      console.log(data);
    }
  });
})


app.get("/api/search/:id", function (req, res) {
  const requestedQueryId = req.params.id;

  var queryType = requestedQueryId.charAt(0);
  console.log(queryType);

  if (queryType == 'F') {
    Freight.find({ $and: [{ _id: requestedQueryId }, { _id: { $exists: true } }] }, function (err, data) {

      if (err)
        res.send([]);

      else {
        console.log(data);
        res.json(data);
      }

    });
  }

  else if (queryType == 'C') {

  }

  else if (queryType == 'T') {

  }

  else if (queryType == 'W') {

  }

  else if (queryType == 'V') {

  }

  else
    res.send([]);

});

app.post("/api/editData", function (req, res) {

  var requestedId = req.body.id;

  Freight.findOne({ id: requestedId }, function (err, data) {
    data.shipment_type = req.body.shipmentType;
    data.delivery_incoterms = req.body.deliveryIncoterms;
    data.user_name = req.body.userName;
    data.user_address = req.body.userAddress;
    data.user_country_code = req.body.userPhoneCode;
    data.user_phone_number = req.body.userPhone;
    data.user_email_address = req.body.userEmail;
    data.shipment_address = req.body.pickupAddress;
    data.code = req.body.pickupCode;
    data.shipment_country_code = req.body.pickupPhoneCode;
    data.shipment_phone_number = req.body.pickupPhone;
    data.shipment_from = req.body.pickupFrom;
    data.origin_port = req.body.originPort;
    data.shipment_to = req.body.dropTo;
    data.destination_port = req.body.destinationPort;
    data.shipment_mode = req.body.shipmentMode;
    data.commodity_name = req.body.commodityName;
    data.commodity_type = req.body.commodityType;
    data.container_type = req.body.containerType;
    data.shipment_volume = req.body.shipmentVolume;

    data.save(function (err, result) {
      if (err)
        res.send("An Error Occured! Please try again.");

      else
        res.send("Data updated");
    });
  });

});

app.get("/api/delete/:id", function (req, res) {

  const requestedQueryId = req.params.id;
  var queryType = requestedQueryId.charAt(0);

  if (queryType == 'F') {
    Freight.findByIdAndDelete(requestedQueryId, function (err, data) {
      if (err)
        res.send(err);

      else
        // res.send(data);
        res.send("Data deleted successfully");
    });
  }

  else if (queryType == 'C') {

  }

  else if (queryType == 'T') {

  }

  else if (queryType == 'W') {

  }

  else if (queryType == 'V') {

  }
});

app.post("/api/changeStatus", function (req, res) {
  var requestedId = req.body.id;
  console.log(requestedId);

  var idType = requestedId.charAt(0);

  if (idType == 'F') {
    // console.log(req.body.value);
    Freight.findOneAndUpdate({ _id: requestedId }, { status: req.body.value }, { new: true }, function (err, result) {
      if (err)
        res.send("Error");

      else
        res.send("Success");
    });
  }

  else if (idType == 'C') {

  }

  else if (idType == 'T') {

  }

  else if (idType == 'F') {

  }

  else if (idType == 'W') {

  }

  else if (idType == 'V') {

  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("Server running on localhost:" + PORT);
});
