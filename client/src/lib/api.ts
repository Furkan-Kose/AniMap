import axios from 'axios';

export const apiURL = "http://localhost:3000";

export const fetchAnimals = async () => {
    const res = await axios.get(`${apiURL}/animals`);
    return res.data;
}

export const fetchUsers = async () => {
    const res = await axios.get(`${apiURL}/users`);
    return res.data;
}




