import React, { useEffect, useState } from 'react';
import GameDataService from '../../services/game.service';
import TeamDataService from '../../services/team.service';
import { Link, useParams } from 'react-router-dom';

export default function ShowGame() {
    const [currentGame, setCurrentGame] = useState({
        game_id: null,
        game_date: "",
        game_time: "",
        home_score_final: 0,
        away_score_final: 0,
        current_season: null,
        home_team: null,
        away_team: null,
        home_team_name: null,
        away_team_name: null
    });
    const { id } = useParams();

    useEffect(() => {
        getGame(id);
    }, []);

    const getGame = (id) => {
        GameDataService.get(id)
            .then(response => {
                setCurrentGame({
                    game_id: response.data.game_id,
                    game_date: response.data.game_date,
                    game_time: response.data.game_time,
                    home_score_final: response.data.home_score_final,
                    away_score_final: response.data.away_score_final,
                    current_season: response.data.current_season,
                    home_team: response.data.home_team,
                    away_team: response.data.away_team,
                    home_team_name: response.data.home_team_name,
                    away_team_name: response.data.away_team_name,
                }); 
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
            <div>
                <h2>Game Info</h2>
                <div>
                    <label>
                    <strong>Home Team:</strong>
                    </label>{" "}
                    {currentGame.home_team_name}
                </div>
                <div>
                    <label>
                    <strong>Away Team:</strong>
                    </label>{" "}
                    {currentGame.away_team_name}
                </div>
                <div>
                    <label>
                    <strong>Home Score:</strong>
                    </label>{" "}
                    {currentGame.home_score_final}
                </div>
                <div>
                    <label>
                    <strong>Away Score:</strong>
                    </label>{" "}
                    {currentGame.away_score_final}
                </div>
                <div>
                    <label>
                    <strong>Date:</strong>
                    </label>{" "}
                    {currentGame.game_date.slice(0,10)}
                </div>
                <div>
                    <label>
                    <strong>Time:</strong>
                    </label>{" "}
                    {currentGame.game_time}
                </div>
                <div>
                    <label>
                    <strong>Season:</strong>
                    </label>{" "}
                    {currentGame.current_season}
                </div>
                <Link
                    to={"/games/" + currentGame.game_id + "/edit"}
                    className="btn btn-warning"
                >
                    Edit
                </Link>
            </div>
        </div>
    );
}
