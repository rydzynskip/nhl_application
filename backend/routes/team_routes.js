module.exports = app => {
    const teams = require('../controllers/team_controller.js');
    const router = require('express').Router();

    router.get('/', teams.findAll);
    router.post('/', teams.create);
    router.get('/:id', teams.findOne);
    router.put('/:id', teams.update);
    router.delete('/:id', teams.delete);
    app.use('/teams', router);
};