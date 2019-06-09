const app = require('./app');

var porta =process.env.PORT || 8000

app.listen(porta, ()=> {console.log(`Escutando na porta ${porta}`)});