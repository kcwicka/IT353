const Run = async () => {
    /**********
     * Server *
     **********/
    const app = require('express')();
    // Morgan provides logging methods
    app.use(require('morgan')('dev'));
    // TODO: Research if I need this package
    app.use(require('body-parser').json());
    // TODO: Research if I need this package
    app.use(require('cors')());

    /***********************
     * Database Connection *
     ***********************/
    const mongoClient = await new Promise((resolve, reject) => {
        const reader = require('readline-sync');
        const user = reader.question('Username: ');
        const pass = reader.question('Password: ', {
            hideEchoBack: true,
            mask: '#'
        });
        const URI = `mongodb+srv://${user}:${pass}@gamecloset-kgc2r.gcp.mongodb.net/closet?retryWrites=true&w=majority`;
        const { MongoClient } = require('mongodb');
        try {
            console.log(`Attempting to connect to mongoDB...`);
            new MongoClient(URI, {
                autoReconnect: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).connect((err, db) => {
                if (null !== err) {
                    reject(err);
                } else {
                    if (!db.s.options.auth) {
                        console.error('Must log in as user');
                        process.exit(0);
                    } else {
                        resolve(db);
                    }
                }
            });
        } catch (err) {
            reject(err);
        }
    }).catch(reason => {
        console.error('\nCould not connect to mongoDB:\n');
        console.error(reason.message);
        process.exit(0);
    });
    if (!mongoClient.s.options.auth) {
        console.error('Must log in as user');
        process.exit(0);
    }

    console.log('Connected to mongoDB');

    /***********
     * Utility *
     ***********/

    /*******
     * API *
     *******/
    const { GetGames, GetUsers, API } = require('./api');
    // TODO: Maybe change to post based on having user logins?
    app.get('/view-games', (req, res) => {
        API.viewGames(GetGames(mongoClient), req, res);
    });
    app.post('/save-game', (req, res) => {
        API.saveGame(GetGames(mongoClient), req, res);
    });
    app.post('/remove-game', (req, res) => {
        API.removeGame(GetGames(mongoClient), req, res);
        // const gameToDelete = { _id: mongo.ObjectID(request.body.id) };
        // GetGames().deleteOne(gameToDelete, (err, results) => {
        //   if (err) {
        //     console.log(err);
        //     response.send(err);
        //     return;
        //   }
        //   response.send(`${results.deletedCount} items`);
        // });
    });
    app.post('/login', (req, res) => {
        API.login(GetUsers(mongoClient), req, res);
    });

    return app.listen(process.env.PORT || 8081);
};

Run();
