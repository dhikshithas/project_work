import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetModerationMark = (batch) => {
  const url = "http://localhost:3001/get-moderation-mark";
  console.log(batch);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["moderationMark", batch],
    queryFn: () => axios.get(url, { params: batch }), // Use params here
  });

  return { data, isLoading, isError, error };
};
