import React, { useEffect, useState } from 'react';
import TeamDataService from '../../services/team.service';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditTeam() {
    const [currentTeam, setCurrentTeam] = useState({
        team_id: null,
        team_name: "",
        location_city: "",
        location_state: "",
        location_country: ""
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getTeam(id);
    }, []);

    const onChangeName = (e) => {
        const team_name = e.target.value;
        setCurrentTeam(prevState => ({
            ...prevState,
            team_name: team_name
        }));
    }
    const onChangeCity = (e) => {
        const location_city = e.target.value;
        setCurrentTeam(prevState => ({
            ...prevState,
            location_city: location_city
        }));
    } 
    const onChangeState = (e) => {
        const location_state = e.target.value;
        setCurrentTeam(prevState => ({
            ...prevState,
            location_state: location_state
        }));
    } 
    const onChangeCountry = (e) => {
        const location_country = e.target.value;
        setCurrentTeam(prevState => ({
            ...prevState,
            location_country: location_country
        }));
    } 

    const getTeam = (id) => {
        TeamDataService.get(id)
            .then(response => {
                setCurrentTeam(response.data); 
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    const updateTeam = () => {
        TeamDataService.update(currentTeam.team_id, currentTeam)
            .then(response => {
                navigate('/teams/' + currentTeam.team_id);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    const deleteTeam = () => {
        TeamDataService.delete(currentTeam.team_id)
            .then(response => {
                console.log(response.data);
                navigate('/teams');
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
          {currentTeam ? (
            <div className="edit-form">
                <h4>Team</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="team_name">Team Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="team_name"
                      value={currentTeam.team_name}
                      onChange={onChangeName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location_city">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="location_city"
                      value={currentTeam.location_city}
                      onChange={onChangeCity}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location_state">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="location_state"
                      value={currentTeam.location_state}
                      onChange={onChangeState}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location_country">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      id="location_country"
                      value={currentTeam.location_country}
                      onChange={onChangeCountry}
                    />
                  </div>
                </form>
                <button
                  className="btn btn-danger mr-2"
                  onClick={deleteTeam}
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={updateTeam}
                >
                  Update
                </button>
            </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Team...</p>
              </div>
            )}
        </div>
    );
}
