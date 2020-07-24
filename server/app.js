if( process.env.NODE_ENV == 'development' ){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', routes)
if( process.env.NODE_ENV != 'test' ){
    app.listen(port, ()=>{
        console.log(port)
    })
}

app.use(errorHandler)

module.exports = app
