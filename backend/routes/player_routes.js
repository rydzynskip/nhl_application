module.exports = app => {
    const players = require('../controllers/player_controller.js');
    const router = require('express').Router();

    router.get('/', players.findAll);
    router.post('/', players.create);
    router.get('/:id', players.findOne);
    router.put('/:id', players.update);
    router.delete('/:id', players.delete);
    router.get('/:id/team', players.findTeam);
    router.get('/:id/gameStats', players.findGameStats);
    router.get('/:id/seasonStats/:year', players.findSeasonStats);
    app.use('/players', router);
};