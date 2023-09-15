const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const routes = require('./routes')

require('./database/connection')

app.use(express.json())
app.use(routes)


app.listen(3001)