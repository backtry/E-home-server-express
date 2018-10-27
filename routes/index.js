var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.use('/admin/adminUser',require('../controller/adminUser'))
router.use('/admin/news',require('../controller/news'))
router.use('/admin/newscategory',require('../controller/category'))
router.use('/admin/swiper',require('../controller/swiper'))

module.exports = router;
