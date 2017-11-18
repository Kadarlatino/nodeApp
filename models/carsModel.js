let mongoose = require("mongoose"),
    carSchema = new mongoose.Schema({
      brand: String,
      model: String
    });

mongoose.model('car', carSchema);

exports.carlist_deldata = (callback) => {
  let myCar = mongoose.model('car');
  callback(myCar);
}

exports.carlist_pushdata = (callback) => {
  let myCar = mongoose.model('car');
  callback(myCar);
}

exports.carlist_showdata = (callback) => {

  let myCar = mongoose.model('car');
  let carsBrandArr=[], carsModelsArr=[], Ids=[];

  myCar.find({}, (err, car)=>{
    if(err) {
      callback("Sorry, some error here :(");
    } else {

      let intCount = car.length;
      if (intCount > 0) {
        let strJson = [];
        for (let i = 0; i < intCount;i++) {
          Ids.push(car[i]._id);
          carsBrandArr.push(car[i].brand);
          carsModelsArr.push(car[i].model)
        }

        callback(carsModelsArr, carsBrandArr, Ids);
      }
    }
  });
}
