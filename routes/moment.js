var express = require('express');
var router = express.Router();

var pool 		= require('./mysqlConn');


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/view_detail2', function(req, res, next) {
	var dnum =req.param('dnum');
	console.log("dnuddddm")
	console.log(dnum)
	res.render('./moment/view_detail2',{data:dnum} );
//	res.send('aaaaa');
});

router.get('/list', function(req,res,next){
  pool.getConnection(function (err, connection) {
      var sql = "SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no order by d_regdate desc;";

      connection.query(sql, function (err, rows) {
//    	  console.log(rows)
          if (err) console.error("err : " + err);
    	  
          res.render('./moment/home', {data: rows});
          connection.release();
      });
  }); 
});

router.get('/listinit', function(req,res,next){
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no order by d_regdate desc;";

	      connection.query(sql, function (err, rows) {
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	          res.send(rows);
	          connection.release();
	      });
	  });
	  
	  
	  
	});

router.get('/box_select', function(req,res,next){
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no;";

	      connection.query(sql, function (err, rows) {
	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.get('/mylike_selectdb', function(req,res,next){
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM (member_tbl as mem LEFT OUTER JOIN like_tbl as mylike ON mem.m_no = mylike.m_no) LEFT OUTER JOIN data_tbl as mydata ON mylike.d_no = mydata.d_no LEFT OUTER JOIN member_tbl as mymem ON mydata.m_no = mymem.m_no;";

	      connection.query(sql, function (err, rows) {
	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.get('/home_address_selectdb', function(req,res,next){
	
	var myadd =req.param('add');
	console.log(myadd)
	  pool.getConnection(function (err, connection) {
	      var sql = "select * from data_tbl as data left outer join member_tbl as mem on data.m_no =mem.m_no where d_location like ?"

	      connection.query(sql,[myadd], function (err, rows) {
	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.get('/data_view', function(req,res,next){
	var dnum =req.param('dnum');
	console.log("dvvvvnum")
	console.log(dnum)
	  pool.getConnection(function (err, connection) {
	      var sql ="SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no where data.d_no = ? ";

	      connection.query(sql,[dnum], function (err, rows) {
	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.get('/mem_idcheckdb', function(req,res,next){
	var m_email =req.param('m_email');
	console.log("m_email")
	console.log(m_email)
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM MEMBER_tbl WHERE m_email=?";
	      connection.query(sql,[m_email], function (err, rows) {
	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

module.exports = router;
