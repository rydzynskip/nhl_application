const sql = require('./db.js');

const Player = function(player) {
    this.player_name = player.player_name;
    this.birth_date = player.birth_date;
    this.player_status = player.player_status;
    this.player_position = player.player_position;
    this.player_hand = player.player_hand;
    this.height_inches = player.height_inches;
    this.weight_pounds = player.weight_pounds;
};

Player.create = (newPlayer, result) => {
    sql.query(
        'INSERT INTO player VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)', 
        [newPlayer.player_name, newPlayer.birth_date, newPlayer.player_status, newPlayer.player_position, 
            newPlayer.player_hand, newPlayer.height_inches, newPlayer.weight_pounds], 
        (err, res) => {
            if (err) {
                console.log('error: ' + err);
                result(err, null);
                return;
            }

            console.log('created player: ', { id: res.insertId, ...newPlayer });
            result(null, { id: res.insertId, ...newPlayer})
        }
    );
}; 

Player.findAll = (result) => {
    sql.query('SELECT * FROM player', (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        console.log('players: ', res);
        result(null, res);
    });
};

Player.findById = (id, result) => {
    sql.query('SELECT * FROM player WHERE player_id=?', [id], (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('found player: ', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
}; 

Player.updateById = (id, player, result) => {
    sql.query('UPDATE player SET player_name = ?, birth_date = ?, player_status = ?, player_position = ?, player_hand = ?, ' + 
                'height_inches = ?, weight_pounds = ? WHERE player_id = ?',
        [player.player_name, player.birth_date, player.player_status, player.player_position, 
            player.player_hand, player.height_inches, player.weight_pounds, id], 
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

            console.log('updated player: ', { id: id, ...player });
            result(null, { id: id, ...player });
        }
    );
}; 

Player.remove = (id, result) => {
    sql.query('DELETE FROM player WHERE player_id = ?', [id], (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('deleted player with id: ' + id);
        result(null, res);
    });
}; 

Player.findTeam = (id, result) => {
    sql.query('CALL getPlayerTeam(?)', [id], (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('found player\'s team: ', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
};

Player.findGameStats = (id, result) => {
    sql.query('CALL getPlayerStats(?)', [id], (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('found player\'s stats: ', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
};

Player.findSeasonStats = (id, year, result) => {
    sql.query('CALL getPlayerSeasonStats(?, ?)', [id, year], (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('found player\'s season stats: ', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
};


module.exports = Player;

