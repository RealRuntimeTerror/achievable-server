//where we put all our server code
require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL_CLUSTER,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('db opened'))

app.use(express.json()) //lets server accept json

const activitiesRouter = require('./routes/activities')
app.use('/activities', activitiesRouter)

app.listen(3000, console.log("Server started"))