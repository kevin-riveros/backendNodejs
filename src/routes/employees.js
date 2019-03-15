const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.get('/employee',(req,res)=>{

    mysqlConnection.query('select * from employee', (err,rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }

    })
});

router.get('/employee/:id',(req,res)=>{
    const{id}=req.params
    mysqlConnection.query('select * from employee where id = ?', [id],(err,rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }

    })
});

router.post('/employee', (req,res)=>{
    const {id, name, salary} =req.body;
    const query = ` 
       
        CALL employeeAddOrEdit(?, ?, ?);
    
    `;
    mysqlConnection.query(query, [id, name, salary], (err,rows,fields)=>{
        if(!err){
            res.json({Status: "Employeed Saved"});
        }else{
            console.log(err);
        }
    });
});

router.put('/employee/:id', (req, res) => {
    const { name, salary } = req.body;
    const { id } = req.params;
    const query = `CALL employeeAddOrEdit(?, ?, ?);`;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Employee Updated'});
      } else {
        console.log(err);
      }
    });
});

router.delete('/employee/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query(`delete from employee where id = ?`, [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Employee Deleted'});
      } else {
        console.log(err);
      }
    });
});
module.exports = router;
