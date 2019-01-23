var express = require('express');
var router = express.Router();

var pool 		= require('./mysqlConn');


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/r1', function(req, res, next) {
//  res.redirect('./moment/home');
	res.send('aaaaa');
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

router.get('/listA', function(req,res,next){
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
	    	  
	          res.render('./moment/home', {rows: rows});
	          connection.release();
	      });
	  }); 
	});


module.exports = router;
