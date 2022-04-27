const Team = require('../models/team_model.js');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        });
    }

    const team = new Team({
        team_name: req.body.team_name,
        location_city: req.body.location_city,
        location_state: req.body.location_state,
        location_country: req.body.location_country
    });

    Team.create(team, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Error occurred during Team creation.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    Team.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Team with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Team with id ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    Team.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Error occurred while finding all Teams.'
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

    Team.updateById(req.params.id, req.body, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Team with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating Team with id ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    Team.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Team with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting Team with id ${req.params.id}.`
                });
            }
        } else {
            res.send({
                message: 'Team was deleted successfully.'
            });
        }
    });
};

exports.findPlayers = (req, res) => {
    Team.findPlayers(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Team with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Team with id ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.findGames = (req, res) => {
    Team.findGames(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Team with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Team with id ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.findRecord = (req, res) => {
    Team.findRecord(req.params.id, req.params.year, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Team with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Team with id ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};