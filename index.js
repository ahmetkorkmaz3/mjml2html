const express = require('express');
const mjml = require('mjml');
const bodyParser = require('body-parser');
const minify = require('html-minifier').minify;

const app = express();
const port = 8000;

app.use(bodyParser.text());
app.use(bodyParser.json());

app.post('/', (req, res) => {
    const beautify = req.query.beautify === 'true'
    const isMinify = req.query.minify === 'true'
    const validationLevel = req.query.validation || 'strict'

    try {
        let htmlOutput = mjml(req.body, {
            beautify,
            validationLevel,
        }).html;

        if (isMinify) {
            htmlOutput = minify(htmlOutput);
        }

        if (req.headers.accept === 'application/json') {
            res
                .status(200)
                .send({
                    "data": htmlOutput,
                });
        } else {
            res.status(200)
                .send(htmlOutput);
        }
    } catch (e) {
        res.status(400)
            .send({
                "error": e.message,
            });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
