var express = require('express');
var router = express.Router();
var multer = require('multer');
var kairos = require('kairos-api');
var client = new kairos('2654b19d', 'a0cb8dd7e730dcfba4d2f8e88013d1dd');

var storageOption = multer.diskStorage({
		destination: function (req, file, cb) {
    	cb(null, '/home/lgd/work/piccheck/public/images/')
	},
	filename: function (req, file, cb) {
    	// Rename uploaded file
    	cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});

var upload = multer({storage:storageOption});

router.get('/', function(req, res, next){
	var params = {image:'http://210.119.145.13/images/test3.jpg',
        gallery_name:'PicCheck'
    };  
    client.recognize(params).then(function(result){
        console.log(result.body);
    }).catch(function(err){
        console.log(err);
    });
	res.send("hi");
});

router.post('/', function(req, res, next){
	upload.single('photo')(req, res, function(err){
		if (err){
			console.log(err);
			return;
		}
	});
	res.send("ok");	
});



module.exports = router;
