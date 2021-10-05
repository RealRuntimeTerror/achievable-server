//where we put all our server code
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const activitiesRouter = require('./routes/activities')
const groupsRouter = require('./routes/groups')
const usersRouter = require('./routes/users')
const sessionsRouter = require('./routes/sessions')

mongoose.connect(process.env.DATABASE_URL_LOCAL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('db opened'))

app.use(cors({
  origin: '*'
}))

app.use(express.json()) //lets server accept json


app.use('/activities', activitiesRouter)
app.use('/groups', groupsRouter)
app.use('/users', usersRouter)
app.use('/sessions', sessionsRouter)

module.exports = app
