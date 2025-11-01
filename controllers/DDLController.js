// Create tables
const pool = require('./../db/pool');
const {create_array, dropTablesQuery} = require('./sql_statements/tables');
const integrityConstraintsQuery = require('./sql_statements/integrity_constraints');

const createTables = async (req,res,next)=>{
    for(let i = 0; i < create_array.length; i++){
	try{
	    await pool.query('BEGIN');
	    const statements = create_array[i]
		.split(';')
		.map(stmt => stmt.trim())
		.filter(stmt => stmt.length > 0);
	    for ( const stmt of statements){
		console.log( "statement: ", stmt);
		await pool.query(stmt);
		}

	    await pool.query('COMMIT');
	}catch(err){
	    await pool.query('ROLLBACK');
	    return res.status(400).json({
		status: 'fail',
		message: err
	    })
	}   
    }

    res.status(201).json({
	status: "success",
	message: "The tables have been created.",
    })
};




//Drop the tables
const dropTables = async (req,res,next)=>{
	try{
	    await pool.query('BEGIN');
	    const statements = dropTablesQuery
		.split(';')
		.map(stmt => stmt.trim())
		.filter(stmt => stmt.length > 0);
	    
	    for ( const stmt of statements){
		    await pool.query(stmt);
		console.log('table deleted', stmt)
	    }

	    await pool.query('COMMIT');
	}catch(err){
	    await pool.query('ROLLBACK');
	    return res.status(400).json({
		status: 'fail',
		message: err
	    })
	}   
    res.status(200).json({
	status: "success",
	message: "The tables have been droped.",
    })
    }

const integrityConstraints = async(req,res,next)=>{
	try{
	    await pool.query('BEGIN');
	    const statements = integrityConstraintsQuery
		.split(';')
		.map(stmt => stmt.trim())
		.filter(stmt => stmt.length > 0);

	    for ( const stmt of statements){
		console.log( "statement: ", stmt);
		await pool.query(stmt);
	    }

	    await pool.query('COMMIT');

	}catch(err){
	    await pool.query('ROLLBACK');
	    return res.status(400).json({
		status: 'fail',
		message: err
	    })
	}   

    res.status(200).json({
	status: "success",
	message: "The integrity constraints have been applied.",
    })
}


module.exports = {createTables, dropTables, integrityConstraints}
