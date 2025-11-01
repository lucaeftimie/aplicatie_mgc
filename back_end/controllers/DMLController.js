const pool = require('./../db/pool');
const {insert_array, alter_table_roluri_angajati_cinema, delete_data} = require('./sql_statements/insert')
const {update_clienti_cinema} = require("./sql_statements/update")

const insertData = async(req,res,next)=>{
    try{
    await pool.query(alter_table_roluri_angajati_cinema)
    }catch(err){
	res.status(400).json({
	    status: fail,
	    message: err
	})
    }
    for(insert of insert_array){
	try{
	    await pool.query('BEGIN');
	
	    const statements = insert
		.split(";")
		.map(stmt => stmt.trim())
		.filter(stmt => stmt.length > 0);

	    for(const stmt of statements){
		console.log(stmt)
		await pool.query(stmt);
	    }

	await pool.query('COMMIT');

	}catch(err){
	    await pool.query('ROLLBACK');
	    return res.status(400).json({
		status: 'fail',
		message: err

	    });
	}
    }

    res.status(200).json({
	status: "success",
	message: "The data has been inserted into the tables.",
    });
}
const deleteData = async(req,res,next)=>{
    try{
	await pool.query('BEGIN');
	
	const statements = delete_data
	    .split(";")
	    .map(stmt => stmt.trim())
	    .filter(stmt => stmt.length > 0);

	for(const stmt of statements){
	    await pool.query(stmt);
	}
	await pool.query('COMMIT');
    }catch(err){
	await pool.query('ROLLBACK');
	return res.status(400).json({
	    status: 'fail',
	    message: err

	});
    }

    res.status(200).json({
	status: "success",
	message: "The data has been deleted.",
    });
}

const updateData = async(req,res,next)=>{
    try{
	await pool.query('BEGIN');
	console.log(update_clienti_cinema)
	const statements = update_clienti_cinema	
	    .split(";")
	    .map(stmt => stmt.trim())
	    .filter(stmt => stmt.length > 0);

	for(const stmt of statements){
	    console.log(stmt)
	    await pool.query(stmt);
	}
	await pool.query('COMMIT');
    }catch(err){
	await pool.query('ROLLBACK');
	return res.status(400).json({
	    status: 'fail',
	    message: err

	});
    }

    res.status(200).json({
	status: "success",
	message: "The tables have been updated.",
    });

}


module.exports = {
    deleteData,
    insertData,
    updateData
}
