const Season = require('../models/season_model.js');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        });
    }

    const season = new Season({
        start_year: req.body.start_year
    });

    Season.create(season, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Error occurred during Season creation.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    Season.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Error occurred while finding all Seasons.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    Season.remove(req.params.year, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Season with year ${req.params.year}.`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting Season with year ${req.params.year}.`
                });
            }
        } else {
            res.send({
                message: 'Season was deleted successfully.'
            });
        }
    });
};
