import React, { Component } from 'react';
import TeamDataService from '../../services/team.service';
import { Link } from "react-router-dom";

export default class TeamsList extends Component {
    constructor(props) {
        super(props);
        this.retrieveTeams = this.retrieveTeams.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTeam = this.setActiveTeam.bind(this);
        this.state = {
            teams: [],
            currentTeam: null,
            currentIndex: -1
        };
    }
    componentDidMount() {
        this.retrieveTeams();
    }
    retrieveTeams() {
        TeamDataService.getAll()
            .then(response => {
                this.setState({
                    teams: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    refreshList() {
        this.retrieveTeams();
        this.setState({
            currentTeam: null,
            currentIndex: -1
        });
    }
    setActiveTeam(team, index) {
        this.setState({
            currentTeam: team,
            currentIndex: index
        });
    }
    render() {
        const { teams, currentTeam, currentIndex } = this.state;
        return (
            <div className="list row">
              <div className="col-md-6">
                <h4>Teams List</h4>
                <ul className="list-group">
                  {teams &&
                    teams.map((team, index) => (
                        <li
                            className={
                            "list-group-item " +
                            (index === currentIndex ? "active" : "")
                            }
                            onClick={() => this.setActiveTeam(team, index)}
                            key={index}
                        >
                            {team.team_name}
                        </li>
                    ))}
                </ul>
                <Link
                  to={"/teams/new"}
                  className="btn btn-success"
                >
                  Add Team
                </Link>
              </div>
              <div className="col-md-6">
                {currentTeam ? (
                  <div>
                    <h4>Team</h4>
                    <div>
                      <label>
                        <strong>Name:</strong>
                      </label>{" "}
                      {currentTeam.team_name}
                    </div>
                    <div>
                      <label>
                        <strong>City:</strong>
                      </label>{" "}
                      {currentTeam.location_city}
                    </div>
                    <div>
                      <label>
                        <strong>State:</strong>
                      </label>{" "}
                      {currentTeam.location_state}
                    </div>
                    <div>
                      <label>
                        <strong>Country:</strong>
                      </label>{" "}
                      {currentTeam.location_country}
                    </div>
                    <Link
                      to={"/teams/" + currentTeam.team_id}
                      className="btn btn-primary"
                    >
                      View Team
                    </Link>
                  </div>
                ) : (
                  <div>
                    <br />
                    <p>Please click on a Team...</p>
                  </div>
                )}
              </div>
            </div>
        );
    }
}