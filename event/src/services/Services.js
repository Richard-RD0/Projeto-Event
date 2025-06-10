import axios from "axios";

const apiPorta = "5289";

const apilocal = `http://localhost:${apiPorta}/api/`

const api = axios.create({
    baseURL: apilocal
});

export default api;