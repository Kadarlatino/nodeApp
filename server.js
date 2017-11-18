//Imported vars
let express = require("express"),
    http = require("http"),
    pug = require("pug"),
    router = require("./routes/router");






let port = 8888,
    host = "localhost";

let server = new http.Server((req, res)=>{
  router.get(req, res);
});

server.listen(port, host);
