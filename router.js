/**
 * Created by andycall on 15/4/8.
 */

var express = require('express'),
    IndexController = require('./controllers/IndexController'),
    RelativeController = require('./controllers/RelativeController'),
    router = express.Router();

router.get('/', IndexController.get);
router.post('/', IndexController.post);


router.get('/findRelative', RelativeController.index);
router.post('/findRelative', RelativeController.findRelative);
//router.get('/findRelative/:username', )





module.exports = router;