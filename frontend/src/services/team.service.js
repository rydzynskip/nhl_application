import http from '../http-common';

class TeamDataService {
    getAll() {
        return http.get('/teams');
    }
    get(id) {
        return http.get(`/teams/${id}`);
    }
    create(data) {
        return http.post('/teams', data);
    }
    update(id, data) {
        return http.put(`/teams/${id}`, data);
    }
    delete(id) {
        return http.delete(`/teams/${id}`);
    }
    getPlayers(id) {
        return http.get(`/teams/${id}/players`);
    }
    getGames(id) {
        return http.get(`/teams/${id}/games`);
    }
    getRecord(id, year) {
        return http.get(`/teams/${id}/record/${year}`);
    }
}

export default new TeamDataService();