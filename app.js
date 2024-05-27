const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { validateApiKey } = require('./middleware')
const route_v1 = require('./router/route_v1')

const app = express()

app.use(cors())
app.use(cookieParser())

app.use((req, res, next) => {
    if(req.method !== 'GET') {
        return bodyParser.json()(req, res, next)
    }

    next()
})

app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 8080

app.use('/sikap', validateApiKey, route_v1)

app.listen(port, () => {
    console.log(`Server is listening in port ${port}`)
})