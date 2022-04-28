import React, { Component } from 'react';
import GameDataService from '../../services/game.service';
import { Link } from "react-router-dom";

export default class GamesList extends Component {
    constructor(props) {
        super(props);
        this.retrieveGames = this.retrieveGames.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveGame = this.setActiveGame.bind(this);
        this.state = {
            games: [],
            currentGame: null,
            currentIndex: -1
        };
    }
    componentDidMount() {
        this.retrieveGames();
    }
    retrieveGames() {
        GameDataService.getAll()
            .then(response => {
                this.setState({
                    games: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    refreshList() {
        this.retrieveGames();
        this.setState({
            currentGame: null,
            currentIndex: -1
        });
    }
    setActiveGame(game, index) {
        this.setState({
            currentGame: game,
            currentIndex: index
        });
    }
    render() {
        const { games, currentGame, currentIndex } = this.state;
        return (
            <div className="list row">
              <div className="col-md-6">
                <h4>Games List</h4>
                <ul className="list-group">
                  {games &&
                    games.map((game, index) => (
                        <li
                            className={
                            "list-group-item " +
                            (index === currentIndex ? "active" : "")
                            }
                            onClick={() => this.setActiveGame(game, index)}
                            key={index}
                        >
                            {game.home_team_name} vs {game.away_team_name} - {game.game_date.slice(0,10)}
                        </li>
                    ))}
                </ul>
                <Link
                  to={"/games/new"}
                  className="btn btn-success"
                >
                  Add Game
                </Link>
              </div>
              <div className="col-md-6">
                {currentGame ? (
                  <div>
                    <h4>Game</h4>
                    <div>
                      <label>
                        <strong>Matchup:</strong>
                      </label>{" "}
                      {currentGame.home_team_name} vs {currentGame.away_team_name}
                    </div>
                    <div>
                      <label>
                        <strong>Final Score:</strong>
                      </label>{" "}
                      {currentGame.home_score_final} to {currentGame.away_score_final}
                    </div>
                    <div>
                      <label>
                        <strong>Winner:</strong>
                      </label>{" "}
                      {(currentGame.home_score_final > currentGame.away_score_final) ? currentGame.home_team_name : currentGame.away_team_name}
                    </div>
                    <Link
                      to={"/games/" + currentGame.game_id}
                      className="btn btn-primary"
                    >
                      View Game
                    </Link>
                  </div>
                ) : (
                  <div>
                    <br />
                    <p>Please click on a Game...</p>
                  </div>
                )}
              </div>
            </div>
        );
    }
}