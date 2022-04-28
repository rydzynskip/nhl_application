import React, { Component } from 'react';
import TeamDataService from "../../services/team.service";

export default class NewTeam extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.saveTeam = this.saveTeam.bind(this);
        this.newTeam = this.newTeam.bind(this);
        this.state = {
            team_id: null,
            team_name: "",
            location_city: "",
            location_state: "", 
            location_country: "",
            submitted: false
        };
    }
    onChangeName(e) {
        this.setState({
            team_name: e.target.value
        });
    }
    onChangeCity(e) {
        this.setState({
            location_city: e.target.value
        });
    }
    onChangeState(e) {
        this.setState({
            location_state: e.target.value
        });
    }
    onChangeCountry(e) {
        this.setState({
            location_country: e.target.value
        });
    }
    saveTeam() {
        const data = {
            team_name: this.state.team_name,
            location_city: this.state.location_city,
            location_state: this.state.location_state, 
            location_country: this.state.location_country
        };
        TeamDataService.create(data)
            .then(response => {
                this.setState({
                    team_id: response.data.team_id,
                    team_name: response.data.team_name,
                    location_city: response.data.location_city,
                    location_state: response.data.location_state, 
                    location_country: response.data.location_country,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    newTeam() {
        this.setState({
            team_id: null,
            team_name: "",
            location_city: "",
            location_state: "", 
            location_country: "",
            submitted: false
        });
    }
    render() {
        return (
            <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={this.newTeam}>
                    Add
                  </button>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="team_name">Team Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="team_name"
                      required
                      value={this.state.team_name}
                      onChange={this.onChangeName}
                      name="team_name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location_city">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="location_city"
                      required
                      value={this.state.location_city}
                      onChange={this.onChangeCity}
                      name="location_city"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location_state">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="location_state"
                      required
                      value={this.state.location_state}
                      onChange={this.onChangeState}
                      name="location_state"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location_country">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      id="location_country"
                      required
                      value={this.state.location_country}
                      onChange={this.onChangeCountry}
                      name="location_country"
                    />
                  </div>
                  <button onClick={this.saveTeam} className="btn btn-success">
                    Submit
                  </button>
                </div>
              )}
            </div>
        );
    }
}