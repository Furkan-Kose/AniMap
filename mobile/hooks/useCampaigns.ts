import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const apiURL = "http://192.168.1.123:3000";

const fetchCampaigns = async () => {
  const res = await axios.get(`${apiURL}/campaigns`);
  return res.data;
};

export const useCampaigns = () => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });
};
