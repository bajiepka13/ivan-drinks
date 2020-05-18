import axios from 'axios'

const CHILD = 'ivan'
const FAMILY_API_URL = 'http://192.168.0.104:8080'
const MILKING_API_URL = `${FAMILY_API_URL}/family/${CHILD}`

class MilkingDataService {

    retrieveMilking(name, id) {
        return axios.get(`${MILKING_API_URL}/milkings/${id}`);
    }

    retrieveAllMilkings(name) {
        return axios.get(`${MILKING_API_URL}/milkings`);
    }

    deleteMilking(name, id) {
        return axios.delete(`${MILKING_API_URL}/milkings/${id}`);
    }

    updateMilking(name, id, milking) {
        return axios.put(`${MILKING_API_URL}/milkings/${id}`, milking);
    }

    createMilking(name, milking) {
        return axios.post(`${MILKING_API_URL}/milkings/`, milking);
    }
}

export default new MilkingDataService()