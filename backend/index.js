const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())

const routes = require('./routes')

const port = process.env.PORT || 3001;

require('./database/connection')

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}!`)
  });