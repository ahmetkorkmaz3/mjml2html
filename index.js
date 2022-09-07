const express = require('express');
const mjml = require('mjml');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.text());

app.post('/', (req, res) => {
    const beautify = req.query.beautify === 'true'
    const minify = req.query.minify === 'true'
    const validationLevel = req.query.validation || 'strict'

    try {
        const htmlOutput = mjml(req.body, {
            beautify,
            minify,
            validationLevel,
        });

        res.status(200)
            .send(htmlOutput.html)
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
