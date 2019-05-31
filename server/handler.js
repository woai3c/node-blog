const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'
const config = { useNewUrlParser: true }

module.exports = {
    test(req, res) {
        MongoClient.connect(url, config, (err, db) => {
            if (err) throw err
            const dbo = db.db('blog')
            dbo.collection('user'). find({}).toArray((err, result) => {
                if (err) throw err
                res.send(result)
                db.close()
            })
        })
    }
}