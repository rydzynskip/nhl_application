import http from '../http-common';

class GameDataService {
    getAll() {
        return http.get('/games');
    }
    get(id) {
        return http.get(`/games/${id}`);
    }
    create(data) {
        return http.post('/games', data);
    }
    update(id, data) {
        return http.put(`/games/${id}`, data);
    }
    delete(id) {
        return http.delete(`/games/${id}`);
    }
    getStats(id) {
        return http.get(`/games/${id}/stats`);
    }
}

export default new GameDataService();
