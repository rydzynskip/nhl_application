import React, { Component } from 'react';
import GameDataService from "../../services/game.service";

export default class NewGame extends Component {
    constructor(props) {
        super(props);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeHomeScore = this.onChangeHomeScore.bind(this);
        this.onChangeAwayScore = this.onChangeAwayScore.bind(this);
        this.onChangeSeason = this.onChangeSeason.bind(this);
        this.onChangeHomeTeam = this.onChangeHomeTeam.bind(this);
        this.onChangeAwayTeam = this.onChangeAwayTeam.bind(this);
        this.saveGame = this.saveGame.bind(this);
        this.newGame = this.newGame.bind(this);
        this.state = {
            game_date: "",
            game_time: "",
            home_score_final: 0,
            away_score_final: 0,
            current_season: null,
            home_team: null,
            away_team: null,
            submitted: false
        };
    }
    onChangeDate(e) {
        this.setState({
            game_date: e.target.value
        });
    }
    onChangeTime(e) {
        this.setState({
            game_time: e.target.value
        });
    }
    onChangeHomeScore(e) {
        this.setState({
            home_score_final: e.target.value
        });
    }
    onChangeAwayScore(e) {
        this.setState({
            away_score_final: e.target.value
        });
    }
    onChangeSeason(e) {
        this.setState({
            current_season: e.target.value
        });
    }
    onChangeHomeTeam(e) {
        this.setState({
            home_team: e.target.value
        });
    }
    onChangeAwayTeam(e) {
        this.setState({
            away_team: e.target.value
        });
    }
    saveGame() {
        const data = {
            game_date: this.state.game_date,
            game_time: this.state.game_time,
            home_score_p1: 0,
            home_score_p2: 0,
            home_score_p3: 0,
            home_score_final: this.state.home_score_final,
            away_score_p1: 0,
            away_score_p2: 0,
            away_score_p3: 0,
            away_score_final: this.state.away_score_final,
            has_shootout: false,
            home_shots: 0,
            away_shots: 0,
            home_money_line: 0,
            away_money_line: 0,
            game_total: 0,
            over_total_odds: 0,
            under_total_odds: 0,
            home_puck_line: 0,
            home_puck_line_odds: 0,
            away_puck_line: 0,
            away_puck_line_odds: 0,
            current_season: this.state.current_season,
            home_team: this.state.home_team,
            away_team: this.state.away_team,
        };
        
        GameDataService.create(data)
            .then(response => {
                this.setState({
                    game_date: response.data.game_date,
                    game_time: response.data.game_time,
                    home_score_final: response.data.home_score_final,
                    away_score_final: response.data.away_score_final,
                    current_season: response.data.current_season,
                    home_team: response.data.home_team,
                    away_team: response.data.away_team,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    newGame() {
        this.setState({
            game_date: "",
            game_time: "",
            home_score_final: 0,
            away_score_final: 0,
            current_season: null,
            home_team: null,
            away_team: null,
            submitted: false
        });
    }
    render() {
        return (
            <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={this.newGame}>
                    Add
                  </button>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="game_date">Game Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="game_date"
                      required
                      value={this.state.game_date}
                      onChange={this.onChangeDate}
                      name="game_date"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="game_time">Game Time</label>
                    <input
                      type="text"
                      className="form-control"
                      id="game_time"
                      required
                      value={this.state.game_time}
                      onChange={this.onChangeTime}
                      name="game_time"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="home_score_final">Home Score</label>
                    <input
                      type="text"
                      className="form-control"
                      id="home_score_final"
                      required
                      value={this.state.home_score_final}
                      onChange={this.onChangeHomeScore}
                      name="home_score_final"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="away_score_final">Away Score</label>
                    <input
                      type="text"
                      className="form-control"
                      id="away_score_final"
                      required
                      value={this.state.away_score_final}
                      onChange={this.onChangeAwayScore}
                      name="away_score_final"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="current_season">Season</label>
                    <input
                      type="text"
                      className="form-control"
                      id="current_season"
                      required
                      value={this.state.current_season}
                      onChange={this.onChangeSeason}
                      name="current_season"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="home_team">Home Team</label>
                    <input
                      type="text"
                      className="form-control"
                      id="home_team"
                      required
                      value={this.state.home_team}
                      onChange={this.onChangeHomeTeam}
                      name="home_team"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="away_team">Away Team</label>
                    <input
                      type="text"
                      className="form-control"
                      id="away_team"
                      required
                      value={this.state.away_team}
                      onChange={this.onChangeAwayTeam}
                      name="away_team"
                    />
                  </div>
                  <button onClick={this.saveGame} className="btn btn-success">
                    Submit
                  </button>
                </div>
              )}
            </div>
        );
    }
}