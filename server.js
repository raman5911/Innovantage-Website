const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const {
  customAlphabet
} = require("nanoid");
// const axios = require("axios");
require("dotenv").config();

const sendMailToAdmin = require("./sendMailToAdmin");
const sendMailToUser = require("./sendMailToUser");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use('/', express.static("public"));
app.use('/public/images/', express.static('./public/images'));


var urlPath = path.join(__dirname, '/public');

app.get("/", function (req, res) {
  res.sendFile(urlPath + '/home.html');
})


// const verifyToken = (req, res, next) => {
//   const token = req.body.token || req.query.token || req.headers["x-access-token"];
// };

var login = false;

var validatelogin = (req, res, next) => {
  if (!login) {
    res.redirect("/login");
  }

  next();
};

app.use('/dashboard', validatelogin, express.static(__dirname + '/client/build'));

app.get('/dashboard*', function (req, res) {
  res.sendFile(path.join(__dirname, '/client/build') + '/index.html');
});

app.get("/login", function (req, res) {
  res.render("login", {
    loginError: false
  });
});

app.get("/logout", function (req, res) {
  login = false;
  res.render("login", {
    loginError: false
  });
});

app.get("/freight_forwarding_contact_form", function (req, res) {
  res.render("freight_forwarding_form");
});

app.get("/custom_clearance_contact_form", function (req, res) {
  res.render("custom_clearance_form");
});

app.get("/warehouse_management_contact_form", function (req, res) {
  res.render("warehouse_management_form");
});

app.get("/transportation_management_contact_form", function (req, res) {
  res.render("transportation_management_form");
});

app.get("/value_added_services_contact_form", function (req, res) {
  res.render("value_added_form");
});


// app.get("/success", function (req, res) {
//   res.render("submission_success");
// });

// app.get("/fail", function (req, res) {
//   res.render("submission_fail");
// });


const mongodb = 'mongodb+srv://admin:admin@innovantage@cluster0.0sxn0.mongodb.net/innovantage-db?retryWrites=true&w=majority';

mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  token: {
    type: String
  }
});

const Admin = mongoose.model('Admin', adminSchema)

app.post("/login", function (req, res) {
  let foundUser = false;
  let emailInput = req.body.email;
  let passwordInput = req.body.password;
  console.log(emailInput);
  Admin.findOne({
    email: emailInput
  }, function (err, user) {
    if (user) {
      console.log(user);
      foundUser = true;
    }

    if (foundUser) {
      bcrypt.compare(passwordInput, user.password, function (err, result) {
        if (result) {

          // const token = jwt.sign({
          //     email: user.email
          //   },
          //   process.env.TOKEN_KEY

          // );

          // {
          //   expiresIn: 10000
          // }

          // user.token = token;

          login = true;
          // res.redirect("/dashboard/home");

          res.redirect("/dashboard/freight_forwarding");
        } else {
          res.render("login", {
            loginError: true
          });
        }
      });
    } else {
      res.render("login", {
        loginError: true
      });
    }
  });
});

const freightSchema = new Schema({
  _id: {
    type: String
  },
  service: {
    type: String
  },
  status: {
    type: String
  },
  shipment_type: {
    type: String
  },
  delivery_incoterms: {
    type: String
  },
  user_name: {
    type: String
  },
  user_address: {
    type: String
  },
  user_country_code: {
    type: String
  },
  user_phone_number: {
    type: String
  },
  user_email_address: {
    type: String
  },
  shipment_address: {
    type: String
  },
  code: {
    type: String
  },
  shipment_country_code: {
    type: String
  },
  shipment_phone_number: {
    type: String
  },
  shipment_from: {
    type: String
  },
  origin_port: {
    type: String
  },
  shipment_to: {
    type: String
  },
  destination_port: {
    type: String
  },
  shipment_mode: {
    type: String
  },
  commodity_name: {
    type: String
  },
  commodity_type: {
    type: String
  },
  container_type: {
    type: String
  },
  gross_weight: {
    type: String
  },
  number_of_packages: {
    type: String
  },
  total_volume: {
    type: String
  }
});

