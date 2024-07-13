const app = require('./src/app');

app.listen(3000, (error) => {
    if (error) {
      console.log("Erro no servidor");
    } else {
      console.log("Servidor iniciado");
    }
  });