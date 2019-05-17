const app = require('./app');

app.listen(process.env.PORT || 3000, ()=> {console.log('Escutando na porta 3000')});