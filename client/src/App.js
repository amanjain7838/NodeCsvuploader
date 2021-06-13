import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

function App() {
  useEffect(() => {
    $('#example').DataTable({
      'processing': true,
      'serverSide': true,
      'serverMethod': 'post',
      "ajax": process.env.REACT_APP_ApiUrl+'ajax',
      "columns": [
          { "data": "name" },
          { "data": "age" },
          { "data": "dob" },
          { "data": "reportingManager" },
          { "data": "salary" },
          { "data": "department" }
      ],
      "lengthMenu": [25, 50, 100, 500]
    });
    $('#upload_csv').on('submit', function(event){
        event.preventDefault();
        $('.upload-loader').show();
        $.ajax({
            url:process.env.REACT_APP_ApiUrl+"ajax/import",
            method:"POST",
            data:new FormData(this),
            dataType:'json',
            contentType:false,
            cache:false,
            processData:false,
            success:function(jsonData)
            {
              window.location.reload();
            },
            error:function(err){
                $('.upload-loader').hide();
                alert(err);
            }
        });
    });

    $('#reset-data').on('click',function(event){
        event.preventDefault();
        $('.clear-data-loader').show();
        $.ajax({
            url:process.env.REACT_APP_ApiUrl+"ajax/delete",
            method:"POST",
            contentType:false,
            cache:false,
            success:function(jsonData)
            {
              window.location.reload();
            },
            error:function(err){
                $('.clear-data-loader').hide();
                alert(err);
            }
        });
    });
    $('#csv_file').on('change',function(){
        $('#upload').removeClass('disabledbtn').removeAttr('disabled');
    });

  });


  return (
    <div className="container pt-3 ">
        <h2>CSV UPLOADER</h2>
       <form id="upload_csv" method="post" encType="multipart/form-data" className="my-3">
        <div className="row">
            <div className="col-12">
                <b>Import Data </b>
                <a download="example.csv" href={process.env.REACT_APP_ApiUrl+"docs/importsheet.csv"}>Download Sample</a>
            </div>  
            <div className="col-md-3">  
               <input type="file" name="csv_file" id="csv_file" accept=".csv"/>
            </div>  
            <div className="col-md-6 col-auto mr-auto">  
                <input disabled="disabled" type="submit" name="upload" id="upload" value="Upload" className="btn btn-info disabledbtn"/>
                <span className="spinner-border spinner-border-sm ml-2 upload-loader" style={{display:'none'}} role="status" aria-hidden="true"></span>
            </div>
            <div className="col-auto">
                <a className="btn btn-danger btn-sm ml-auto" id="reset-data"><span className="spinner-border spinner-border-sm mr-2 clear-data-loader" style={{display:'none'}} role="status" aria-hidden="true"></span>Clear All Data</a>
            </div>  
        </div>
       </form>


    	<table id="example" className="display table table-striped table-bordered" style={{width:'100%'}}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>DOB</th>
                    <th>ReportingManager</th>
                    <th>Salary</th>
                    <th>Department</th>
                </tr>
            </thead>
        </table>
    </div>
  );
}

export default App;
