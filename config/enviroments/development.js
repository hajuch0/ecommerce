module.exports = {
    PORT : process.env.PORT,
    DB:{
        user: 'ecommerce',
        password: process.env.DB_PASSWORD, 
        database: 'ecommerce',
        host : process.env.DB_HOST,
        dialect : 'mariadb'
    }
}