const {Pool} = require('pg');

const pool = new Pool({
  user:'postgres',
  host:'localhost',
  database:'flipkart',
  password:'',
  port:5432
})

const dbConnect = async () => {
  try{
  const connect = await pool.connect();
  console.log("database connected");
}catch(err){console.log(err)}
}


module.exports = {dbConnect, pool}