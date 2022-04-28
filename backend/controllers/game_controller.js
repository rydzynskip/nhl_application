const Game = require('../models/game_model.js');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        });
    }

    const game = new Game({
        game_date: req.body.game_date,
        game_time: req.body.game_time,
        home_score_p1: req.body.home_score_p1,
        home_score_p2: req.body.home_score_p2,
        home_score_p3: req.body.home_score_p3,
        home_score_final: req.body.home_score_final,
        away_score_p1: req.body.away_score_p1,
        away_score_p2: req.body.away_score_p2,
        away_score_p3: req.body.away_score_p3,
        away_score_final: req.body.away_score_final,
        has_shootout: req.body.has_shootout,
        home_shots: req.body.home_shots,
        away_shots: req.body.away_shots,
        home_money_line: req.body.home_money_line,
        away_money_line: req.body.away_money_line,
        game_total: req.body.game_total,
        over_total_odds: req.body.over_total_odds,
        under_total_odds: req.body.under_total_odds,
        home_puck_line: req.body.home_puck_line,
        home_puck_line_odds: req.body.home_puck_line_odds,
        away_puck_line: req.body.away_puck_line,
        away_puck_line_odds: req.body.away_puck_line_odds,
        current_season: req.body.current_season,
        home_team: req.body.home_team,
        away_team: req.body.away_team
    });

    Game.create(game, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Error occurred during Game creation.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    Game.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Game with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Game with id ${req.params.id}.`
                });
            }
        } else {
            res.send(data[0]);
        }
    });
};

exports.findAll = (req, res) => {
    Game.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Error occurred while finding all Games.'
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

    Game.updateById(req.params.id, req.body, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Game with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating Game with id ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    Game.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Game with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting Game with id ${req.params.id}.`
                });
            }
        } else {
            res.send({
                message: 'Game was deleted successfully.'
            });
        }
    });
};

exports.findStats = (req, res) => {
    Game.findStats(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Game with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Game with id ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};