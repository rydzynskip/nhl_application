const Player = require('../models/player_model.js');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        });
    }

    const player = new Player({
        player_name: req.body.player_name,
        birth_date: req.body.birth_date,
        player_status: req.body.player_status,
        player_position: req.body.player_position,
        player_hand: req.body.player_hand,
        height_inches: req.body.height_inches,
        weight_pounds: req.body.weight_pounds
    });

    Player.create(player, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Error occurred during Player creation.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    Player.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Player with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Player with id ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    Player.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Error occurred while finding all Players.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        });
    }

    console.log(req.body);

    Player.updateById(req.params.id, req.body, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Player with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating Player with id ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    Player.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Player with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting Player with id ${req.params.id}.`
                });
            }
        } else {
            res.send({
                message: 'Player was deleted successfully.'
            });
        }
    });
};

exports.findTeam = (req, res) => {
    Player.findTeam(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Player with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Player with id ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.findGameStats = (req, res) => {
    Player.findGameStats(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Player with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Player with id ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.findSeasonStats = (req, res) => {
    Player.findSeasonStats(req.params.id, req.params.year, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Player with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Player with id ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};