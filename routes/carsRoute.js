let express = require("express"),
    app = express(),
    router = express.Router();

router.get('/', (req, res)=>{
  require("../controllers/carsController").get(req, res);
});

router.post('/', (req, res)=>{
  require("../controllers/carsController").post(req, res);
});

router.use((req, res)=>{
    if ( req.query._remove == 'DELETE' ) {
        req.method = 'DELETE';
        req.url = "/";

        require("../controllers/carsController").delete(req, res, req.query._id);
    }
});

router.get('/brands', (req, res)=>{
  require("../controllers/carsController").get(req, res);
});

router.get('/models', (req, res)=>{
  require("../controllers/carsController").get(req, res);
});

module.exports = router;
