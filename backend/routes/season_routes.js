module.exports = app => {
    const seasons = require('../controllers/season_controller.js');
    const router = require('express').Router();

    router.get('/', seasons.findAll);
    router.post('/', seasons.create);
    router.delete('/:year', seasons.delete);
    app.use('/seasons', router);
};