const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '296ec1710ada4d16bbad29b9ae8f872a'
});
const apicall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('Unable to call Api'))
};

const entryCount = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(num => res.json(num[0]))
        .catch(err => res.status(400).json("Not Getting Entries"))
}

module.exports = {
    entryCount: entryCount,
    apicall: apicall
}