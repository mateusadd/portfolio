module.exports = {
    
    dialect: 'mysql',
    host: 'database-portfolio.caa9x9ctigzd.us-east-1.rds.amazonaws.com',
    timezone: '-03:00',
    port: 3306,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: 'salao' 
    
    /*
    dialect: 'mysql',
    host: 'localhost',
    timezone: '-03:00',
    port: 3306,
    username: 'root',
    password: '',
    database: 'salao'
    */
}