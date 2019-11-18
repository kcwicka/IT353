/** mongoDB helper functions */
const { ObjectID } = require('mongodb');
const MakeObjID = id => ({ _id: ObjectID(id) });

class APIResponse {
    constructor(response) {
        Object.assign(this, { error: void 0, ok: void 0 }, response);
    }
}
const ResponseBuilder = (error, success) =>
    new APIResponse(error ? { error } : { ok: success });

module.exports = client => {
    return {
        /*********
         ** GET **
         *********/
        get: {
            viewGames: (collection, request, response) => {
                collection.find().toArray((err, res) => {
                    response.send(ResponseBuilder(err, res));
                });
            }
        },
        /**********
         ** POST **
         **********/
        post: {
            saveGame: (collection, request, response) => {
                const game = request.body;
                if (game._id) {
                    // Update existing game
                    const id = MakeObjID(game._id);
                    delete game._id;
                    const update = {
                        $set: Object.assign({ view: true }, game)
                    };
                    collection.updateOne(id, update, (err, res) => {
                        response.send(ResponseBuilder(err, 'updated'));
                    });
                } else {
                    // Add new game
                    collection.insertOne(game, (err, res) => {
                        response.send(ResponseBuilder(err, 'added'));
                    });
                }
            },
            removeGame: (collection, request, response) => {
                const game = MakeObjID(request.body.id);
                collection.updateOne(
                    game,
                    { $set: { remove: true, view: false } },
                    (err, res) => {
                        response.send(ResponseBuilder(err, 'removed'));
                    }
                );
            },
            login: (collection, request, response) => {
                const { user } = request.body;
                collection.findOne({ user }, (err, res) => {
                    if (!res || request.body.pass !== res.pass) {
                        response.send(
                            ResponseBuilder(
                                `Invalid username/password combination`
                            )
                        );
                        return;
                    }
                    response.send(ResponseBuilder(err, { loggedIn: true }));
                });
            }
        },
        GetGames: () => client.db('closet').collection('games'),
        GetUsers: () => client.db('closet').collection('users')
    };
};
