import React, { useEffect, useState } from 'react';
import TeamDataService from '../../services/team.service';
import { Link, useParams } from 'react-router-dom';

export default function ShowTeam() {
    const [currentTeam, setCurrentTeam] = useState({
        team_id: null,
        team_name: "",
        location_city: "",
        location_state: "",
        location_country: ""
    });
    const { id } = useParams();

    useEffect(() => {
        getTeam(id);
    }, []);

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

    return (
        <div>
            <div>
                <h2>Team Info</h2>
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
                    to={"/teams/" + currentTeam.team_id + "/edit"}
                    className="btn btn-warning"
                >
                    Edit
                </Link>
            </div>
        </div>
    );
}
