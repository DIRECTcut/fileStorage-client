const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const app = express()
app.use(serveStatic(path.join(__dirname, 'public')))
app.get('*', (req, res) => {
    res.redirect('/')
})
const port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)