const Freight = mongoose.model('Freight', freightSchema, 'users');

const customSchema = new Schema({
  _id: {
    type: String
  },
  service: {
    type: String
  },
  status: {
    type: String
  },
  shipment_type: {
    type: String
  },
  user_name: {
    type: String
  },
  user_address: {
    type: String
  },
  user_country_code: {
    type: String
  },
  user_phone_number: {
    type: String
  },
  user_email_address: {
    type: String
  },
  shipment_address: {
    type: String
  },
  code: {
    type: String
  },
  shipment_country_code: {
    type: String
  },
  shipment_phone_number: {
    type: String
  },
  shipment_from: {
    type: String
  },
  origin_port: {
    type: String
  },
  shipment_to: {
    type: String
  },
  destination_port: {
    type: String
  },
  shipment_mode: {
    type: String
  },
  commodity_name: {
    type: String
  },
  container_type: {
    type: String
  },
  gross_weight: {
    type: String
  },
  number_of_packages: {
    type: String
  },
  total_volume: {
    type: String
  },
  shipment_per_month: {
    type: String
  }
});

const Custom = mongoose.model('Custom', customSchema, 'users');

const transportSchema = new Schema({
  _id: {
    type: String
  },
  service: {
    type: String
  },
  status: {
    type: String
  },
  user_name: {
    type: String
  },
  user_address: {
    type: String
  },
  user_country_code: {
    type: String
  },
  user_phone_number: {
    type: String
  },
  user_email_address: {
    type: String
  },
  pickup_address: {
    type: String
  },
  destination_address: {
    type: String
  },
  vehicle_type: {
    type: String
  },
  vehicle_size: {
    type: String
  },
  packing_type: {
    type: String
  },
  other_specs: {
    type: String
  },
  package_per_unit: {
    type: String
  },
  package_weight: {
    type: String
  },
  shipment_weight: {
    type: String
  },
  measurement_unit: {
    type: String
  },
  length: {
    type: String
  },
  width: {
    type: String
  },
  height: {
    type: String
  }
});

const Transport = mongoose.model('Transport', transportSchema, 'users');

const warehouseSchema = new Schema({
  _id: {
    type: String
  },
  service: {
    type: String
  },
  status: {
    type: String
  },
  user_name: {
    type: String
  },
  user_address: {
    type: String
  },
  user_country_code: {
    type: String
  },
  user_phone_number: {
    type: String
  },
  user_email_address: {
    type: String
  },
  warehouse_city: {
    type: String
  },
  specific_location: {
    type: String
  },
  covered_area: {
    type: String
  },
  open_area: {
    type: String
  },
  commodity_storage: {
    type: String
  },
  infrastructure_options: {
    type: String
  },
  manpower_options: {
    type: String
  },
  security_options: {
    type: String
  },
  other_requirements: {
    type: String
  },
  work_scope: {
    type: String
  },
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema, 'users');

const valueAddedSchema = new Schema({
  _id: {
    type: String
  },
  service: {
    type: String
  },
  status: {
    type: String
  },
  user_name: {
    type: String
  },
  user_address: {
    type: String
  },
  user_country_code: {
    type: String
  },
  user_phone_number: {
    type: String
  },
  user_email_address: {
    type: String
  },
  service_type: {
    type: String
  }
});

const ValueAdded = mongoose.model('Value Added', valueAddedSchema, 'users');

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
    gross_weight: req.body.grossWeight,
    number_of_packages: req.body.numOfPkg,
    total_volume: req.body.totalVolume
  });

  freightUser.save(function (err, data) {
    if (err)
      res.render("submission_fail");

    else {
      res.render("submission_success");
      sendMailToAdmin(data);
      sendMailToUser(data);
    }
  });
});

app.post("/custom_clearance_contact_form", function (req, res) {
  const customUser = new Custom({
    _id: getRandomId("custom"),
    service: "Custom Clearance",
    status: "Not Assigned",
    shipment_type: req.body.shipmentType,
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
    container_type: req.body.containerType,
    gross_weight: req.body.grossWeight,
    number_of_packages: req.body.numOfPkg,
    total_volume: req.body.totalVolume,
    shipment_per_month: req.body.numOfShip
  });

  customUser.save(function (err, data) {
    if (err)
      res.render("submission_fail");

    else {
      res.render("submission_success");
      sendMailToAdmin(data);
      sendMailToUser(data);
    }
  });
});

