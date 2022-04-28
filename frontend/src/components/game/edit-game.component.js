import React, { useEffect, useState } from 'react';
import GameDataService from '../../services/game.service';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditGame() {
    const [currentGame, setCurrentGame] = useState({
        game_id: null,
        game_date: "",
        game_time: "",
        home_score_final: 0,
        away_score_final: 0,
        current_season: null,
        home_team: null,
        away_team: null
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getGame(id);
    }, []);

    const onChangeDate = (e) => {
        const game_date = e.target.value;
        setCurrentGame(prevState => ({
            ...prevState,
            game_date: game_date.slice(0, 10)
        }));
    }
    const onChangeTime = (e) => {
        const game_time = e.target.value;
        setCurrentGame(prevState => ({
            ...prevState,
            game_time: game_time
        }));
    } 
    const onChangeHomeScore = (e) => {
        const home_score_final = e.target.value;
        setCurrentGame(prevState => ({
            ...prevState,
            home_score_final: home_score_final
        }));
    } 
    const onChangeAwayScore = (e) => {
        const away_score_final = e.target.value;
        setCurrentGame(prevState => ({
            ...prevState,
            away_score_final: away_score_final
        }));
    } 
    const onChangeSeason = (e) => {
        const current_season = e.target.value;
        setCurrentGame(prevState => ({
            ...prevState,
            current_season: current_season
        }));
    } 
    const onChangeHomeTeam = (e) => {
        const home_team = e.target.value;
        setCurrentGame(prevState => ({
            ...prevState,
            home_team: home_team
        }));
    } 
    const onChangeAwayTeam = (e) => {
        const away_team = e.target.value;
        setCurrentGame(prevState => ({
            ...prevState,
            away_team: away_team
        }));
    } 

    const getGame = (id) => {
        GameDataService.get(id)
            .then(response => {
                setCurrentGame({
                    game_id: response.data.game_id,
                    game_date: response.data.game_date.slice(0, 10),
                    game_time: response.data.game_time,
                    home_score_final: response.data.home_score_final,
                    away_score_final: response.data.away_score_final,
                    current_season: response.data.current_season,
                    home_team: response.data.home_team,
                    away_team: response.data.away_team
                }); 
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    const updateGame = () => {
        GameDataService.update(currentGame.game_id, currentGame)
            .then(response => {
                navigate('/games/' + currentGame.game_id);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    const deleteGame = () => {
        GameDataService.delete(currentGame.game_id)
            .then(response => {
                console.log(response.data);
                navigate('/games');
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
          {currentGame ? (
            <div className="edit-form">
                <h4>Game</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="game_date">Game Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="game_date"
                      value={currentGame.game_date}
                      onChange={onChangeDate}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="game_time">Game Time</label>
                    <input
                      type="text"
                      className="form-control"
                      id="game_time"
                      value={currentGame.game_time}
                      onChange={onChangeTime}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="home_score_final">Home Score</label>
                    <input
                      type="text"
                      className="form-control"
                      id="home_score_final"
                      value={currentGame.home_score_final}
                      onChange={onChangeHomeScore}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="away_score_final">Away Score</label>
                    <input
                      type="text"
                      className="form-control"
                      id="away_score_final"
                      value={currentGame.away_score_final}
                      onChange={onChangeAwayScore}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="current_season">Season</label>
                    <input
                      type="text"
                      className="form-control"
                      id="current_season"
                      value={currentGame.current_season}
                      onChange={onChangeSeason}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="home_team">Home Team</label>
                    <input
                      type="text"
                      className="form-control"
                      id="home_team"
                      value={currentGame.home_team}
                      onChange={onChangeHomeTeam}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="away_team">Away Team</label>
                    <input
                      type="text"
                      className="form-control"
                      id="away_team"
                      value={currentGame.away_team}
                      onChange={onChangeAwayTeam}
                    />
                  </div>
                </form>
                <button
                  className="btn btn-danger mr-2"
                  onClick={deleteGame}
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={updateGame}
                >
                  Update
                </button>
            </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Game...</p>
              </div>
            )}
        </div>
    );
}
