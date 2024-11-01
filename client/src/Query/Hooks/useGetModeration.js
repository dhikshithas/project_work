import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetModeration = () => {
  const url = "http://localhost:3001/get-moderation";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["moderation"],
    queryFn: () => axios.get(url),
  });

  return { data, isLoading, isError, error };
};
