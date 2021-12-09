import axios from 'axios'

const base_url = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(base_url)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(base_url, newObject)
    return request.then(response => response.data)
}

const deleteEntry = (id) => {
    const request = axios.delete(`${base_url}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${base_url}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    deleteEntry,
    update
}