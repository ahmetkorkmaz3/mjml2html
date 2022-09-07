const express = require('express')
const mjml = require('mjml')
const bodyParser = require('body-parser')
const minify = require('html-minifier').minify

const dotenv = require('dotenv');
dotenv.config();

const app = express()
const port = process.env.PORT

app.use(bodyParser.text())

app.get('/', (req, res) => {
    res.send('Hello visitor! You need to send post request for action. See: <a href="https://www.getpostman.com/collections/68d8b5bb22e834f327be">Postman Collection</a> . Star me on <a href="https://github.com/ahmetkorkmaz3/mjml2html" target="_blank">Github</a>')
})

app.post('/', (req, res) => {
    const isMinify = req.query.minify === 'true'

    try {
        let htmlOutput = mjml(req.body).html

        if (isMinify) {
            htmlOutput = minify(htmlOutput)
        }

        if (req.headers.accept === 'application/json') {
            res.status(200).send({
                data: htmlOutput,
            })
        } else {
            res.status(200).send(htmlOutput)
        }
    } catch (e) {
        res.status(400).send({
            error: e.message,
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
