var Game = require('./models/game');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        app.get('/api/games', (req, res) => {
            // use mongoose to get all games in the database
            Game.find({}, (err, games) => {})
            .then(games => {
                res.json(games)
            })
            .catch(err => {
                console.log(err)
            })
        });
        app.post('/api/games', (req, res) => {
            let myGame = new Game(req.body)
            myGame.save()
            .then(item => {
                res.send("Item saved")
            })
            .catch(err => {
                res.status(400).send("Unable to save")
            })
        })       
        app.delete('/api/games', (req, res) => {
            let myGame = new Game(req.body)
            myGame.remove()
            .then(item => {
                res.send("Item deleted")
            })
            .catch(err => {
                res.status(400).send("Unable to delete")
            })
        })        
        app.put('/api/games', (req, res) => {
            let selector = {"_id":req.body._id}
            Game.findOneAndUpdate(selector, req.body, {upsert:true, new:true})
            .then(doc => {
                return res.send("succesfully saved" + doc);
            })
            .catch(err => {
                return res.send(500, { error: err });
            })
        })       
  
        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

    };

