var express = require('express');
const db = require("../models");
var moment = require('moment');
const CSV = db.csv;
const Op = db.Sequelize.Op;
const fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'tmp/csvuploads/' })
const path = require("path");
const csv = require('fast-csv');


var router = express.Router();

router.post('/', async function(req, res, next) {
  let params=req.body;
  let draw=params['draw'];
  let totalcount=await CSV.count();
  let query,totalRecordwithFilter;
  
  if(draw>1)
  {
    let row = params['start'];
    let rowperpage = params['length']; 
    let columnIndex = params['order'][0]['column']; 
    let columnName = params['columns'][columnIndex]['data']; 
    let columnSortOrder = params['order'][0]['dir']; 
    let searchValue = params['search']['value'];  
    let queryparam={};
    if(searchValue!='')
    {
      queryparam['where']={
        [Op.or]:{
          name: {
            [Op.like]: '%'+searchValue+'%'
          },
          reportingManager: {
            [Op.like]: '%'+searchValue+'%'
          },
          salary: parseInt(searchValue),
          department: {
            [Op.like]: '%'+searchValue+'%'
          }
        }
      };
    }
    queryparam['order']=[[columnName,columnSortOrder]];
    let totalRecords = await CSV.count(queryparam);
    queryparam['offset']=parseInt(row);
    queryparam['limit']=parseInt(rowperpage);
    query=CSV.findAll(queryparam);
    totalRecordwithFilter=totalRecords;
  }
  else{
    query=CSV.findAll({
      limit: 25,
      order: [
        ['id', 'ASC'],
      ]
    });
    totalRecordwithFilter=totalcount;
  }
  

  query.then(data => {
    let finaldata=[];
    data.forEach(function(obj,key){
      let value=obj['dataValues'];
      let dobobj=moment(value['dob']);
      value['dob']=dobobj.format('DD MM YYYY');
      value['age']=Math.floor((moment().unix() - dobobj.unix()) / (60 * 60 * 24 * 365));
      finaldata[key]=value;
    });
    let response = {
      "draw" : parseInt(draw),
      "iTotalRecords" : totalcount,
      "iTotalDisplayRecords" : totalRecordwithFilter,
      "aaData" : finaldata
    };
    res.send(response);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving csv."
    });
  });

});
router.post('/import',upload.single('csv_file'), function(req, res, next) {
  const fileRows = [];
  fs.createReadStream(req.file.path)
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => {
    throw error.message;
  })
  .on("data", (row) => {
    let dobobj=moment(row.Dob);
    let age =Math.floor((moment().unix() - dobobj.unix()) / (60 * 60 * 24 * 365));
    CSV.create({
        name: row.Name,
        age: age,
        dob: dobobj,
        reportingManager: row.ReportingManager,
        salary: row.Salary,
        department: row.Department
    });
    fileRows.push(row);
  })
  .on("end", () => {
    let response={'status':1};
    res.json(response);
  });
});
router.post('/delete', async function(req, res, next) {
  let response={'status':1};
  CSV.destroy({
    where: {},
    truncate: true
  }).then(r=>{
    res.send(response);
  }).catch(err=>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving csv."
    });
  })  
});

module.exports = router;
