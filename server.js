'use strict'

const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const cors = require('cors')

const app = express()
const corsOptions = {
    origin: process.env.VUE_APP_BACKEND_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(serveStatic(path.join(__dirname, 'public')))
app.get('*', (req, res) => {
    res.redirect('/')
})
const port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)