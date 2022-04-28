const sql = require('./db.js');

const Game = function(game) {
    this.game_date = game.game_date;
    this.game_time = game.game_time;
    this.home_score_p1 = game.home_score_p1;
    this.home_score_p2 = game.home_score_p2;
    this.home_score_p3 = game.home_score_p3;
    this.home_score_final = game.home_score_final;
    this.away_score_p1 = game.away_score_p1;
    this.away_score_p2 = game.away_score_p2;
    this.away_score_p3 = game.away_score_p3;
    this.away_score_final = game.away_score_final;
    this.has_shootout = game.has_shootout;
    this.home_shots = game.home_shots;
    this.away_shots = game.away_shots;
    this.home_money_line = game.home_money_line;
    this.away_money_line = game.away_money_line;
    this.game_total = game.game_total;
    this.over_total_odds = game.over_total_odds;
    this.under_total_odds = game.under_total_odds;
    this.home_puck_line = game.home_puck_line;
    this.home_puck_line_odds = game.home_puck_line_odds;
    this.away_puck_line = game.away_puck_line;
    this.away_puck_line_odds = game.away_puck_line_odds;
    this.current_season = game.current_season;
    this.home_team = game.home_team;
    this.away_team = game.away_team;
};

Game.create = (newGame, result) => {
    sql.query(
        'INSERT INTO game VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [newGame.game_date, newGame.game_time, newGame.home_score_p1, newGame.home_score_p2, newGame.home_score_p3,
            newGame.home_score_final, newGame.away_score_p1, newGame.away_score_p2, newGame.away_score_p3, newGame.away_score_final,
            newGame.has_shootout, newGame.home_shots, newGame.away_shots, newGame.home_money_line, newGame.away_money_line, 
            newGame.game_total, newGame.over_total_odds, newGame.under_total_odds, newGame.home_puck_line, newGame.home_puck_line_odds,
            newGame.away_puck_line, newGame.away_puck_line_odds, newGame.current_season, newGame.home_team, newGame.away_team],
        (err, res) => {
            if (err) {
                console.log('error: ' + err);
                result(err, null);
                return;
            }

            console.log('created game: ', { id: res.insertId, ...newGame });
            result(null, { id: res.insertId, ...newGame })
        }
    );
}; 

Game.findAll = (result) => {
    sql.query('CALL getAllGames()', (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        console.log('games: ', res[0]);
        result(null, res[0]);
    });
};

Game.findById = (id, result) => {
    sql.query('CALL getGame(?)', [id], (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('found game: ', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
}; 

Game.updateById = (id, game, result) => {
    sql.query('UPDATE game SET game_date = ?, game_time = ?, home_score_p1 = ?, home_score_p2 = ?, home_score_p3 = ?, ' +
        'home_score_final = ?, away_score_p1 = ?, away_score_p2 = ?, away_score_p3 = ?, away_score_final = ?, has_shootout = ?,' +
        'home_shots = ?, away_shots = ?, home_money_line = ?, away_money_line = ?, game_total = ?, over_total_odds = ?,' +
        'under_total_odds = ?, home_puck_line = ?, home_puck_line_odds = ?, away_puck_line = ?, away_puck_line_odds = ?,' +
        'current_season = ?, home_team = ?, away_team = ? WHERE game_id = ?',
        [game.game_date, game.game_time, game.home_score_p1, game.home_score_p2, game.home_score_p3,
            game.home_score_final, game.away_score_p1, game.away_score_p2, game.away_score_p3, game.away_score_final,
            game.has_shootout, game.home_shots, game.away_shots, game.home_money_line, game.away_money_line, 
            game.game_total, game.over_total_odds, game.under_total_odds, game.home_puck_line, game.home_puck_line_odds,
            game.away_puck_line, game.away_puck_line_odds, game.current_season, game.home_team, game.away_team, id],
        (err, res) => {
            if (err) {
                console.log('error: ' + err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('updated game: ', { id: id, ...game });
            result(null, { id: id, ...game });
        }
    );
}; 

Game.remove = (id, result) => {
    sql.query('DELETE FROM game WHERE game_id = ?', [id], (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('deleted game with id: ' + id);
        result(null, res);
    });
}; 

Game.findStats = (id, result) => {
    sql.query('CALL getAllGameStats(?)', [id], (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('found stats: ', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
}; 

module.exports = Game;

