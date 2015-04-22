/**
 * Created by andycall on 15/4/8.
 */

var express = require('express'),
    IndexController = require('./controllers/IndexController'),
    RelativeController = require('./controllers/RelativeController'),
    PlaceController = require('./controllers/PlaceController'),
    router = express.Router();

router.get('/', IndexController.get);
router.post('/', IndexController.post);

router.get('/findRelative', RelativeController.index);
router.post('/findRelative', RelativeController.findRelative);

router.get('/findPlace', PlaceController.index);
router.post('/findPlace', PlaceController.place);

module.exports = router;