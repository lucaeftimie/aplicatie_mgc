const express = require ('express');
const cors = require('cors');
const pg = require('./db/pool')
const app = express();
const path = require('path');
const Language_DDL_Routes = require ('./routes/Language/DDL')
const Language_DML_Routes = require ('./routes/Language/DML')
const viewRoutes = require('./routes/client/viewRoutes');

const underscoreToCamelCase = require ('./utils/underscoreToCamelCase')
app.use(express.json());
app.use(cors());


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use('/admin', Language_DDL_Routes);
app.use('/admin', Language_DML_Routes);
app.use('/admin', viewRoutes);

 const select = async (req,res)=>{
     console.log('test');
    try{

     console.log('test');
	const data = await pg.query('select * from clienti_cinema;')

	console.log(data);

	res.status(200).json({
	    status: 'success',
	    data
	})

    }catch(err){
	res.status(400).json({
	    status: 'fail',
	    message: err
	})
    }
}
app.get('/select', select)

app.get('/admin', (req,res)=>{
    const request = req;
    console.log(request);
    res.status(200).json({
        status: 'succes',
        message: 'test message'
    })
})

//underscoreToCamelCase("test")
// //const rows = [
//     'test_start',
//     'test_close'
// ]
// const newRows = underscoreToCamelCase(rows);
// console.log(newRows);
//console.log(underscoreToCamelCase(['test_server', "test_client"]));




module.exports = app;
