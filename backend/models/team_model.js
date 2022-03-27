const sql = require('./db.js');

const Team = function(team) {
    this.team_name = team.team_name;
    this.location_city = team.location_city;
    this.location_state = team.location_state;
    this.location_country = team.location_country;
};

Team.create = (newTeam, result) => {
    sql.query(
        'INSERT INTO team VALUES (NULL, ?, ?, ?, ?)', 
        [newTeam.team_name, newTeam.location_city, newTeam.location_state, newTeam.location_country], 
        (err, res) => {
            if (err) {
                console.log('error: ' + err);
                result(err, null);
                return;
            }

            console.log('created team: ', { id: res.insertId, ...newTeam });
            result(null, { id: res.insertId, ...newTeam })
        }
    );
}; 

Team.findAll = (result) => {
    sql.query('SELECT * FROM team', (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        console.log('teams: ', res);
        result(null, res);
    });
};

Team.findById = (id, result) => {
    sql.query('SELECT * FROM team WHERE team_id=?', [id], (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('found team: ', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
}; 

Team.updateById = (id, team, result) => {
    sql.query('UPDATE team SET team_name = ?, location_city = ?, location_state = ?, location_country = ? WHERE team_id = ?',
        [team.team_name, team.location_city, team.location_state, team.location_country, id],
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

            console.log('updated team: ', { id: id, ...team });
            result(null, { id: id, ...team });
        }
    );
}; 

Team.remove = (id, result) => {
    sql.query('DELETE FROM team WHERE team_id = ?', [id], (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('deleted team with id: ' + id);
        result(null, res);
    });
}; 

module.exports = Team;

