const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(
    'blog-fullstack', 
    'root', 
    '4026.Test@Lucas#Manuel',{
     host: 'localhost',
     dialect: 'mysql',
     timezone: '+02:00'
});

async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Autenticado no banco de dados')
    }catch(error) {
        console.log('Autenticacao recusada')
    }
}
connectDatabase();

module.exports = sequelize;