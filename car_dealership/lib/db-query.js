const {Client} = require("pg");
require("dotenv").config();

module.exports = {
    async dbQuery(statement,...parameters){
        let client = new Client({
      user: process.env.DB_USER,
      password:  process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
    });
    
    await client.connect();
    let result = await client.query(statement,parameters);
    await client.end();
    
    return result
    }}