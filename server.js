const app = require('./app')
const pool = require('./db/pool')

const server = app.listen(3005, () => {
    console.log(`App running on port 3005...`);
});

const connectToDB = async (pool)=>{
    try {
        await pool.connect({
            host: 'localhost',
            port: 5432,
            database: 'web',
            user: 'luca',
            password: '',
        });
        console.log("Database connected to the server!")
    }catch(err){
        console.error(err);
    }
}
connectToDB(pool)




