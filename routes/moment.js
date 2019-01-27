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

router.get('/home', function(req,res,next){
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no order by d_regdate desc;";

	      connection.query(sql, function (err, rows) {
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	          res.render('./moment/home', {data: rows});
	          connection.release();
	      });
	  }); 
	});

router.get('/mem_login', function(req,res,next){
	res.render('./moment/mem_login');
	});

router.get('/mem_insert', function(req,res,next){
	res.render('./moment/mem_insert');
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

router.get('/home_mypage', function(req,res,next){
	var dnum =req.param('num');
	console.log("dnuddddm")
	console.log(dnum)
	res.render('./moment/home_mypage',{data:dnum} );
});

router.get('/upload', function(req,res,next){
	var dnum =req.param('num');
	console.log("dnuddddm")
	console.log(dnum)
	res.render('./moment/upload',{data:dnum} );
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
//	    	  console.log(rows)
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
//	    	  console.log(rows)
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
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.get('/home_selectdblike', function(req,res,next){
	
	var k_num =req.param('kind');
	console.log(k_num)
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no order by d_like desc;";

	      connection.query(sql,[k_num], function (err, rows) {
//	    	  console.log(rows)
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
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.get('/mem_logindb', function(req,res,next){
	var mail =req.param('m_email');
	var pw =req.param('m_pw');
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM member_tbl WHERE m_email=? and m_pw=?";
	      connection.query(sql,[mail,pw], function (err, rows) {
//	    	  console.log(rows)
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
	      var sql = "SELECT * FROM member_tbl WHERE m_email=?";
	      connection.query(sql,[m_email], function (err, rows) {
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.post('/likecnt', function(req,res,next){
	var d_no = req.param("d_no");
	var d_like = req.param("d_cnt");
	console.log("라이크씨앤티")
	  pool.getConnection(function (err, connection) {
	      var sql = "UPDATE data_tbl SET d_like=?  WHERE d_no=?";
	      connection.query(sql,[d_no,d_like], function (err, rows) {
	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	    	  console.log("라이크씨앤티")
	    	  console.log("라이크씨앤티"+rows)
	          connection.release();
	      });
	  }); 
	});

router.get('/likecheck', function(req,res,next){
	var mnum = req.param("mnum");
	console.log("라이크체크")
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT  likee.d_no, likee.m_no, data.d_like FROM data_tbl as data  LEFT OUTER JOIN like_tbl as likee ON data.d_no = likee.d_no where likee.m_no = ?";
	  	
	      connection.query(sql,[mnum], function (err, rows) {
	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});
router.get('/likeup', function(req,res,next){
	var d_no = req.param("dnum");
	var m_no = req.param("mnum");
	console.log("라이크업")
	  pool.getConnection(function (err, connection) {
	      var sql = "insert into like_tbl (d_no,m_no) values(?,?)";
	      connection.query(sql,[d_no,m_no], function (err, rows) {
	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.get('/likedown', function(req,res,next){
	var d_no = req.param("dnum");
	var m_no = req.param("mnum");
	console.log("라이크업")
	  pool.getConnection(function (err, connection) {
	      var sql = "delete from  like_tbl where d_no=? and m_no=?";
	      connection.query(sql,[d_no,m_no], function (err, rows) {
	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});
module.exports = router;
