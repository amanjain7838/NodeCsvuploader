var express = require('express');
var router = express.Router();
const fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'tmp/csvuploads/' });
const csv = require('fast-csv');
const {apiResponse, isValid} = require('../utils/common');
const { getUsers,saveUser } = require('../modules/userModule');

router.get('/getusers',async function(req, res, next) {
	const params=req.query;
    try {
		const userslist = await getUsers(params);
		apiResponse.status=1;
		apiResponse.data=userslist;
	} catch (e) {
		apiResponse.status=0;
		apiResponse.error={
			name: e.name,
			message: e.message
		};
	}
	res.send(apiResponse);
});

router.post('/import',upload.single('csv'), function(req, res, next) {
let allpromises=[];
  fs.createReadStream(req.file.path)
  .pipe(csv.parse({ headers: false }))
  .on("error", (error) => {
    throw error.message;
  })
  .on("data", async (row) => {
    let userDetail={
        name:row[0],
        email:row[1],
        phones:row[2]
    };
    allpromises.push(saveUser(userDetail));
  })
  .on("end", () => {
    apiResponse.status=1;
    Promise.all(allpromises).then(res.send(apiResponse))
  });
});

module.exports = router;