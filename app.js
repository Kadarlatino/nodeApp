let express = require("express"),
    app = express(),
    db = require("./db"),
    http = require("http"),
    pug = require("pug"),
    router = require("./routes/router"),
    bodyParser = require('body-parser'),
    port = 8888;


//config
app.set('view engine','pug');
app.set('views',__dirname + '/views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./public'));

app.use('/cars', require('./routes/carsRoute.js'));
//app.use('/user', require('./routes/userRoute.js'));

//run
app.listen(port, ()=>{
  console.log("Lesten "+ port);
});
