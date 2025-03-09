import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const apiURL = "http://192.168.1.117:3000";

const fetchAnimals = async () => {
  const res = await axios.get(`${apiURL}/animals`);
  return res.data;
};

export const useAnimals = () => {
  return useQuery({
    queryKey: ["animals"],
    queryFn: fetchAnimals,
  });
};
