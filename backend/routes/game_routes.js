module.exports = app => {
    const games = require('../controllers/game_controller.js');
    const router = require('express').Router();

    router.get('/', games.findAll);
    router.post('/', games.create);
    router.get('/:id', games.findOne);
    router.put('/:id', games.update);
    router.delete('/:id', games.delete);
    router.get('/:id/stats', games.findStats);
    app.use('/games', router);
};