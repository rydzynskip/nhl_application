const sql = require('./db.js');

const Season = function(season) {
    this.start_year = season.start_year;
};

Season.create = (newSeason, result) => {
    sql.query(
        'INSERT INTO season VALUES (?)', 
        [newSeason.start_year], 
        (err, res) => {
            if (err) {
                console.log('error: ' + err);
                result(err, null);
                return;
            }

            console.log('created season: ', { id: res.insertId, ...newSeason });
            result(null, { id: res.insertId, ...newSeason })
        }
    );
}; 

Season.findAll = (result) => {
    sql.query('SELECT * FROM season', (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        console.log('season: ', res);
        result(null, res);
    });
};

Season.remove = (year, result) => {
    sql.query('DELETE FROM season WHERE start_year = ?', [year], (err, res) => {
        if (err) {
            console.log('error: ' + err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('deleted season with year: ' + year);
        result(null, res);
    });
}; 

module.exports = Season;

