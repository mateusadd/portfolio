const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

// Ocultar informações de versão
app.disable('x-powered-by');

const corsOptions = {
  origin: 'https://portfolio-production-691c.up.railway.app', // Substitua com o seu domínio permitido
};

//app.use(cors(corsOptions))
app.use(cors())

const routes = require('./routes')

const port = process.env.PORT || 3001;

require('./database/connection')

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}!`)
  });