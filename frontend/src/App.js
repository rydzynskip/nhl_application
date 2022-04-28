import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './components/main.component';
import NewTeam from './components/team/new-team.component';
import EditTeam from './components/team/edit-team.component';
import ShowTeam from './components/team/show-team.component';
import TeamsList from './components/team/teams-list.component';

import NewGame from './components/game/new-game.component';
import EditGame from './components/game/edit-game.component';
import ShowGame from './components/game/show-game.component';
import GamesList from './components/game/games-list.component';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            NHL Stats
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/teams"} className="nav-link">
                Teams
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/games"} className="nav-link">
                Games
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/teams" element={<TeamsList />} />
            <Route path="/teams/new" element={<NewTeam />} />
            <Route path="/teams/:id" element={<ShowTeam />} />
            <Route path="/teams/:id/edit" element={<EditTeam />} />
            <Route path="/games" element={<GamesList />} />
            <Route path="/games/new" element={<NewGame />} />
            <Route path="/games/:id" element={<ShowGame />} />
            <Route path="/games/:id/edit" element={<EditGame />} />
          </Routes>
        </div>
      </div>
    );
  }
}
export default App;

