import axios from 'axios';

export const apiURL = "https://animap.onrender.com";

export const fetchAnimals = async () => {
    const res = await axios.get(`${apiURL}/animals`);
    return res.data;
}

export const fetchUsers = async () => {
    const res = await axios.get(`${apiURL}/users`);
    return res.data;
}

export const fetchCampaigns = async () => {
    const res = await axios.get(`${apiURL}/campaigns`)
    return res.data
}

export const fetchCampaign = async (campaignId: string) => {
    const res = await axios.get(`${apiURL}/campaigns/${campaignId}`)
    return res.data
}






