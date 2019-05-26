const app = require('./app');

var porta =process.env.PORT || 3000

app.listen(porta, ()=> {console.log(`Escutando na porta ${porta}`)});