/**
 * Created by andycall on 15/4/8.
 */

var express = require('express'),
    IndexController = require('./controllers/IndexController'),
    RelativeController = require('./controllers/RelativeController'),
    PlaceController = require('./controllers/PlaceController'),
    ShowController = require('./controllers/ShowController'),
    router = express.Router();


router.get('/', function(req, res){
	res.end("helloworld");
});
router.post('/', IndexController.post);

router.post('/findRelative', RelativeController.findRelative);

router.post('/findPlace', PlaceController.place);

router.post('/findISP',PlaceController.ISP);

router.post('/findCare', IndexController.findCare);

router.get('/showData', ShowController.show);

module.exports = router;
