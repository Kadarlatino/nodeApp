let pug = require("pug"),
    carsModel = require('../models/carsModel');

exports.get = function(req, res) {
  carsModel.carlist_showdata((carsmodels, carsbrands, Ids)=>{
    if (req.url === "/") {
      res.render("cars", {
        ids: Ids,
        models: carsmodels,
        brands: carsbrands
      });
    }

    if (req.url === "/brands") {
      res.render("cars-brands", {
        ids: Ids,
        models: carsmodels,
        brands: carsbrands
      });
    }
  });
};

exports.post = function(req, res) {
  let dataz = req.body;
  carsModel.carlist_pushdata((somemodel)=>{
    let newStuff = new somemodel(dataz);

    newStuff.save().then(item=>{
      this.get(req, res);
    }).catch(err=>{
      console.log("error");
    });
  });
};

exports.delete = function(req, res, id) {
  carsModel.carlist_deldata((toRemove)=> {
    toRemove.remove({"_id":id}, (err)=>{
      if(!err) {
        console.log("removed");
      } else {
        console.log("some error: "+err);
      }
    }).then(item=>{
      req.url = "/cars";
      res.redirect(req.url);
      console.log("then");
    });
  });
}
