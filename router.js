/**
 * Created by andycall on 15/4/8.
 */

var express = require('express'),
    IndexController = require('./controllers/IndexController'),
    router = express.Router();

router.get('/', IndexController.get);
router.post('/', IndexController.post);





module.exports = router;