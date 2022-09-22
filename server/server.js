// db hosting site: https://www.freemysqlhosting.net/

const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
var app = express();

//Configuring express server
app.use(bodyparser.json());
app.use(cors());

//MySQL details
var mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12345678',
    database: 'mfg_auto',
    multipleStatements: true
    }); 


mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });
    
//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Creating GET Router to fetch all the learner details from the MySQL Database
app.get('/users' , (req, res) => {
     var obj = [];
    mysqlConnection.query('SELECT * FROM login_details', (err, rows, fields) => {
    if (!err)
    {
        res.send(rows);
    }
    else
    console.log(err);
    })
    } );


    app.get('/machines' , (req, res) => {
        var obj = [];
       mysqlConnection.query('SELECT * FROM machine_details', (err, rows, fields) => {
       if (!err)
       {
           res.send(rows);
       }
       else
       console.log(err);
       })
       } );

  
    app.post('/login', (req, res)=> {
        const username = req.body.username;
        const password = req.body.password;
        const admin = req.body.admin;

        console.log(username+' '+password+' '+admin);
        
        mysqlConnection.query('SELECT * FROM login_details where username=\''+username+'\' and password='+password, (err, rows, fields) => {
            try {
                if(admin)
                {
                    const checkAdmin = rows[0].admin;
                    if(checkAdmin)
                        res.send({admin:"yes", success:"yes"});
                    else
                        res.send({admin:"no", success:"no"});
                }
                else {
                    if(rows[0]!=null)
                    {
                        res.send({admin:"no", success:"yes"});
                    }
                    else
                    {
                        res.send({admin:"no", success:"no"});
                    }
                }
                
                
            } catch (error) {
                res.send({admin:"no", success:"no"});
                console.log(err);
            }
                      
            })
    } );






    app.post('/getProductionByDate', (req, res) => {
        const date = req.body.date;
        mysqlConnection.query('SELECT * FROM production_details where date=\''+date+'\'', (err, rows, fields) => {
            try {
                
                res.send(rows)
                
            } catch (error) {
                console.log(err);
            }
                      
            })
    })



    app.post('/getProductionByMonth', (req, res) => {
        const month = req.body.month;
        mysqlConnection.query(`select * from production_details where SUBSTRING(date, 1, 2) = ${month}`, (err, rows, fields) => {
            try {
                
                res.send(rows)
                
            } catch (error) {
                console.log(err);
            }
                      
            })
    })
        

    app.post('/getProductionByDateRange', (req, res) => {
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        console.log(startDate+' dflkj '+endDate);
        mysqlConnection.query('SELECT * from production_details where date between \"' +startDate+'\" and \"'+endDate+'\";', (err, rows, fields) => {
            try {
                
                res.send(rows)
                
            } catch (error) {
                console.log(err);
            }
                      
            })
    })
        