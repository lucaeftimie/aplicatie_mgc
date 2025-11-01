const pool = require('./..db/pool')

const createUser = async (username,password)=>{
    try{
        pool.query(`INSERT INTO users(username,password) VALUES (${username}, ${password})`);
    }catch(err){
        console.err(err);
    }
}