app.post("/transportation_management_contact_form", function (req, res) {

  const transportUser = new Transport({
    _id: getRandomId("transport"),
    service: "Transportation Management",
    status: "Not Assigned",
    user_name: req.body.userName,
    user_address: req.body.userAddress,
    user_country_code: req.body.userPhoneCode,
    user_phone_number: req.body.userPhone,
    user_email_address: req.body.userEmail,
    pickup_address: req.body.pickupAddress,
    destination_address: req.body.destAddress,
    vehicle_type: req.body.vehicleType,
    vehicle_size: req.body.vehicleSize,
    packing_type: req.body.packingType,
    other_specs: req.body.otherSpecs,
    package_per_unit: req.body.packagePerUnit,
    package_weight: req.body.packageWt,
    shipment_weight: req.body.shipmentWt,
    measurement_unit: req.body.measurementUnit,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
  });

  transportUser.save(function (err, data) {
    if (err)
      res.render("submission_fail");

    else {
      res.render("submission_success");
      sendMailToAdmin(data);
      sendMailToUser(data);
    }
  })
});

app.post("/warehouse_management_contact_form", function (req, res) {
  const warehouseUser = new Warehouse({
    _id: getRandomId("warehouse"),
    service: "Warehouse Management",
    status: "Not Assigned",
    user_name: req.body.userName,
    user_address: req.body.userAddress,
    user_country_code: req.body.userPhoneCode,
    user_phone_number: req.body.userPhone,
    user_email_address: req.body.userEmail,
    warehouse_city: req.body.warehouseCity,
    specific_location: req.body.specificLocation,
    covered_area: req.body.coveredArea,
    open_area: req.body.openArea,
    commodity_storage: req.body.commodityStorage,
    infrastructure_options: req.body.infraOptions,
    manpower_options: req.body.manpowOptions,
    security_options: req.body.securityOptions,
    other_requirements: req.body.otherReq,
    work_scope: req.body.workScope
  });

  warehouseUser.save(function (err, data) {
    if (err)
      res.render("submission_fail");

    else {
      res.render("submission_success");
      sendMailToAdmin(data);
      sendMailToUser(data);
    }
  });
});

app.post("/value_added_services_contact_form", function (req, res) {
  const valueAddedUser = new ValueAdded({
    _id: getRandomId("value"),
    service: "Value Added Services",
    status: "Not Assigned",
    user_name: req.body.userName,
    user_address: req.body.userAddress,
    user_country_code: req.body.userPhoneCode,
    user_phone_number: req.body.userPhone,
    user_email_address: req.body.userEmail,
    service_type: req.body.serviceType
  });

  valueAddedUser.save(function (err, data) {
    if (err)
      res.render("submission_fail");

    else {
      res.render("submission_success");
      sendMailToAdmin(data);
      sendMailToUser(data);
    }
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
  Freight.find({
    service: "Freight Forwarding"
  }, function (err, data) {
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

  Freight.find({
    _id: id
  }, function (err, data) {
    if (err)
      res.send(err);

    else {
      res.send(data);
      console.log(data);
    }
  });
});

app.get("/api/custom_clearance/:id", function (req, res) {
  var id = req.params.id;

  Custom.find({
    _id: id
  }, function (err, data) {
    if (err)
      res.send(err);

    else {
      res.send(data);
      console.log(data);
    }
  });
});

app.get("/api/warehouse_management/:id", function (req, res) {
  var id = req.params.id;

  Warehouse.find({
    _id: id
  }, function (err, data) {
    if (err)
      res.send(err);

    else {
      res.send(data);
      console.log(data);
    }
  });
});

app.get("/api/transportation_management/:id", function (req, res) {
  var id = req.params.id;

  Transport.find({
    _id: id
  }, function (err, data) {
    if (err)
      res.send(err);

    else {
      res.send(data);
      console.log(data);
    }
  });
});

app.get("/api/value_added_services/:id", function (req, res) {
  var id = req.params.id;

  ValueAdded.find({
    _id: id
  }, function (err, data) {
    if (err)
      res.send(err);

    else {
      res.send(data);
      console.log(data);
    }
  });
});

app.get("/api/custom_clearance", function (req, res) {
  Custom.find({
    service: "Custom Clearance"
  }, function (err, data) {
    if (err)
      res.send(err);

    else {
      res.send(data);
      console.log(data);
    }
  });
});

app.get("/api/transportation_management", function (req, res) {
  Transport.find({
    service: "Transportation Management"
  }, function (err, data) {
    if (err)
      res.send(err);

    else {
      res.send(data);
      console.log(data);
    }
  });
});

app.get("/api/warehouse_management", function (req, res) {
  Warehouse.find({
    service: "Warehouse Management"
  }, function (err, data) {
    if (err)
      res.send(err);

    else {
      res.send(data);
      console.log(data);
    }
  });
});

app.get("/api/value_added_services", function (req, res) {
  ValueAdded.find({
    service: "Value Added Services"
  }, function (err, data) {
    if (err)
      res.send(err);

    else {
      res.send(data);
      console.log(data);
    }
  });
});

app.get("/api/search/:id", function (req, res) {
  const requestedQueryId = req.params.id;

  var queryType = requestedQueryId.charAt(0);
  console.log(queryType);

  if (queryType == 'F') {
    Freight.find({
      $and: [{
        _id: requestedQueryId
      }, {
        _id: {
          $exists: true
        }
      }]
    }, function (err, data) {

      if (err)
        res.send([]);

      else {
        console.log(data);
        res.json(data);
      }

    });
  } 
  
  else if (queryType == 'C') {
    Custom.find({
      $and: [{
        _id: requestedQueryId
      }, {
        _id: {
          $exists: true
        }
      }]
    }, function (err, data) {

      if (err)
        res.send([]);

      else {
        console.log(data);
        res.json(data);
      }

    });
  } 
  
  else if (queryType == 'T') {
    Transport.find({
      $and: [{
        _id: requestedQueryId
      }, {
        _id: {
          $exists: true
        }
      }]
    }, function (err, data) {

      if (err)
        res.send([]);

      else {
        console.log(data);
        res.json(data);
      }

    });
  } 
  
  else if (queryType == 'W') {
    Warehouse.find({
      $and: [{
        _id: requestedQueryId
      }, {
        _id: {
          $exists: true
        }
      }]
    }, function (err, data) {

      if (err)
        res.send([]);

      else {
        console.log(data);
        res.json(data);
      }

    });
  } 
  
  else if (queryType == 'V') {
    ValueAdded.find({
      $and: [{
        _id: requestedQueryId
      }, {
        _id: {
          $exists: true
        }
      }]
    }, function (err, data) {

      if (err)
        res.send([]);

      else {
        console.log(data);
        res.json(data);
      }

    });
  } 
  
  else {
    res.send([]);
  }
});

app.post("/api/freight/editData", function (req, res) {

  var requestedFreightId = req.body.id;

  Freight.findOne({
    _id: requestedFreightId
  }, function (err, FreightData) {
    FreightData.shipment_type = req.body.shipmentType;
    FreightData.delivery_incoterms = req.body.deliveryIncoterms;
    FreightData.user_name = req.body.userName;
    FreightData.user_address = req.body.userAddress;
    FreightData.user_country_code = req.body.userPhoneCode;
    FreightData.user_phone_number = req.body.userPhone;
    FreightData.user_email_address = req.body.userEmail;
    FreightData.shipment_address = req.body.pickupAddress;
    FreightData.code = req.body.pickupCode;
    FreightData.shipment_country_code = req.body.pickupPhoneCode;
    FreightData.shipment_phone_number = req.body.pickupPhone;
    FreightData.shipment_from = req.body.pickupFrom;
    FreightData.origin_port = req.body.originPort;
    FreightData.shipment_to = req.body.dropTo;
    FreightData.destination_port = req.body.destinationPort;
    FreightData.shipment_mode = req.body.shipmentMode;
    FreightData.commodity_name = req.body.commodityName;
    FreightData.commodity_type = req.body.commodityType;
    FreightData.container_type = req.body.containerType;
    FreightData.gross_weight = req.body.grossWeight;
    FreightData.number_of_packages = req.body.numOfPkg;
    FreightData.total_volume = req.body.totalVolume;

    FreightData.save(function (err, result) {
      if (err)
        res.send("An Error Occured! Please try again.");

      else
        res.send("Data updated");
    });
  });

});

app.post("/api/custom/editData", function (req, res) {

  var requestedCustomId = req.body.id;

  Custom.findOne({
    _id: requestedCustomId
  }, function (err, CustomData) {
    CustomData.shipment_type = req.body.shipmentType;
    CustomData.user_name = req.body.userName;
    CustomData.user_address = req.body.userAddress;
    CustomData.user_country_code = req.body.userPhoneCode;
    CustomData.user_phone_number = req.body.userPhone;
    CustomData.user_email_address = req.body.userEmail;
    CustomData.shipment_address = req.body.pickupAddress;
    CustomData.code = req.body.pickupCode;
    CustomData.shipment_country_code = req.body.pickupPhoneCode;
    CustomData.shipment_phone_number = req.body.pickupPhone;
    CustomData.shipment_from = req.body.pickupFrom;
    CustomData.origin_port = req.body.originPort;
    CustomData.shipment_to = req.body.dropTo;
    CustomData.destination_port = req.body.destinationPort;
    CustomData.shipment_mode = req.body.shipmentMode;
    CustomData.commodity_name = req.body.commodityName;
    CustomData.container_type = req.body.containerType;
    CustomData.gross_weight = req.body.grossWeight;
    CustomData.number_of_packages = req.body.numOfPkg;
    CustomData.total_volume = req.body.totalVolume;
    CustomData.shipment_per_month = req.body.numOfShip;

    CustomData.save(function (err, result) {
      if (err)
        res.send("An Error Occured! Please try again.");

      else
        res.send("Data updated");
    });
  });

});

app.post("/api/transportation_management/editData", function (req, res) {

  var requestedTransportId = req.body.id;

  Transport.findOne({
    _id: requestedTransportId
  }, function (err, TransportData) {
    TransportData.shipment_type = req.body.shipmentType;
    TransportData.user_name = req.body.userName;
    TransportData.user_address = req.body.userAddress;
    TransportData.user_country_code = req.body.userPhoneCode;
    TransportData.user_phone_number = req.body.userPhone;
    TransportData.user_email_address = req.body.userEmail;
    TransportData.pickup_address = req.body.pickupAddress;
    TransportData.destination_address = req.body.destAddress;
    TransportData.vehicle_type = req.body.vehicleType;
    TransportData.vehicle_size = req.body.vehicleSize;
    TransportData.packing_type = req.body.packingType;
    TransportData.other_specs = req.body.otherSpecs;
    TransportData.package_per_unit = req.body.packagePerUnit;
    TransportData.package_weight = req.body.packageWt;
    TransportData.shipment_weight = req.body.shipmentWt;
    TransportData.measurement_unit = req.body.measurementUnit;
    TransportData.length = req.body.length;
    TransportData.width = req.body.width;
    TransportData.height = req.body.height;

    TransportData.save(function (err, result) {
      if (err)
        res.send("An Error Occured! Please try again.");

      else
        res.send("Data updated");
    });
  });

});

app.post("/api/warehouse_management/editData", function (req, res) {

  var requestedWarehouseId = req.body.id;

  Warehouse.findOne({
    _id: requestedWarehouseId
  }, function (err, WarehouseData) {
    WarehouseData.shipment_type = req.body.shipmentType;
    WarehouseData.user_name = req.body.userName;
    WarehouseData.user_address = req.body.userAddress;
    WarehouseData.user_country_code = req.body.userPhoneCode;
    WarehouseData.user_phone_number = req.body.userPhone;
    WarehouseData.user_email_address = req.body.userEmail;
    WarehouseData.warehouse_city = req.body.warehouseCity;
    WarehouseData.specific_location = req.body.specificLocation;
    WarehouseData.covered_area = req.body.coveredArea;
    WarehouseData.open_area = req.body.openArea;
    WarehouseData.commodity_storage = req.body.commodityStorage;
    WarehouseData.infrastructure_options = req.body.infraOptions;
    WarehouseData.manpower_options = req.body.manpowOptions;
    WarehouseData.security_options = req.body.securityOptions;
    WarehouseData.other_requirements = req.body.otherReq;
    WarehouseData.work_scope = req.body.workScope;

    WarehouseData.save(function (err, result) {
      if (err)
        res.send("An Error Occured! Please try again.");

      else
        res.send("Data updated");
    });
  });

});

app.post("/api/value_added_services/editData", function (req, res) {

  var requestedValueAddedId = req.body.id;

  ValueAdded.findOne({
    _id: requestedValueAddedId
  }, function (err, ValueAddedData) {
    ValueAddedData.user_name = req.body.userName;
    ValueAddedData.user_address = req.body.userAddress;
    ValueAddedData.user_country_code = req.body.userPhoneCode;
    ValueAddedData.user_phone_number = req.body.userPhone;
    ValueAddedData.user_email_address = req.body.userEmail;
    ValueAddedData.service_type = req.body.serviceType;

    ValueAddedData.save(function (err, result) {
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
    Custom.findByIdAndDelete(requestedQueryId, function (err, data) {
      if (err)
        res.send(err);

      else
        // res.send(data);
        res.send("Data deleted successfully");
    });
  } 
  
  else if (queryType == 'T') {
    Transport.findByIdAndDelete(requestedQueryId, function (err, data) {
      if (err)
        res.send(err);

      else
        // res.send(data);
        res.send("Data deleted successfully");
    });
  } 
  
  else if (queryType == 'W') {
    Warehouse.findByIdAndDelete(requestedQueryId, function (err, data) {
      if (err)
        res.send(err);

      else
        // res.send(data);
        res.send("Data deleted successfully");
    });
  } 
  
  else if (queryType == 'V') {
    ValueAdded.findByIdAndDelete(requestedQueryId, function (err, data) {
      if (err)
        res.send(err);

      else
        // res.send(data);
        res.send("Data deleted successfully");
    });
  }
});

app.post("/api/changeStatus", function (req, res) {
  var requestedId = req.body.id;
  console.log(requestedId);

  var idType = requestedId.charAt(0);

  if (idType == 'F') {
    // console.log(req.body.value);
    Freight.findOneAndUpdate({
      _id: requestedId
    }, {
      status: req.body.value
    }, {
      new: true
    }, function (err, result) {
      if (err)
        res.send("Error");

      else
        res.send("Success");
    });
  } 
  
  else if (idType == 'C') {
    Custom.findOneAndUpdate({
      _id: requestedId
    }, {
      status: req.body.value
    }, {
      new: true
    }, function (err, result) {
      if (err)
        res.send("Error");

      else
        res.send("Success");
    });
  } 
  
  else if (idType == 'T') {
    Transport.findOneAndUpdate({
      _id: requestedId
    }, {
      status: req.body.value
    }, {
      new: true
    }, function (err, result) {
      if (err)
        res.send("Error");

      else
        res.send("Success");
    });
  } 
  
  else if (idType == 'W') {
    Warehouse.findOneAndUpdate({
      _id: requestedId
    }, {
      status: req.body.value
    }, {
      new: true
    }, function (err, result) {
      if (err)
        res.send("Error");

      else
        res.send("Success");
    });
  } 
  
  else if (idType == 'V') {
    ValueAdded.findOneAndUpdate({
      _id: requestedId
    }, {
      status: req.body.value
    }, {
      new: true
    }, function (err, result) {
      if (err)
        res.send("Error");

      else
        res.send("Success");
    });
  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("Server running on localhost:" + PORT);
});